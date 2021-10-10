//  !! функция создания куба

import {EventItem, EventWithAnimationFrameFunction, MaterialConstructors} from "../types";
import * as THREE from "three";
import ThreeJS from "../classConstructors/base";
import {MODELS} from "../constants";

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

  return cube
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

  return array
}


const cubeClickEvent = (canvas: ThreeJS) => (event: Event) => {
  event.preventDefault();

  const {getIntersects, getModel} = canvas.getEventControllers()

  const cube = getModel(MODELS.CUB_CUBS);
  if (cube === undefined) return;

  try {
    let selectedObject: any = null;

    const intersects = getIntersects({
      mouseCoordinates: {x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY},
      object: cube,
    });

    if (intersects.length > 0) {
      selectedObject = intersects[0].object;

      if (selectedObject.material.color.getHex() === creatBox().material.color.getHex()) {
        selectedObject.material.color.set('#bde045')
      } else if (selectedObject.material.color.toJSON() === 12443717) {
        selectedObject.material.color.set('#cb0e0e')
      } else selectedObject.material.color.set(creatBox().material.color.getHex())

    }
  } catch (error) {
    console.log(`ошибка выполнения cubeClickEvent ${MODELS.ROBOT}`, error)
  }
};

const cubeHoverEvent: EventWithAnimationFrameFunction = (canvas: ThreeJS) => {
  let innerFunctionDo: boolean = false;

  return {
    listener: (event: Event) => {
      event.preventDefault();

      const {getIntersects, getModel} = canvas.getEventControllers()

      const cube = getModel(MODELS.CUB_CUBS);
      if (cube === undefined) return;

      try {

        const intersects = getIntersects({
          mouseCoordinates: {
            x: (event as MouseEvent).clientX,
            y: (event as MouseEvent).clientY
          },
          object: cube,
        });

        if (intersects.length > 0) !innerFunctionDo && (innerFunctionDo = true);
        else innerFunctionDo && (innerFunctionDo = false)


      } catch (error) {
        console.log(`ошибка выполнения cubeHoverEvent ${MODELS.ROBOT}`, error)
      }
    },
    animationsFramesFunction: () => {

      if (innerFunctionDo) {
        const {getModel} = canvas.getEventControllers();

        const cube = getModel(MODELS.CUB_CUBS);
        if (cube === undefined) return;

        cube.rotation.z += 0.01;
        cube.rotation.x += 0.01;
      }
    }
  }
};

export const cubsEvents: EventItem[] = [
  {
    function: cubeClickEvent,
    type: "click",
    name: 'cube_click_event',
    addInRequestAnimation: false
  },
  {
    function: cubeHoverEvent,
    type: "mousemove",
    name: 'cube_hover_event',
    addInRequestAnimation: false,
    haveInnerRequestAnimationFunction: true
  }
];
