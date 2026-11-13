/* Cena 3D de fundo: grid neon infinito, partículas de dados e núcleo holográfico.
   Reage ao mouse e ao scroll (a câmera "mergulha" na cena ao rolar a página). */
import * as THREE from "three";

const canvas = document.getElementById("bg3d");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setClearColor(0x03070c, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x03070c, 0.045);

const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
camera.position.set(0, 2.2, 10);

const CYAN = new THREE.Color(0x00e5ff);
const AQUA = new THREE.Color(0x19f5b4);
const VIOLET = new THREE.Color(0x7b5cff);

/* ---------- Grid floor (shader com linhas que brilham) ---------- */
const gridMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  uniforms: { uTime: { value: 0 }, uColor: { value: CYAN }, uAqua: { value: AQUA } },
  vertexShader: `
    varying vec2 vUv; varying vec3 vPos;
    uniform float uTime;
    void main(){
      vUv = uv; vec3 p = position;
      // pequenas ondulações no terreno, mais altas nas laterais
      float side = smoothstep(4.0, 22.0, abs(p.x));
      p.z += sin(p.x*0.35 + uTime*0.6)*0.25*side + cos(p.y*0.25 + uTime*0.4)*1.6*side;
      vPos = p;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
    }`,
  fragmentShader: `
    varying vec2 vUv; varying vec3 vPos;
    uniform float uTime; uniform vec3 uColor; uniform vec3 uAqua;
    float line(float v, float w){ float f = abs(fract(v)-0.5); return smoothstep(w, 0.0, 0.5 - f); }
    void main(){
      vec2 g = vPos.xy * 0.5;
      g.y += uTime * 0.6;
      float l = max(line(g.x, 0.035), line(g.y, 0.035));
      float pulse = smoothstep(0.92, 1.0, sin(g.y*0.35 - uTime*1.8)*0.5+0.5);
      vec3 col = mix(uColor, uAqua, pulse);
      float fade = smoothstep(60.0, 4.0, length(vPos.xy));
      float a = l * fade * (0.55 + pulse*0.9);
      gl_FragColor = vec4(col, a);
    }`,
});
const grid = new THREE.Mesh(new THREE.PlaneGeometry(90, 90, 120, 120), gridMat);
grid.rotation.x = -Math.PI / 2;
grid.position.y = -2.4;
scene.add(grid);

/* ---------- Partículas de dados ---------- */
const COUNT = window.innerWidth < 700 ? 900 : 2200;
const pos = new Float32Array(COUNT * 3);
const col = new Float32Array(COUNT * 3);
const seed = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  pos[i * 3] = (Math.random() - 0.5) * 60;
  pos[i * 3 + 1] = Math.random() * 18 - 2;
  pos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10;
  const c = Math.random() < 0.12 ? VIOLET : Math.random() < 0.5 ? AQUA : CYAN;
  col.set([c.r, c.g, c.b], i * 3);
  seed[i] = Math.random();
}
const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
pGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
const pMat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
  uniforms: { uTime: { value: 0 }, uPx: { value: renderer.getPixelRatio() } },
  vertexShader: `
    attribute float aSeed; varying vec3 vColor; varying float vA;
    uniform float uTime; uniform float uPx;
    void main(){
      vColor = color;
      vec3 p = position;
      p.y += mod(uTime*0.25*(0.3+aSeed) + aSeed*20.0, 20.0) - 6.0;
      p.x += sin(uTime*0.3 + aSeed*6.28)*0.4;
      vec4 mv = modelViewMatrix * vec4(p,1.0);
      gl_PointSize = (1.2 + aSeed*2.6) * uPx * (12.0 / -mv.z);
      vA = 0.35 + 0.65*abs(sin(uTime*1.5 + aSeed*40.0));
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: `
    varying vec3 vColor; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5);
      float a = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(vColor, a*vA);
    }`,
});
const particles = new THREE.Points(pGeo, pMat);
scene.add(particles);

/* ---------- Núcleo holográfico ---------- */
const core = new THREE.Group();
core.position.set(4.5, 1.6, -4);
scene.add(core);

const ico = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.6, 1),
  new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.55 })
);
core.add(ico);
const icoInner = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.9, 0),
  new THREE.MeshBasicMaterial({ color: AQUA, wireframe: true, transparent: true, opacity: 0.8 })
);
core.add(icoInner);
const rings = [];
for (let i = 0; i < 3; i++) {
  const r = new THREE.Mesh(
    new THREE.TorusGeometry(2.4 + i * 0.55, 0.012, 8, 160),
    new THREE.MeshBasicMaterial({ color: i === 1 ? AQUA : CYAN, transparent: true, opacity: 0.6 - i * 0.15 })
  );
  r.rotation.x = Math.PI / 2 + (i - 1) * 0.5;
  r.rotation.y = i * 0.7;
  core.add(r);
  rings.push(r);
}

/* Colunas de luz "cidade" ao fundo */
const towers = new THREE.Group();
const tMat = new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.14 });
for (let i = 0; i < 40; i++) {
  const h = 2 + Math.random() * 12;
  const m = new THREE.Mesh(new THREE.BoxGeometry(1 + Math.random() * 2, h, 1 + Math.random() * 2), tMat);
  const side = Math.random() < 0.5 ? -1 : 1;
  m.position.set(side * (9 + Math.random() * 22), -2.4 + h / 2, -10 - Math.random() * 50);
  towers.add(m);
}
scene.add(towers);

/* ---------- Interação ---------- */
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener("pointermove", (e) => {
  mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
});

let scrollP = 0;
function readScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollP = max > 0 ? window.scrollY / max : 0;
}
window.addEventListener("scroll", readScroll, { passive: true });

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  core.position.x = w < 960 ? 0 : 4.5;
}
window.addEventListener("resize", resize);
resize();
readScroll();

const clock = new THREE.Clock();
let sp = 0;
function tick() {
  const t = clock.getElapsedTime();
  mouse.x += (mouse.tx - mouse.x) * 0.05;
  mouse.y += (mouse.ty - mouse.y) * 0.05;
  sp += (scrollP - sp) * 0.06;

  gridMat.uniforms.uTime.value = t;
  pMat.uniforms.uTime.value = t;

  ico.rotation.x = t * 0.18; ico.rotation.y = t * 0.24;
  icoInner.rotation.x = -t * 0.4; icoInner.rotation.z = t * 0.3;
  rings.forEach((r, i) => (r.rotation.z = t * (0.15 + i * 0.08) * (i % 2 ? -1 : 1)));
  core.position.y = 1.6 + Math.sin(t * 0.8) * 0.25 - sp * 6;
  core.scale.setScalar(1 + sp * 0.8);

  // câmera mergulha e gira levemente conforme o scroll
  camera.position.x = mouse.x * 1.2 + Math.sin(sp * Math.PI * 2) * 2.5;
  camera.position.y = 2.2 - mouse.y * 0.6 + sp * 3;
  camera.position.z = 10 - sp * 26;
  camera.lookAt(0, 0.6 + sp * 1.5, camera.position.z - 12);
  camera.rotation.z += Math.sin(sp * Math.PI) * 0.05;

  renderer.render(scene, camera);
  if (!reduce) requestAnimationFrame(tick);
}
tick();
if (reduce) window.addEventListener("scroll", () => requestAnimationFrame(tick), { passive: true });
