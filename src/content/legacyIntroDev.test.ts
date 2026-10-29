import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import englishReactApi from "./lessons/react.api-custom-hooks/en.json";
import russianReactApi from "./lessons/react.api-custom-hooks/ru.json";
import englishReactBasics from "./lessons/react.components-jsx-state/en.json";
import russianReactBasics from "./lessons/react.components-jsx-state/ru.json";
import englishTypeScript from "./lessons/typescript.fundamentals/en.json";
import russianTypeScript from "./lessons/typescript.fundamentals/ru.json";
import { lessonTranslationSchema } from "./schemas/lessonContent";

const legacyIntroHtml = readFileSync(
  resolve(process.cwd(), "public/lessons/intro.dev.html"),
  "utf8",
);

function sectionBetween(source: string, startMarker: string, endMarker: string): string {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0) throw new Error("Could not find expected source section");
  return source.slice(start, end);
}

const localePairs = [
  [englishTypeScript, russianTypeScript],
  [englishReactBasics, russianReactBasics],
  [englishReactApi, russianReactApi],
] as const;

describe("tl-003 legacy tooling lesson parity and accuracy", () => {
  it("keeps all 20 legacy quiz cards and 10 revealable exercises intact", () => {
    const quizIds = Array.from(
      legacyIntroHtml.matchAll(/<div class="quiz-card" id="q(\d+)">/g),
      (match) => Number(match[1]),
    );
    expect(quizIds).toEqual(Array.from({ length: 20 }, (_, index) => index + 1));

    const revealIds = Array.from(
      legacyIntroHtml.matchAll(/onclick="toggleSolution\('ex(\d+)'\)"/g),
      (match) => Number(match[1]),
    );
    const solutionIds = Array.from(
      legacyIntroHtml.matchAll(/<div class="solution-block" id="ex(\d+)">/g),
      (match) => Number(match[1]),
    );
    expect(revealIds).toEqual(Array.from({ length: 10 }, (_, index) => index + 1));
    expect(solutionIds).toEqual(Array.from({ length: 10 }, (_, index) => index + 1));
  });

  it("validates and aligns each extended English/Russian lesson pair", () => {
    for (const [english, russian] of localePairs) {
      expect(lessonTranslationSchema.safeParse(english).success).toBe(true);
      expect(lessonTranslationSchema.safeParse(russian).success).toBe(true);
      expect(english.id).toBe(russian.id);
      expect(english.blocks.map(({ id, type }) => ({ id, type }))).toEqual(
        russian.blocks.map(({ id, type }) => ({ id, type })),
      );
    }
  });

  it("maps Product and generic-filter exercises into TypeScript", () => {
    for (const lesson of [englishTypeScript, russianTypeScript]) {
      expect(lesson.blocks.find((item) => item.id === "legacy-product-interface-example"))
        .toMatchObject({ type: "codeWalkthrough", code: expect.stringContaining("interface Product") });
      expect(lesson.blocks.find((item) => item.id === "legacy-generic-filter-example"))
        .toMatchObject({ type: "codeWalkthrough", code: expect.stringContaining("function filterItems<T>") });
    }
  });

  it("maps Toggle, typed-list and controlled-search exercises into React", () => {
    for (const lesson of [englishReactBasics, russianReactBasics]) {
      expect(lesson.blocks.find((item) => item.id === "legacy-toggle-example"))
        .toMatchObject({ type: "codeWalkthrough", code: expect.stringContaining("aria-pressed={isOn}") });
      expect(lesson.blocks.find((item) => item.id === "legacy-typed-list-example"))
        .toMatchObject({ type: "codeWalkthrough", code: expect.stringContaining("key={item.id}") });
      expect(lesson.blocks.find((item) => item.id === "legacy-searchable-list-example"))
        .toMatchObject({ type: "codeWalkthrough", code: expect.stringContaining("setQuery(event.currentTarget.value)") });
    }
  });

  it("covers a defensive localStorage Hook in both locales", () => {
    for (const lesson of [englishReactApi, russianReactApi]) {
      expect(lesson.blocks.find((item) => item.id === "legacy-use-local-storage-walkthrough"))
        .toMatchObject({ type: "codeWalkthrough", code: expect.stringContaining("readStoredValue") });
      expect(lesson.blocks.find((item) => item.id === "legacy-use-local-storage-practice"))
        .toMatchObject({ type: "codingExercise", requirements: expect.arrayContaining([expect.stringContaining("fallback")]) });
    }
  });

  it("teaches Effect cleanup as cancellation/freshness rather than a guaranteed memory-leak fix", () => {
    const q14 = sectionBetween(legacyIntroHtml, "<!-- Q14 -->", "<!-- Q15 -->");
    expect(q14).toContain("ignore its result when it is no longer current");
    expect(q14).not.toMatch(/avoiding memory leaks/);
    expect(q14).not.toContain("on an unmounted component");
  });

  it("distinguishes the Vitest mock API from Jest's matching API", () => {
    const q19 = sectionBetween(legacyIntroHtml, "<!-- Q19 -->", "<!-- Q20 -->");
    expect(q19).toContain("In Vitest");
    expect(q19).toContain("jest.fn()");
    expect(q19).toContain("Vitest's vi.fn()");
  });

  it("uses an ESM-safe alias path in legacy Exercise 10", () => {
    const exercise10 = sectionBetween(legacyIntroHtml, "<!-- Exercise 10 -->", "<!-- COMPLETION BANNER -->");
    expect(exercise10).toContain("fileURLToPath(");
    expect(exercise10).toContain("import.meta.url");
    expect(exercise10).not.toContain("path.resolve(__dirname");
    expect(exercise10).toContain("compilerOptions.paths");
    expect(exercise10).toContain("production API routing");
  });
});
