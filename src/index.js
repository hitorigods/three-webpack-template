import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import vertexShader from './shaders/vertexShader';
import fragmentShader from './shaders/fragmentShader';

import flagTexture from './texture/jp-flag.png';

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const canvas = document.querySelector('.canvas');

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(flagTexture);

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const material = new THREE.ShaderMaterial({
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

window.addEventListener('resize', (event) => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	controls.update();

	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};
tick();
