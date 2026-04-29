# Version Stack

Exact versions used in this project (reference for development and CI). Update when upgrading major dependencies.

> Note: this repository is a **static site** without a build toolchain. Runtime dependencies are loaded as ESM from CDNs and documented here.

## Top Stack (quick visibility)

| Layer | Component | Version | Notes |
|------|-----------|---------|------|
| Runtime | Browser | N/A | Runs in modern browsers with ESM + import maps. |
| Frontend | HTML/CSS/JS | N/A | Static entrypoint: `index.html`. |
| 3D | Three.js | **0.129.0** | ESM via `unpkg` + importmap (`"three"`). |
| Loader | GLTFLoader | **0.129.0** | From `three/examples/jsm/loaders/GLTFLoader.js`. |
| Animation | GSAP | **3.12.5** | ESM via `jsdelivr`. |
| Model | GLB | N/A | Primary: `assets/models/flying_bee-v2.glb`. |
| PWA | Web Manifest | N/A | `assets/site.webmanifest`. |
| Offline | Service Worker | N/A | `sw.js` (same-origin cache only). |

---

## Local verification (CI parity)

```bash
./scripts/dev-verify.sh
```

