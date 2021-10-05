import * as THREE from "three";
import { Texture } from "three/src/textures/Texture";
import { FogBase } from "three/src/scenes/Fog";
import { Material } from "three/src/materials/Material";
import {Color} from "three";


export function creatScene(background: THREE.Color | THREE.Texture | THREE.WebGLCubeRenderTarget | null = null,
                           fog?: FogBase | null,
                           overrideMaterial?: Material | null,
                           autoUpdate?: boolean,
                           environment?: null | Texture
) {
  // creat scene object
  const scene = new THREE.Scene()

  // add effect and settings in scene object

  if (background) scene.background = background as Color;
  if (fog) scene.fog = fog
  if (overrideMaterial) scene.overrideMaterial = overrideMaterial
  if (autoUpdate) scene.autoUpdate = autoUpdate
  if (environment) scene.environment = environment

  return scene
}

export function creatPerspectiveCamera(width: number, height: number, x: number = 0, y: number = 0, z: number = 5) {
  const cameraPoint = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000)
  cameraPoint.position.z = z;
  cameraPoint.position.x = x;
  cameraPoint.position.y = y;
  // const target = new THREE.Vector3(1, 2, 3)
  // cameraPoint.getWorldDirection(target)
  // cameraPoint.focus=122222
  cameraPoint.rotateX(0)
  cameraPoint.rotateY(-0.5)
  cameraPoint.rotateZ(0)
  return cameraPoint
}

