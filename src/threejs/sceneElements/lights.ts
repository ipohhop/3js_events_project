import * as THREE from "three";

export function lightThreePoints() {
  const lights = [];

  lights[0] = new THREE.PointLight(0xffffff, 1, 0);
  lights[1] = new THREE.PointLight(0xffffff, 1, 0);
  lights[2] = new THREE.PointLight(0xffffff, 1, 0);

  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(-100, -200, -100);

  return lights
}

export function lightThreePointsConstructions() {
  const lights = [];

  lights[0] = new THREE.PointLight(0xffffff, 2, 0);
  lights[1] = new THREE.PointLight(0xffffff, 2, 0);
  lights[2] = new THREE.PointLight(0xffffff, 2, 0);
  lights[3] = new THREE.PointLight(0xffffff, 1, 0);
  lights[4] = new THREE.PointLight(0xffffff, 0.3, 0);

  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(-100, -200, -100);
  lights[3].position.set(0, -200, 0);
  lights[4].position.set(0, 3, 100);

  return lights
}

export function versionTwo() {
  const skyColor = 0xB1E1FF;  // light blue
  const groundColor = 0xB97A20;  // brownish orange
  const intensity = 5;

  return new THREE.HemisphereLight(skyColor, groundColor, intensity);
}

export function versionThree() {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(5, 10, 2);

  return light
}

