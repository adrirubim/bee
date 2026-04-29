# Technical Guide — actividad_35 (Bee 3D Scroll)

Single **Flat Master Docs** technical guide for this repository.

**Canonical rule:** this document is the **source of truth for operational behavior** of the shipped runtime.
If you find divergence between docs and runtime behavior, treat it as a **release bug** and fix docs, code, or both.

---

## Table of Contents

- [Architecture](#architecture)
- [Runtime & Entry Points](#runtime--entry-points)
- [3D Model Loading](#3d-model-loading)
- [Section Detection (IntersectionObserver)](#section-detection-intersectionobserver)
- [Energy Saving (visibilitychange)](#energy-saving-visibilitychange)
- [PWA](#pwa)
- [Service Worker](#service-worker)
- [Security](#security)
- [Local Verification](#local-verification)

---

## Architecture

High-level runtime path:

```text
index.html
  ├─ <script type="importmap"> → maps "three" for GLTFLoader
  ├─ assets/css/style.css
  ├─ assets/site.webmanifest
  └─ <script type="module" src="assets/js/main.js">
        ├─ Three.js scene + camera + renderer
        ├─ GLTFLoader loads GLB model
        ├─ GSAP animates model transforms
        ├─ IntersectionObserver selects active section
        └─ RAF render loop (paused when tab hidden)
```

---

## Runtime & Entry Points

- Entry HTML: `index.html`
- Main JS: `assets/js/main.js`
- 3D container: `#container3D` (fixed, pointer-events none)

### Import map (required)

`GLTFLoader` imports `three` as a **bare specifier** (`"three"`). Browsers require an import map to resolve it.

---

## 3D Model Loading

`assets/js/main.js` loads models in this priority order:

1. `assets/models/flying_bee-v2.glb` (primary, local)
2. Remote fallback (GitHub raw) — used only if the local file fails to load

If you want strict offline/no-remote behavior, remove the fallback.

---

## Section Detection (IntersectionObserver)

Section activation is handled via `IntersectionObserver` (no scroll-driven `getBoundingClientRect` loop).

Heuristic:

- Observe `.section` nodes.
- On callback, select the intersecting entry with highest `intersectionRatio`.
- Trigger `moveToSection(id)` which updates the model with GSAP tweens.

---

## Energy Saving (visibilitychange)

The RAF render loop is paused when `document.hidden` is true and resumed when visible again. This reduces CPU/GPU usage and battery drain.

---

## PWA

- Manifest: `assets/site.webmanifest`
- Icons: `assets/img/` (`favicon_*.png`, `favicon.svg`, `favicon.ico`)

`start_url` and `scope` are relative to support sub-folder hosting.

---

## Service Worker

`sw.js` caches **same-origin GET** requests only. It intentionally avoids caching cross-origin CDNs and remote model URLs to prevent CORS/cache failures.

---

## Security

See `SECURITY.md`.

Practical notes:

- Avoid committing secrets.
- Prefer local assets over remote CDNs for stronger supply-chain control.
- Keep `target="_blank"` links protected with `rel="noopener noreferrer"`.

---

## Local Verification

Run the integrity gate:

```bash
./scripts/dev-verify.sh
```

