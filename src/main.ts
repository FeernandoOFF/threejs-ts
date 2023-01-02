import gsap from 'gsap';
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;

// Light

const light = new THREE.PointLight(0xffffff, 1.2, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Sphere

const geometry = new THREE.SphereGeometry(3, 60, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0.6,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
// Cube

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

// Renderer
const canvas = document.querySelector('.canvas') as HTMLCanvasElement;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);

// Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  //   Update scene size
  renderer.setSize(sizes.width, sizes.height);
});

function animation() {
  window.requestAnimationFrame(animation);
  controls.update();
  renderer.render(scene, camera);
}
animation();

// Sphere color change on mouse move
let isMouseDown = false;
window.addEventListener('mousedown', () => (isMouseDown = true));
window.addEventListener('mouseup', () => (isMouseDown = false));
window.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    const rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ];
    let { r, g, b } = new THREE.Color(`rgb(${rgb.join(',')})`);
    gsap.to(sphere.material.color, { r, g, b });
  }
});
