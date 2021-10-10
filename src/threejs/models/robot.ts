import * as THREE from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {MODELS} from "../constants";
import {EventItem} from "../types";
import ThreeJS from "../classConstructors/base";

const clickOnRobot = (canvas: ThreeJS) => {

  let danceClip: number = 0;

  return (event: Event) => {
    event.preventDefault();

    const {getIntersects, getModel} = canvas.getEventControllers()

    const robot = getModel(MODELS.ROBOT);
    if (robot === undefined) return;

    try {
      const intersects = getIntersects({
        mouseCoordinates: {x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY},
        object: robot,
      });

      if (intersects.length > 0) {
        // Создаю микшер.
        const mixer = new THREE.AnimationMixer(robot);

        // Достаю массив анимаций.
        const clips = robot.animations;

        // Проигрываю все анимации по очереди.
        const clip = clips[danceClip];

        danceClip === (clips.length - 1)
          ? danceClip = 0
          : danceClip++

        const action = mixer.clipAction(clip);

        action.play();


        (robot as any).tick = (delta: any) => mixer.update(delta);
        canvas.updatable.add(robot);
      }
    } catch (error) {
      console.log(`ошибка выполнения clickOnRobot ${MODELS.ROBOT}`, error)
    }
  }
};

const robotFaceRage = (canvas: ThreeJS) => (event: Event) => {
  event.preventDefault();

  const {getIntersects, getModel} = canvas.getEventControllers()

  const robot = getModel(MODELS.ROBOT);
  if (robot === undefined) return;

  try {
    const face: any = robot.getObjectByName('Head_4');

    const intersects = getIntersects({
      mouseCoordinates: {x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY},
      object: robot,
    });

    if (intersects.length > 0) {
      if (face.morphTargetInfluences[0] !== 1) face.morphTargetInfluences = [1, 0, 0]
    } else if (face.morphTargetInfluences[0] === 1) face.morphTargetInfluences = [0, 0, 0]

  } catch (error) {
    console.log(`ошибка выполнения robotFaceRage ${MODELS.ROBOT}`, error)
  }
}

export const robotEvents: EventItem[] = [
  {
    function: robotFaceRage,
    type: "mousemove",
    name: 'robot_face-rage',
    addInRequestAnimation: false
  },
  {
    function: clickOnRobot,
    type: "click",
    name: 'robot_dance',
    addInRequestAnimation: false
  }
];


export function robotSetting(element: THREE.Group, gltf: GLTF): THREE.Group {
  element.animations = gltf.animations

  const face: any = element.getObjectByName('Head_4');
  face.morphTargetInfluences = [0, 0, 0]

  return element;
};
