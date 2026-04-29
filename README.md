<p align="center">
  <img src="assets/img/bee.png" alt="Bee logo" width="96" />
</p>

# Bee — 3D Scroll

> A minimalist, performance-oriented interactive 3D scroll page (Vanilla ESM + Three.js + GSAP) with section-based model transitions, energy-saving render pause, and optional offline caching.

[![JavaScript](https://img.shields.io/badge/JavaScript-ESM-yellow?style=flat&logo=javascript&logoColor=black)](REPO_STANDARD.md)
[![Framework](https://img.shields.io/badge/Framework-N%2FA-lightgrey?style=flat)](REPO_STANDARD.md)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tests](https://img.shields.io/github/actions/workflow/status/adrirubim/actividad_35/tests.yml?branch=main&label=Tests&style=flat&color=brightgreen)](https://github.com/adrirubim/actividad_35/actions/workflows/tests.yml)
[![Lint](https://img.shields.io/github/actions/workflow/status/adrirubim/actividad_35/lint.yml?branch=main&label=Lint&style=flat&color=blue)](https://github.com/adrirubim/actividad_35/actions/workflows/lint.yml)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat)](LICENSE)

## 📋 Table of Contents

- [Operational Quickstart](#operational-quickstart)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Security](#security)
- [Documentation](#documentation)
- [CI/CD](#cicd)
- [Testing](#testing)
- [Architecture](#architecture)
- [Project Status](#project-status)
- [Default Users (development)](#default-users-development)
- [Useful Commands](#useful-commands)
- [Before Pushing to GitHub](#before-pushing-to-github)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

<a id="operational-quickstart"></a>
## ⚙️ Operational Quickstart

Use these commands from the **repository root** as your main entrypoints:

| Command | Purpose | Notes |
|--------|---------|-------|
| `python3 -m http.server 8000` | Serve static site locally | Recommended for quick dev |
| `./scripts/dev-verify.sh` | Local integrity gate | Verifies local references (head + manifest + model) |

Default URL: `http://localhost:8000/index.html`.

For detailed docs: start from [docs/README.md](docs/README.md).

For a full local quality gate before pushing, see [Before Pushing to GitHub](#before-pushing-to-github).

---

<a id="overview"></a>
## 🎯 Overview

**Bee** is a small, focused front-end project that demonstrates:

- A Three.js scene rendered into a fixed full-viewport canvas
- A GLB animated model (bee) loaded with `GLTFLoader`
- Section-based transitions driven by `IntersectionObserver`
- A performance-conscious render loop that pauses when the tab is hidden

---

<a id="features"></a>
## ✨ Features

- **Section-based 3D transitions**
  - Model position/rotation is animated per section via GSAP.
- **Performance-oriented navigation**
  - Uses `IntersectionObserver` instead of scroll-driven layout reads.
- **Energy saving**
  - Pauses `requestAnimationFrame` when `document.hidden` is true.
- **Installable PWA (basic)**
  - Manifest + icon set included.

---

<a id="tech-stack"></a>
## 🛠 Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript (ESM)
- **3D**: Three.js
- **Animations**: GSAP
- **Model**: GLB (`assets/models/flying_bee-v2.glb`)

---

<a id="requirements"></a>
## 📦 Requirements

- A modern browser (ESM + import maps support)
- Any static web server (local or production)

---

<a id="installation"></a>
## 🚀 Installation

Serve the repository with a static server:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`

---

<a id="security"></a>
## 🔒 Security

- Do not commit secrets (this repo should not require `.env`).
- Keep third-party dependencies reviewed and updated.

See [SECURITY.md](SECURITY.md).

---

<a id="documentation"></a>
## 📚 Documentation

Documentation index: [docs/README.md](docs/README.md).

| Section | Links |
|---------|-------|
| **Operational** | [Technical Guide](TECHNICAL_GUIDE.md) |
| **Policy** | [REPO_STANDARD.md](REPO_STANDARD.md) · [SECURITY.md](SECURITY.md) · [CONTRIBUTING.md](CONTRIBUTING.md) · [LICENSE](LICENSE) |

---

<a id="cicd"></a>
## 🔄 CI/CD

N/A (workflows not shipped in this repository yet).  
Local CI-parity gate: `./scripts/dev-verify.sh`.

---

<a id="testing"></a>
## 🧪 Testing

N/A (no unit tests).  
Integrity gate: `./scripts/dev-verify.sh`.

---

<a id="architecture"></a>
## 🏗 Architecture

Runtime architecture:

```text
index.html
  ├─ importmap ("three")
  ├─ assets/css/style.css
  ├─ assets/site.webmanifest
  └─ assets/js/main.js
       ├─ Three.js scene + renderer
       ├─ GLTFLoader loads GLB model
       ├─ IntersectionObserver chooses active section
       └─ GSAP tweens update model transforms
```

---

<a id="project-status"></a>
## 📊 Project Status

- **Status:** Stable ✅
- **Release line:** 1.0.0

---

<a id="default-users-development"></a>
## ⚠️ Default Users (development)

N/A.

---

<a id="useful-commands"></a>
## 🛠 Useful Commands

```bash
python3 -m http.server 8000
./scripts/dev-verify.sh
```

---

<a id="before-pushing-to-github"></a>
## 📤 Before Pushing to GitHub

Run:

```bash
./scripts/dev-verify.sh
```

---

<a id="contributing"></a>
## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

<a id="author"></a>
## 👨‍💻 Author

**Developed by:** [Adrián Morillas Pérez](https://linktr.ee/adrianmorillasperez)

### Connect

- 📧 **Email:** [adrianmorillasperez@gmail.com](mailto:adrianmorillasperez@gmail.com)
- 💻 **GitHub:** [@adrirubim](https://github.com/adrirubim)
- 🌐 **Linktree:** [adrianmorillasperez](https://linktr.ee/adrianmorillasperez)
- 💼 **LinkedIn:** [Adrián Morillas Pérez](https://es.linkedin.com/in/adrianmorillasperez)
- 📱 **Instagram:** [@adrirubim](https://www.instagram.com/adrirubim)
- 📘 **Facebook:** [AdriRubiM](https://www.facebook.com/AdriRubiM/)

---

<a id="license"></a>
## 📄 License

MIT. See [LICENSE](LICENSE) for details.

---

**Last Updated:** April 2026 · **Status:** Stable ✅ · **Version:** v1.0.0 · **Stack:** [VERSION_STACK.md](VERSION_STACK.md)

