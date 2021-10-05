// outer
import * as THREE from 'three';
import { MaterialConstructors } from "./threejsTypes";

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

    return lights;
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

    return light;
}


export function creatGrid(width: number = 100, height: number = 100) {
    const helper = new THREE.GridHelper(100, 100);
    helper.position.y = -1;
    if (helper.material instanceof THREE.Material) helper.material.opacity = 0.25;
    if (helper.material instanceof THREE.Material) helper.material.transparent = true;
    return helper;
}

//  !! функция создания куба

export function creatBox(x: number = 0, y: number = 0, z: number = 0,
                         materialSettings?: MaterialConstructors,
                         width: number = 0.9, height: number = 0.9, depth: number = 0.9) {
    // геометрия куба
    const geometry = new THREE.BoxGeometry(width, height, depth);
    // материал куба
    const material = materialSettings || new THREE.MeshPhongMaterial({
        color: '#140ccd',
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true
    });
    // сборка куба
    const cube = new THREE.Mesh(geometry, material);
    // указание положения куба
    cube.position.copy(new THREE.Vector3(x, y, z))

    return cube;
}


//  !! функция создания куба кубов )
export function generationCubs(maxWidth: number, maxHeight: number) {
    let array = []

    function widthGeneration(maxWidth: number, height: number) {
        let perimeter = []
        for (let i = 0; i < maxWidth; i++) {
            for (let j = 0; j < maxWidth; j++) perimeter.push(creatBox(i, j, height))
        }
        return perimeter
    }

    for (let i = 0; i < maxHeight; i++) array.push(...widthGeneration(maxWidth, i))

    return array;
}


export function planeCreator(width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1) {
    const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    const material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide})
    material.visible=false
    return new THREE.Mesh(geometry, material);
}
