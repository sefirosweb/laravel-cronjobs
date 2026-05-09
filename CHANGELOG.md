# Changelog

All notable changes to `sefirosweb/laravel-cronjobs` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [13.0.2] - 2026-05-09

### Added
- **Back-to-app** arrow in the top nav. Returns the user to the host's `/` so the package UI no longer feels like a dead-end embedded site.
- **Footer** with attribution and a link to the package repo on GitHub (`sefirosweb/laravel-cronjobs`).
- New `IconArrowLeft` and `IconBrandGithub` icons.
- Translations: `nav.backToApp`, `footer.builtBy`, `footer.viewSource` (ES + EN).

## [13.0.1] - 2026-05-09

This release pairs the L13 alignment bump with a complete rewrite of the bundled admin UI. The package surface (routes, payloads, model, commands, scheduler hook) is unchanged, so upgrading is just a `composer update` + republish of `cronjobs-assets`.

### Added
- **New admin UI** at `/cronjobs`. Rewritten on React 19 + TypeScript 5.7 + Vite 6 + TanStack Query 5 + i18next. The dependency on `react-bootstrap`, `@sefirosweb/react-crud`, `toastr`, `country-flag-icons` and `react-router-dom` is gone, the bundle is fully self-contained, and the design is mobile-responsive.
  - Self-hosted Geist + Geist Mono fonts (no CDN, no external network calls).
  - i18n with browser language detection + manual switcher in the top nav (ES / EN).
  - Optimistic disable/enable toggle: `deleted_at` flips in cache immediately so the row's opacity / badge / action button update without flicker, with rollback on error.
  - Hash routing (`#cronjobs` / `#queue`) — no router dependency, deep-linkable tabs.
  - Soft-delete UI: *Activos / Todos / Desactivados* segmented filter on the listing; trashed rows show a "Desactivado" badge and an Activar (restore) action.
  - Debounced search (200 ms) on the listing — searches across name, description, and controller.
  - **Cron expression modal**: dedicated quick-edit modal (separate from the Edit drawer) with a live preview pane that hits `POST /preview_job` debounced on every keystroke, showing the next 40 firings of the expression. Includes a one-click cheat sheet of common patterns (`* * * * *`, `0 * * * *`, `0 0 * * *`, `0 0 * * 0`, `0 0 1 * *`).
  - Per-action confirm modals for Run-now, Disable, Enable.
  - Keyboard accessibility on dialogs (`ConfirmModal`, `Drawer`, `CronExpressionModal`): focus enters the dialog on open and is trapped via `Tab` / `Shift+Tab`; `Escape` closes; previous focus is restored on close.

### Changed
- The default-language landing tab is now `#cronjobs`. The previous `/queue` route is now a hash tab (`#queue`) and remains a placeholder (the queue inspection backend was never implemented in this package).
- `package.json` rewritten: dropped `react-bootstrap`, `bootstrap`, `@sefirosweb/react-crud`, `toastr`, `country-flag-icons`, `react-router-dom`, `@tanstack/react-query-devtools`. Added `axios`, kept `@tanstack/react-query` (bumped to v5), `i18next` (bumped to v24), `react-i18next` (bumped to v15), `react` / `react-dom` (bumped to 19), TypeScript (^5.7), Vite (^6).
- `tsconfig.json` rewritten with strict mode, `moduleResolution: bundler`, ES2022 target, `react-jsx` runtime.
- `vite.config.ts` cleaned up — fixed alias to `@styles` and dropped the `fastRefresh: false` workaround.
- `resources/sass/` removed; styles now live in `resources/styles/` as SCSS partials (`_globals`, `_layout`, `_components`, `_responsive`, `_fonts`).
- README updated with new screenshots and a section on the new UI.

### Removed
- `resources/js/images/cron_expression.gif` — replaced by the inline cheat sheet of common cron patterns inside the new edit-cron modal.
- All `react-bootstrap` and `react-crud` artifacts: `pages/Cronjob/{page,EditCronButton,DisableButton}.tsx`, the old `pages/Queue.tsx`, `pages/NotFound.tsx`, `pages/layout/{Layout,Navbar}.tsx`, `routes/{RoutesConfig,RoutesPages}.tsx`, `components/NavLink.tsx`, `lib/{axios.interceptors,toastrInstance}.ts`, `types/configurationType.ts`.

## [12.0.3] - 2026-04-23

### Added
- GitHub Actions CI workflow (`.github/workflows/tests.yml`) running the phpunit suite against PHP 8.2 / 8.3 / 8.4 on every push / PR to `12.x`.

No source changes in this release; version bumped to stay aligned with the rest of the `sefirosweb/laravel-*` 12.x release family.

## [12.0.2] - 2026-04-23

### Changed
- Enabled `declare(strict_types=1);` on every PHP file under `src/`. Tests (22/46) pass unchanged.
- The four migrations' `/** @return void */` docblocks on `up()` / `down()` methods have been replaced with the native `: void` return type (PHP 7.1+). More concise, IDE-friendly, and enforced at runtime.
- Fixed stray double semicolon `;;` in `create_cronjobs_table` migration.

## [12.0.1] - 2026-04-23

### Added
- Orchestra Testbench integration test suite covering `CronjobsController` CRUD (store, update, destroy with soft-delete toggle), `preview_job`, `edit_cron_timer`, `execute_job` queue dispatch, and validation edge cases (422 on missing name, invalid cron expression).
- Unit tests for the `Cronjob` model (soft-delete round-trip, casts, mass-assignable surface).
- Regression test for `DispatchCronjob` constructor type hints.
- `strict_types=1` declared on all test files.

### Changed
- Rewritten `README.md` with correct artisan command names (`cronjobs:list`, `cronjobs:execute`, `cronjobs:pending`). The prior version listed `cronjob:list` which does not exist.
- README now documents the event-listener syntax for Laravel 12 (`Event::listen(...)` instead of the legacy `protected $listen` array).
- README typo fix: `aravel-cronjobs.php` → `laravel-cronjobs.php`.

## [12.0.0] - 2026-04-23

### Added
- Initial Laravel 12 release. Requires PHP `^8.2` and `laravel/framework ^12.0`.
- Orchestra Testbench baseline suite (service provider boot, routes registration, migrations).

### Changed
- Fixed Carbon 3 breaking change: `diffInSeconds()` returns a **signed float** instead of an absolute int. `test_timeout()` now uses `(int) now()->diffInSeconds($startTime, true)` to preserve the Carbon 2 elapsed-seconds semantics.
- Migrated all package routes from the legacy `'Controller@method'` string syntax to the FQCN array form `[Controller::class, 'method']`.

### Removed
- Support for Laravel `< 12` on this branch. Older majors live on the `9.x` branch with their legacy tag lineage.
