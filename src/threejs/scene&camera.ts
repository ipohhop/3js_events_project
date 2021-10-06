import * as THREE from "three";
import {CameraCreatorArguments, SceneCreatorArguments} from "./threejsTypes";


export function creatScene({
                             background,
                             fog,
                             overrideMaterial,
                             autoUpdate,
                             environment
                           }: SceneCreatorArguments = {}) {
  // создаем объект сцены
  const scene = new THREE.Scene();

  // добавляем в сцену эффекты
  if (background !== undefined) scene.background = background;
  if (fog !== undefined) scene.fog = fog;
  if (overrideMaterial !== undefined) scene.overrideMaterial = overrideMaterial;
  if (autoUpdate !== undefined) scene.autoUpdate = autoUpdate;
  if (environment !== undefined) scene.environment = environment;

  return scene;
}

export function creatPerspectiveCamera({
                                         width,
                                         height,
                                         position = {x: 0, y: 0, z: 0},
                                         rotation = {x: 0, y: -0.5, z: 0},
                                         near = 0.1,
                                         far = 5000,
                                         fov = 75
                                       }: CameraCreatorArguments) {

  // создаем объект камеры
  const cameraPoint = new THREE.PerspectiveCamera(fov, width / height, near, far);

  // устанавливаем положение камеры на сцене
  cameraPoint.position.copy(new THREE.Vector3(position.x, position.y, position.z));
  cameraPoint.rotation.copy(new THREE.Euler(rotation.x, rotation.y, rotation.z));

  return cameraPoint;
}

