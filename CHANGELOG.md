# Changelog

All notable changes to this project will be documented in this file.

The format is based on **Keep a Changelog**, and this project adheres to **Semantic Versioning** where practical.

## [1.0.0] - 2026-04-29

### Added

- Import-map based ESM loading (resolves `three` bare specifier used by `GLTFLoader`).
- Three.js render-loop energy savings via `visibilitychange` (pause/resume RAF).
- IntersectionObserver-based section detection (removes scroll layout thrashing).
- Service worker with same-origin cache only (`sw.js`).
- Local model loading with fallback (`assets/models/flying_bee-v2.glb` → remote URL).
- Repository standard docs (`README.md`, `SECURITY.md`, `CONTRIBUTING.md`, etc.).

