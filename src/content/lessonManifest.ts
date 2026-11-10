import type { LessonPublicationStatus } from './schemas/lessonContent';

export interface StructuredLessonManifestEntry {
  readonly id: string;
  readonly folder: string;
  readonly titles: Readonly<Record<'en' | 'ru', string>>;
  readonly status: LessonPublicationStatus;
}

/** Small translated labels for navigation; full lesson bodies stay lazy-loaded. */
export const STRUCTURED_LESSON_MANIFEST: readonly StructuredLessonManifestEntry[] = [
  { id: "browser.capability-apis", folder: "browser.capability-apis", status: 'review', titles: { en: "Browser Capability APIs", ru: "API возможностей браузера" } },
  { id: "browser.realtime-workers", folder: "browser.realtime-workers", status: 'review', titles: { en: "Browser Messaging and Workers", ru: "Связь браузера и workers" } },
  { id: "browser.rendering-pipeline", folder: "browser.rendering-pipeline", status: 'review', titles: { en: "How Browsers Parse, Render, and Execute a Page", ru: "Как браузер разбирает, отображает и выполняет страницу" } },
  { id: "browser.storage-indexeddb", folder: "browser.storage-indexeddb", status: 'review', titles: { en: "Web Storage and IndexedDB", ru: "Web Storage и IndexedDB" } },
  { id: "capstone.design-architecture-planning", folder: "capstone.design-architecture-planning", status: 'review', titles: { en: "Capstone Part 2: Wireframes, Architecture, API Contracts, and Sprint Plan", ru: "Capstone, часть 2: wireframes, архитектура, API-контракты и план спринтов" } },
  { id: "capstone.implementation", folder: "capstone.implementation", status: 'review', titles: { en: "Capstone Part 3: Implementing the Core User Journeys", ru: "Capstone, часть 3: реализация основных пользовательских сценариев" } },
  { id: "capstone.requirements-discovery", folder: "capstone.requirements-discovery", status: 'review', titles: { en: "Capstone Part 1: Problem, Users, Requirements, and Journeys", ru: "Capstone, часть 1: проблема, пользователи, требования и сценарии" } },
  { id: "capstone.review-demo", folder: "capstone.review-demo", status: 'review', titles: { en: "Capstone Part 4: Refactoring, Release Readiness, and Demo Day", ru: "Capstone, часть 4: рефакторинг, готовность к релизу и Demo Day" } },
  { id: "css.flexbox-grid-responsive", folder: "css.flexbox-grid-responsive", status: 'review', titles: { en: "Flexbox, CSS Grid, and Responsive Design", ru: "Flexbox, CSS Grid и адаптивная вёрстка" } },
  { id: "css.fundamentals", folder: "css.fundamentals", status: 'review', titles: { en: "CSS Fundamentals: Selectors, Cascade, Visual Rules, and Accessibility", ru: "Основы CSS: селекторы, каскад, визуальное оформление и доступность" } },
  { id: "css.sass-scss", folder: "css.sass-scss", status: 'review', titles: { en: "Sass/SCSS: Modules, Mixins, and Maintainable CSS", ru: "Sass/SCSS: модули, mixins и поддерживаемый CSS" } },
  { id: "data.sql-postgresql", folder: "data.sql-postgresql", status: 'review', titles: { en: "SQL and PostgreSQL for Frontend Developers", ru: "SQL и PostgreSQL для frontend-разработчиков" } },
  { id: "deployment.production-hosting", folder: "deployment.production-hosting", status: 'review', titles: { en: "Production Hosting: Build, Environment, Deep Links, and Rollback", ru: "Production hosting: сборка, окружение, deep links и rollback" } },
  { id: "frontend.architecture-boundaries", folder: "frontend.architecture-boundaries", status: 'review', titles: { en: "Frontend Architecture: Module Boundaries and Refactoring", ru: "Архитектура frontend: границы модулей и рефакторинг" } },
  { id: "frontend.auth-security", folder: "frontend.auth-security", status: 'review', titles: { en: "Authentication and Authorization for Frontend Developers", ru: "Аутентификация и авторизация для frontend-разработчика" } },
  { id: "git.fundamentals", folder: "git.fundamentals", status: 'review', titles: { en: "Git Fundamentals: Track, Commit, and Publish Your Work", ru: "Основы Git: отслеживание изменений, коммиты и публикация" } },
  { id: "git.workflow-ci", folder: "git.workflow-ci", status: 'review', titles: { en: "Git Branching, Pull Requests, Code Review, and CI", ru: "Git branching, Pull Request, code review и CI" } },
  { id: "html.document-structure", folder: "html-document-structure", status: 'review', titles: { en: "HTML document structure and semantic page regions", ru: "Структура HTML-документа и семантические области страницы" } },
  { id: "html.forms-accessibility", folder: "html.forms-accessibility", status: 'review', titles: { en: "HTML Forms and Accessibility Basics", ru: "HTML-формы и основы доступности" } },
  { id: "js.async-fetch", folder: "js.async-fetch", status: 'review', titles: { en: "Asynchronous JavaScript, Promises, async/await, and Fetch", ru: "Асинхронный JavaScript: Promise, async/await и Fetch" } },
  { id: "js.basics-types-control-flow", folder: "js.basics-types-control-flow", status: 'review', titles: { en: "JavaScript Basics: Values, Operators, Conditions, and Loops", ru: "Основы JavaScript: значения, операторы, условия и циклы" } },
  { id: "js.collections-weakmaps", folder: "js.collections-weakmaps", status: 'review', titles: { en: "JavaScript Collections: Map, Set, and WeakMap", ru: "Коллекции JavaScript: Map, Set и WeakMap" } },
  { id: "js.dom-events", folder: "js.dom-events", status: 'review', titles: { en: "The DOM and Browser Events", ru: "DOM и события браузера" } },
  { id: "js.functions-arrays-objects", folder: "js.functions-arrays-objects", status: 'review', titles: { en: "Functions, Arrays and Objects", ru: "Функции, массивы и объекты" } },
  { id: "js.iterators-generators", folder: "js.iterators-generators", status: 'review', titles: { en: "JavaScript Iterators and Generators", ru: "Итераторы и генераторы JavaScript" } },
  { id: "js.object-prototypes", folder: "js.object-prototypes", status: 'review', titles: { en: "JavaScript Object Model: Prototypes, new, Classes, and this", ru: "Модель объектов JavaScript: прототипы, new, классы и this" } },
  { id: "js.regex-text-processing", folder: "js.regex-text-processing", status: 'review', titles: { en: "Regular Expressions: Search and Parse Text", ru: "Регулярные выражения: поиск и разбор текста" } },
  { id: "js.runtime-memory", folder: "js.runtime-memory", status: 'review', titles: { en: "JavaScript Runtime: Execution Contexts, Stack, Heap, and Garbage Collection", ru: "Runtime JavaScript: контексты выполнения, стек, куча и сборка мусора" } },
  { id: "js.typed-arrays-binary", folder: "js.typed-arrays-binary", status: 'review', titles: { en: "Typed Arrays and Binary Data", ru: "Типизированные массивы и бинарные данные" } },
  { id: "network.dns-tcp-tls", folder: "network.dns-tcp-tls", status: 'review', titles: { en: "DNS, IP, TCP/UDP, Ports, and TLS", ru: "DNS, IP, TCP/UDP, порты и TLS" } },
  { id: "performance.accessibility", folder: "performance.accessibility", status: 'review', titles: { en: "React Performance and Web Accessibility", ru: "Производительность React и доступность веб-интерфейсов" } },
  { id: "react.api-custom-hooks", folder: "react.api-custom-hooks", status: 'review', titles: { en: "API Layers, Custom Hooks, and Reliable Data Loading", ru: "API-слой, custom hooks и надёжная загрузка данных" } },
  { id: "react.components-jsx-state", folder: "react.components-jsx-state", status: 'review', titles: { en: "React Components, JSX, Props, and State", ru: "Компоненты React, JSX, props и state" } },
  { id: "react.context-shared-state", folder: "react.context-shared-state", status: 'review', titles: { en: "Shared State, Lifting State Up, and Context API", ru: "Общее состояние, lifting state up и Context API" } },
  { id: "react.effects-lists-composition", folder: "react.effects-lists-composition", status: 'review', titles: { en: "React Effects, Component Composition, and Lists", ru: "Эффекты React, композиция компонентов и списки" } },
  { id: "react.forms-validation", folder: "react.forms-validation", status: 'review', titles: { en: "React Forms, Validation, and Accessible Errors", ru: "Формы React, валидация и доступные ошибки" } },
  { id: "react.router-spa", folder: "react.router-spa", status: 'review', titles: { en: "Single-Page Applications and React Router", ru: "Одностраничные приложения и React Router" } },
  { id: "testing.react-testing-library", folder: "testing.react-testing-library", status: 'review', titles: { en: "Testing React Components with Testing Library", ru: "Тестирование React-компонентов с Testing Library" } },
  { id: "tooling.advanced-package-workflows", folder: "tooling.advanced-package-workflows", status: 'review', titles: { en: "Advanced Package Workflows: SemVer, Lockfiles, and CI", ru: "Продвинутая работа с пакетами: SemVer, lockfiles и CI" } },
  { id: "tooling.node-npm-vite", folder: "tooling.node-npm-vite", status: 'review', titles: { en: "Node.js, npm, Vite, and Project Tooling", ru: "Node.js, npm, Vite и инструменты проекта" } },
  { id: "typescript.fundamentals", folder: "typescript.fundamentals", status: 'review', titles: { en: "TypeScript Fundamentals: Types, Unions, and Generic Collections", ru: "Основы TypeScript: типы, union и обобщённые коллекции" } },
  { id: "ui.bootstrap-mui", folder: "ui.bootstrap-mui", status: 'review', titles: { en: "UI Libraries: Bootstrap Grid, Material UI, and Build-versus-Buy", ru: "UI-библиотеки: Bootstrap Grid, Material UI и выбор build-versus-buy" } },
  { id: "ui.design-systems", folder: "ui.design-systems", status: 'review', titles: { en: "UI Kits, Design Tokens, and Reusable Components", ru: "UI Kit, дизайн-токены и переиспользуемые компоненты" } },
  { id: "web.internet-http", folder: "web.internet-http", status: 'review', titles: { en: "How the Web Works: URLs, HTTP, and Browser DevTools", ru: "Как работает веб: URL, HTTP и DevTools браузера" } },
];
