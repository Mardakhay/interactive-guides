import { readdir, readFile, mkdir, writeFile, unlink } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import process from 'node:process';
import { gzipSync } from 'node:zlib';
import { join, resolve } from 'node:path';

const ROOT = process.cwd();
const LESSON_ROOT = resolve(ROOT, 'src/content/lessons');
const OUTPUT_ROOT = resolve(ROOT, 'src/content/generated');
const LOCALES = ['en', 'ru'];
const SEARCH_INDEX_PART_COUNT = 6;
const MAX_GENERATED_CHUNK_BYTES = 500 * 1024;

function searchableBlockText(block) {
  switch (block.type) {
    case 'heading':
    case 'paragraph':
      return block.text;
    case 'list':
      return block.items.join(' ');
    case 'commandReference':
      return block.categories
        .map((category) => category.title + ' ' + category.items.map((item) => item.command + ' ' + item.description).join(' '))
        .join(' ');
    case 'callout':
      return block.title + ' ' + block.text;
    case 'code':
      return block.language + ' ' + (block.caption ?? '') + ' ' + block.code;
    case 'codeWalkthrough':
      return block.language + ' ' + block.code + ' ' + block.steps.map((step) => step.title + ' ' + step.explanation).join(' ');
    case 'knowledgeCheck':
      // Search the prompt only: never index option text, correct answers, feedback or explanation.
      return block.prompt;
    case 'codingExercise':
      // Search task requirements and public rubric, never hints, starter code or worked solutions.
      return block.title + ' ' + block.context + ' ' + block.instructions.join(' ') + ' ' + block.requirements.join(' ') + ' ' + block.successCriteria.join(' ');
    case 'references':
      return block.items.map((item) => item.title + ' ' + item.url).join(' ');
    case 'pipelineSimulation':
      return block.title + ' ' + block.description + ' ' + block.stages.map((stage) => stage.label + ' ' + stage.description + ' ' + stage.successMessage + ' ' + stage.failureMessage).join(' ');
    case 'branchFlowSimulation':
      return block.title + ' ' + block.description + ' ' + block.actions.map((action) => action.label + ' ' + action.description).join(' ');
    case 'sequentialQuiz':
      return block.title + ' ' + block.description;
    case 'tabbedContent':
      return block.title + ' ' + block.description + ' ' + block.tabs.map((tab) => tab.label).join(' ');
    default:
      return '';
  }
}

function assertLessonRecord(lesson, locale, path) {
  if (typeof lesson.id !== 'string' || lesson.id.trim().length === 0 || lesson.locale !== locale) {
    throw new Error('Lesson identity mismatch in ' + path + ': expected a stable lesson ID and locale ' + locale);
  }
  if (!['draft', 'review', 'published'].includes(lesson.status)) {
    throw new Error('Unknown publication status in ' + path + ': ' + lesson.status);
  }
  if (!Array.isArray(lesson.blocks) || !Array.isArray(lesson.tags) || !Array.isArray(lesson.learningOutcomes)) {
    throw new Error('Lesson record is missing indexed arrays in ' + path);
  }
}

function assertLocaleParity(english, russian, folderName) {
  if (english.id !== russian.id) {
    throw new Error('EN/RU stable lesson ID differs in folder ' + folderName);
  }
  if (english.status !== russian.status) {
    throw new Error('EN/RU publication status differs for ' + english.id);
  }
  if (english.blocks.length !== russian.blocks.length) {
    throw new Error('EN/RU block count differs for ' + english.id);
  }
  for (let index = 0; index < english.blocks.length; index += 1) {
    const left = english.blocks[index];
    const right = russian.blocks[index];
    if (left.id !== right.id || left.type !== right.type) {
      throw new Error('EN/RU block identity/type differs for ' + english.id + ' at index ' + index);
    }
  }
  if (english.status === 'published'
    && (english.translationStatus === 'review-needed' || russian.translationStatus === 'review-needed')) {
    throw new Error('A published EN/RU pair cannot contain a review-needed translation: ' + english.id);
  }
}

async function readLesson(path, locale) {
  const source = await readFile(path, 'utf8');
  const lesson = JSON.parse(source);
  assertLessonRecord(lesson, locale, path);
  return lesson;
}

