import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import englishObjectModel from './lessons/js.object-prototypes/en.json';
import russianObjectModel from './lessons/js.object-prototypes/ru.json';
import { lessonTranslationSchema } from './schemas/lessonContent';

const legacyObjectModelHtml = readFileSync(
  resolve(process.cwd(), 'public/lessons/js-deep-dive.html'),
  'utf8',
);

describe('js-002 legacy objects, prototypes and classes source accuracy', () => {
  it('preserves main sections, playgrounds, quiz inventory, and practice editors', () => {
    for (const id of ['hero', 'objects', 'prototypes', 'classes', 'practice']) {
      expect(legacyObjectModelHtml).toMatch(new RegExp('<section[^>]+id="' + id + '"'));
    }
    expect((legacyObjectModelHtml.match(/<(?:button|input|textarea|select|form)\b/gi) ?? []).length).toBeGreaterThan(40);
    expect((legacyObjectModelHtml.match(/class="quiz-opt"/g) ?? [])).toHaveLength(36);
    for (const id of ['pg1-code', 'pg2-code', 'pg3-code', 'pg-ex2-code', 'pg-ex3-code', 'pg-ex4-code', 'pg-ex5-code']) {
      expect(legacyObjectModelHtml).toContain('id="' + id + '"');
    }
    expect(legacyObjectModelHtml).toContain('id="b1-1"');
    expect(legacyObjectModelHtml).toContain('id="ex1-result"');
  });

  it('distinguishes copied object-reference values from pass-by-reference and deep copying', () => {
    expect(legacyObjectModelHtml).toContain('Assignment copies a value.');
    expect(legacyObjectModelHtml).toContain('JavaScript does not use pass-by-reference');
    expect(legacyObjectModelHtml).toContain('nested references remain shared');
    expect(legacyObjectModelHtml).not.toContain('Objects are stored by <strong>reference</strong>, not by value.');
    expect(legacyObjectModelHtml).not.toContain('Passing by Reference</h3>');
  });

  it('describes Object.freeze as shallow and does not promise full immutability', () => {
    expect(legacyObjectModelHtml).toContain('it is shallow');
    expect(legacyObjectModelHtml).toContain('nested objects can still be mutated');
    expect(legacyObjectModelHtml).not.toContain('Only <code>Object.freeze()</code> makes an object immutable');
    expect(legacyObjectModelHtml).toContain('Object.freeze is shallow');
  });

  it('distinguishes Constructor.prototype from Function.prototype', () => {
    expect(legacyObjectModelHtml).toContain('A constructable function or class constructor usually has its own');
    expect(legacyObjectModelHtml).toContain('becomes the instance\'s [[Prototype]]');
    expect(legacyObjectModelHtml).toContain('Function.prototype</code> is instead part of the prototype chain of function objects');
    expect(legacyObjectModelHtml).not.toContain('the new object\'s [[Prototype]] is set to <code>Function.prototype</code>');
  });

  it('keeps the new simulation bounded and handles constructor-returned functions', () => {
    expect(legacyObjectModelHtml).toContain('this sketch is not a drop-in replacement for <code>new</code>');
    expect(legacyObjectModelHtml).toContain('candidatePrototype');
    expect(legacyObjectModelHtml).toContain('Object</span><span class="punc">.</span><span class="fn">create</span>');
    expect(legacyObjectModelHtml).toContain('typeof</span> <span class="fn">result</span> <span class="op">===</span> <span class="str">"function"');
  });

  it('explains class semantics beyond prototype delegation', () => {
    expect(legacyObjectModelHtml).toContain('class syntax is not merely a cosmetic rewrite');
    expect(legacyObjectModelHtml).toContain('Class methods still participate in prototype lookup');
    expect(legacyObjectModelHtml).toContain('prototype chains; class syntax adds distinct runtime rules');
    expect(legacyObjectModelHtml).not.toContain('Identical — prototypes all the way down');
    expect(legacyObjectModelHtml).not.toContain('ES6 classes don\'t add new capabilities');
  });

  it('uses Object.hasOwn for own-property checks and qualifies instanceof', () => {
    expect(legacyObjectModelHtml).toContain('Object</span><span class="punc">.</span><span class="fn">hasOwn</span>');
    expect(legacyObjectModelHtml).toContain('Custom Symbol.hasInstance behavior can change that default test.');
  });

  it('covers the legacy Object static-methods example with a safe allowlist task', () => {
    const walkthrough = englishObjectModel.blocks.find(block => block.id === 'object-static-methods-walkthrough');
    expect(walkthrough?.type).toBe('codeWalkthrough');
    if (walkthrough?.type === 'codeWalkthrough') {
      for (const method of ['Object.keys', 'Object.values', 'Object.entries', 'Object.fromEntries', 'Object.assign', 'Object.freeze']) {
        expect(walkthrough.code).toContain(method);
      }
      expect(walkthrough.code).toContain('nested object is still mutable');
      expect(walkthrough.steps).toHaveLength(4);
    }

    const check = englishObjectModel.blocks.find(block => block.id === 'object-static-methods-check');
    expect(check?.type).toBe('knowledgeCheck');
    if (check?.type === 'knowledgeCheck') {
      expect(check.options.filter(option => option.correct)).toHaveLength(1);
      expect(check.options.every(option => option.feedback.trim().length > 0)).toBe(true);
    }

    const practice = englishObjectModel.blocks.find(block => block.id === 'object-static-methods-practice');
    expect(practice?.type).toBe('codingExercise');
    if (practice?.type === 'codingExercise') {
      expect(practice.requirements).toContain('The original settings object is not mutated.');
      expect(practice.instructions.join(' ')).toContain('Object.fromEntries()');
      expect(practice.successCriteria.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('teaches constructor object/function return values, primitive fallback and prototype fallback', () => {
    for (const lesson of [englishObjectModel, russianObjectModel]) {
      const walkthrough = lesson.blocks.find(block => block.id === 'object-model-new-algorithm-walkthrough');
      expect(walkthrough?.type).toBe('codeWalkthrough');
      if (walkthrough?.type === 'codeWalkthrough') {
        expect(walkthrough.code.split('\\n')).toHaveLength(34);
        expect(walkthrough.code).toContain('return { name:');
        expect(walkthrough.code).toContain('return function replacement()');
        expect(walkthrough.code).toContain('return 7;');
        expect(walkthrough.code).toContain('NonObjectPrototype.prototype = 42');
        expect(walkthrough.steps.every(step => step.lineStart >= 1 && step.lineEnd <= walkthrough.code.split('\\n').length)).toBe(true);
      }
      const check = lesson.blocks.find(block => block.id === 'object-model-new-algorithm-check');
      expect(check?.type).toBe('knowledgeCheck');
      if (check?.type === 'knowledgeCheck') {
        expect(check.options.filter(option => option.correct).map(option => option.id)).toEqual(['b']);
        expect(check.options.every(option => option.feedback.trim().length > 20)).toBe(true);
      }
    }
  });

  it('validates the structured EN/RU object-model lesson and its safety/semantics evidence', () => {
    expect(lessonTranslationSchema.safeParse(englishObjectModel).success).toBe(true);
    expect(lessonTranslationSchema.safeParse(russianObjectModel).success).toBe(true);
    expect(englishObjectModel.id).toBe('js.object-prototypes');
    expect(englishObjectModel.version).toBe(5);
    expect(englishObjectModel.blocks).toHaveLength(51);
    expect(englishObjectModel.blocks.map(({ id, type }) => [id, type])).toEqual(
      russianObjectModel.blocks.map(({ id, type }) => [id, type]),
    );
    for (const id of ['object-model-new-text', 'classes-model', 'classes-limits', 'prototype-descriptors-text', 'object-static-methods-heading', 'object-static-methods-text', 'object-static-methods-walkthrough', 'object-static-methods-check', 'object-static-methods-practice', 'object-model-new-algorithm-heading', 'object-model-new-algorithm-text', 'object-model-new-algorithm-walkthrough', 'object-model-new-algorithm-check', 'object-model-references']) {
      expect(englishObjectModel.blocks.some(block => block.id === id)).toBe(true);
      expect(russianObjectModel.blocks.some(block => block.id === id)).toBe(true);
    }
    const refs = englishObjectModel.blocks.find(block => block.id === 'object-model-references');
    expect(refs?.type).toBe('references');
    if (refs?.type === 'references') {
      expect(refs.items.some(item => item.url === 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain')).toBe(true);
      expect(refs.items.some(item => item.url === 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze')).toBe(true);
      expect(refs.items.some(item => item.url === 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new')).toBe(true);
    }
  });
});
