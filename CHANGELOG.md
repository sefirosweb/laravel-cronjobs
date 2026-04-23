# Changelog

All notable changes to `sefirosweb/laravel-cronjobs` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

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