async function buildLocaleIndex(lessonFolders, locale) {
  const searchDocuments = [];
  const practiceExercises = [];
  const seenStableIds = new Set();

  for (const folderName of lessonFolders) {
    const folder = join(LESSON_ROOT, folderName);
    const [english, russian] = await Promise.all([
      readLesson(join(folder, 'en.json'), 'en'),
      readLesson(join(folder, 'ru.json'), 'ru'),
    ]);
    assertLocaleParity(english, russian, folderName);
    if (seenStableIds.has(english.id)) {
      throw new Error('Duplicate stable lesson ID across content folders: ' + english.id);
    }
    seenStableIds.add(english.id);

    const lesson = locale === 'en' ? english : russian;
    if (lesson.status === 'draft') continue;

    searchDocuments.push({
      id: lesson.id,
      locale,
      title: lesson.title,
      status: lesson.status,
      description: lesson.description,
      difficulty: lesson.difficulty,
      estimatedMinutes: lesson.estimatedMinutes,
      tags: lesson.tags,
      learningOutcomes: lesson.learningOutcomes,
      searchText: [
        lesson.description,
        lesson.tags.join(' '),
        lesson.learningOutcomes.join(' '),
        lesson.blocks.map(searchableBlockText).join(' '),
      ].join(' '),
    });

    for (const block of lesson.blocks) {
      if (block.type !== 'codingExercise') continue;
      practiceExercises.push({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        locale,
        lessonStatus: lesson.status,
        exerciseId: block.id,
        title: block.title,
        language: block.language,
        context: block.context,
        instructions: block.instructions,
        requirements: block.requirements,
        successCriteria: block.successCriteria,
      });
    }
  }

  return { searchDocuments, practiceExercises, indexedLessonCount: seenStableIds.size };
}

function splitSearchDocuments(documents, partCount) {
  if (documents.length < partCount) {
    throw new Error('Cannot create ' + partCount + ' non-empty search-index parts from ' + documents.length + ' documents');
  }

  const chunks = [];
  let offset = 0;
  for (let partIndex = 0; partIndex < partCount; partIndex += 1) {
    const remainingDocuments = documents.length - offset;
    const remainingParts = partCount - partIndex;
    const documentsInPart = Math.ceil(remainingDocuments / remainingParts);
    chunks.push(documents.slice(offset, offset + documentsInPart));
    offset += documentsInPart;
  }

  if (offset !== documents.length || chunks.some((chunk) => chunk.length === 0)) {
    throw new Error('Search index partitioner did not consume every document into non-empty parts');
  }
  return chunks;
}

async function writeGeneratedIndexFile(filename, value, label) {
  const serialized = JSON.stringify(value) + '\n';
  const rawBytes = Buffer.byteLength(serialized);
  if (rawBytes > MAX_GENERATED_CHUNK_BYTES) {
    throw new Error(label + ' exceeds the ' + MAX_GENERATED_CHUNK_BYTES + '-byte raw chunk budget: ' + rawBytes + ' bytes');
  }

  await writeFile(join(OUTPUT_ROOT, filename), serialized, 'utf8');
  const gzipBytes = gzipSync(serialized, { level: 9 }).byteLength;
  process.stdout.write(
    label + ': ' + rawBytes.toLocaleString('en-US') + ' bytes raw / '
    + gzipBytes.toLocaleString('en-US') + ' bytes gzip.\n',
  );
}

async function main() {
  const directories = await readdir(LESSON_ROOT, { withFileTypes: true });
  const lessonFolders = directories
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (lessonFolders.length === 0) {
    throw new Error('No structured lesson directories found');
  }

  await mkdir(OUTPUT_ROOT, { recursive: true });
  const generatedFilePattern = /^structured-(content|search|practice)-index\.(en|ru)(?:\.\d+)?\.json$/;
  const staleFiles = (await readdir(OUTPUT_ROOT)).filter((filename) => generatedFilePattern.test(filename));
  await Promise.all(staleFiles.map((filename) => unlink(join(OUTPUT_ROOT, filename))));

  for (const locale of LOCALES) {
    const { searchDocuments, practiceExercises, indexedLessonCount } = await buildLocaleIndex(lessonFolders, locale);
    const searchChunks = splitSearchDocuments(searchDocuments, SEARCH_INDEX_PART_COUNT);

    for (const [partIndex, documents] of searchChunks.entries()) {
      const filename = 'structured-search-index.' + locale + '.' + partIndex + '.json';
      await writeGeneratedIndexFile(
        filename,
        { searchDocuments: documents },
        locale.toUpperCase() + ' search index ' + (partIndex + 1) + '/' + searchChunks.length,
      );
    }

    await writeGeneratedIndexFile(
      'structured-practice-index.' + locale + '.json',
      { practiceExercises },
      locale.toUpperCase() + ' practice index (' + practiceExercises.length + ' exercises)',
    );

    process.stdout.write(
      'Generated ' + locale.toUpperCase() + ' indexes from ' + indexedLessonCount
      + ' paired lesson folders: ' + searchDocuments.length + ' searchable lessons.\n',
    );
  }

  process.stdout.write('Generated bounded bilingual search/practice indexes from ' + lessonFolders.length + ' lesson folders.\n');
}

void main().catch((error) => {
  process.stderr.write((error instanceof Error ? error.stack : String(error)) + '\n');
  process.exitCode = 1;
});
