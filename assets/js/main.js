import * as THREE from "https://unpkg.com/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";

document.addEventListener("DOMContentLoaded", () => {
  // CÁMARA Y ESCENA
  const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 13;

  const scene = new THREE.Scene();
  let bee;
  let mixer;
  const clock = new THREE.Clock();

  // CARGADOR DE MODELO
  const loader = new GLTFLoader();
  const modelUrls = [
    "assets/models/flying_bee-v2.glb",
    "https://raw.githubusercontent.com/adrirubim/bee/ab807ee87a95264d243b1cc947bc073cf6cbfb80/flying_bee.glb"
  ];

  const onModelLoaded = (gltf) => {
    bee = gltf.scene;
    scene.add(bee);

    mixer = new THREE.AnimationMixer(bee);
    mixer.clipAction(gltf.animations[0]).play();
    modelMove(); // primera posición
  };

  const onModelProgress = (xhr) => {
    if (xhr.total) console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  };

  const loadModelWithFallback = (index) => {
    const url = modelUrls[index];
    loader.load(
      url,
      onModelLoaded,
      onModelProgress,
      (error) => {
        if (index + 1 < modelUrls.length) {
          console.warn("Fallo cargando modelo, intentando fallback:", url, error);
          loadModelWithFallback(index + 1);
          return;
        }
        console.error("Error loading model:", error);
      }
    );
  };

  loadModelWithFallback(0);

  // RENDERER
  const container = document.getElementById("container3D");
  if (!container) {
    console.error("No se encontró #container3D en el HTML.");
    return;
  }

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // ILUMINACIÓN
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
  scene.add(ambientLight);

  const topLight = new THREE.DirectionalLight(0xffffff, 1);
  topLight.position.set(500, 500, 500);
  scene.add(topLight);

  // ANIMACIÓN DE RENDER
  const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(clock.getDelta());
  };
  reRender3D();

  // POSICIONES SEGÚN SECCIÓN
  const arrPositionModel = [
    {
      id: "banner",
      position: { x: 0, y: -1, z: 0 },
      rotation: { x: 0, y: 1.5, z: 0 }
    },
    {
      id: "intro",
      position: { x: 1, y: -1, z: -5 },
      rotation: { x: 0.5, y: -0.5, z: 0.5 }
    },
    {
      id: "description",
      position: { x: -1, y: -1, z: -5 },
      rotation: { x: 0, y: 0.5, z: 0.2 }
    },
    {
      id: "contact",
      position: { x: 0.45, y: -2, z: -10 },
      rotation: { x: 0.2, y: -0.5, z: -0.2 }
    }
  ];

  const sections = Array.from(document.querySelectorAll(".section"));
  let lastSectionId;
  let rafScheduled = false;

  // FUNCIÓN DE MOVIMIENTO
  const modelMove = () => {
    let currentSection;
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3) {
        currentSection = section.id;
      }
    }

    if (!currentSection || currentSection === lastSectionId) return;
    lastSectionId = currentSection;

    const newIndex = arrPositionModel.findIndex(val => val.id === currentSection);
    if (newIndex >= 0 && bee) {
      const { position, rotation } = arrPositionModel[newIndex];
      gsap.to(bee.position, { ...position, duration: 3, ease: "power1.out", overwrite: "auto" });
      gsap.to(bee.rotation, { ...rotation, duration: 3, ease: "power1.out", overwrite: "auto" });
    }
  };

  // EVENTOS
  window.addEventListener("scroll", () => {
    if (!bee || rafScheduled) return;
    rafScheduled = true;
    window.requestAnimationFrame(() => {
      rafScheduled = false;
      modelMove();
    });
  }, { passive: true });

  window.addEventListener("resize", () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
});
