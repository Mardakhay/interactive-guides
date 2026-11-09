# Focused Source-to-Block Review: wb-003 CSS Reference Guide

**Audit date:** 2026-10-29  
**Classic source:** `public/lessons/css-reference.html` (1,435 lines).  
**Canonical destination:** `css.fundamentals` (EN/RU v5, 63 aligned blocks); responsive Flexbox/Grid and Sass/SCSS topics remain in related lessons.

## Scope and decision

This source pass corrects universal or oversimplified claims while preserving the original interactive page. The structured CSS lesson covers many shared concepts, but its live selector, box-model, Flexbox, Grid, transition and reference controls are not functionally identical to the old page. The `wb-003` route therefore remains **Blocked**.

## Source-to-block crosswalk

| Legacy section / lesson concept | Structured evidence | Review result and remaining difference |
|---|---|---|
| Selector types, cascade and specificity | `css-selectors`, `css-cascade`, `css-specificity-note`, `deep-css-cascade-guide` | The source now distinguishes selector specificity from the broader cascade; `!important` is not presented as infinite specificity, and inherited values are not assigned selector points. The live specificity visualizer remains unique. |
| Box sizing and CSS resets | `box-model`, `box-model-body`, `box-model-example` | The source now treats `box-sizing: border-box` and margin/padding resets as common project choices, not mandatory boilerplate. |
| Font stack, typography and spacing | `css-typography`, `css-typography-example`, `css-accessibility-body` | Font fallback order is described per glyph and recommended sizes are guidance, not strict minimums. Actual readability still depends on typeface, language, zoom and layout. |
| Responsive dimensions and fluid sizing | `css-custom-properties`, `deep-css-model`, `css-browser-support` | CSS `px` is described as a reference pixel, not a physical display pixel. Mobile-first and `clamp()` are design strategies rather than universal performance winners or replacements for every media query. |
| Flexbox and Grid layout | `css-flexbox-grid-responsive` and related responsive lesson material | Interactive playgrounds remain legacy-specific. The `fr` example no longer falsely translates `1fr 2fr 1fr` into exact 25/50/25 percentages; track sizing, gaps and constraints affect the result. |
| Transitions and user preferences | `css-transitions`, `css-accessibility-practices` | Added an explicit `prefers-reduced-motion: reduce` pattern for nonessential animations. |
| Focus indicators and text contrast | `css-accessibility`, `css-accessible-theme-card`, `css-accessibility-check` | A focus example no longer removes an input outline without replacement. Large text thresholds now account for regular and bold text. |
| Browser compatibility and progressive enhancement | `css-browser-support`, `css-browser-support-example` | Browser support guidance is evidence-driven and no longer claims prefixes or `@supports` work everywhere. Autoprefixer is tied to target-browser configuration rather than described as universal automation. |

## Corrections applied

- **Cascade:** `!important` changes declaration priority; it does not add selector-specificity points. Competing important declarations still follow applicable cascade rules. Inherited values do not carry selector specificity.
- **Baseline styles:** resets and `box-sizing: border-box` are framed as common conventions with project-specific effects, not a mandatory first line for every stylesheet.
- **Readable text:** 16–18 CSS px and a line-height around 1.5 are starting points, not formal minimums for every typeface, language, zoom setting or layout.
- **CSS pixel:** `px` is a CSS reference pixel and need not equal one physical device pixel.
- **Responsive strategy:** mobile-first can simplify the cascade, but does not guarantee better runtime performance. `clamp()` helps with fluid values and may reduce breakpoints, but discrete layout and accessibility changes still need media queries.
- **Grid fractions:** `1fr 2fr 1fr` expresses a 1:2:1 fraction of available track space subject to the grid sizing algorithm; it is not unconditionally 25%/50%/25%.
- **Focus and motion:** the focus example preserves a visible outline, and an explicit reduced-motion rule demonstrates a preference-aware treatment for nonessential animations.
- **Contrast:** the large-text table now notes WCAG’s 24 CSS px regular-text threshold or approximately 18.67 CSS px bold-text threshold.

## Interaction inventory preserved

The old page retains the Flexbox and Grid configuration controls, transition demonstration, selectors, style/reference accordions, copy buttons and responsive section. `src/content/legacyCssReference.test.ts` asserts the source section inventory, key controls, and corrected wording. CI assertions do not prove actual keyboard, zoom or screen-reader usability.

## Remaining release gates

- Keep the classic `/lessons/wb-003` route and `public/lessons/css-reference.html` until per-route content and interaction disposition is reviewed.
- Preserve existing classic progress, notes, bookmarks and quiz state; this review does not authorize migration to the structured CSS lesson.
- Test the original playgrounds, visible focus, reduced motion, high zoom, narrow viewport reflow and browser support in actual browsers before any cutover.
