import * as THREE from "three";
import {FogBase} from "three/src/scenes/Fog";
import {Material} from "three/src/materials/Material";
import {Texture} from "three/src/textures/Texture";

export interface SceneSettings {
  background?: THREE.Color | THREE.Texture | null,
  fog?: THREE.FogBase | null,
  overrideMaterial?: THREE.Material | null,
  autoUpdate?: boolean,
  environment?: null | THREE.Texture
}

export type Light =
  THREE.DirectionalLight
  | THREE.PointLight
  | THREE.HemisphereLight
  | THREE.AmbientLight
  | THREE.RectAreaLight
  | THREE.SpotLight

export type Camera = THREE.PerspectiveCamera | THREE.OrthographicCamera | THREE.CubeCamera
export type Grid = THREE.GridHelper | THREE.PolarGridHelper

export type Geometries =
  THREE.BoxGeometry
  | THREE.CircleGeometry
  | THREE.ConeGeometry
  | THREE.CylinderGeometry
  | THREE.DodecahedronGeometry
  | THREE.EdgesGeometry
  | THREE.ExtrudeGeometry
  | THREE.IcosahedronGeometry
  | THREE.LatheGeometry
  | THREE.OctahedronGeometry
  | THREE.ParametricGeometry
  | THREE.PlaneGeometry
  | THREE.PolyhedronGeometry
  | THREE.RingGeometry
  | THREE.ShapeGeometry
  | THREE.SphereGeometry
  | THREE.TetrahedronGeometry
  | THREE.TextGeometry
  | THREE.TorusGeometry
  | THREE.TorusKnotGeometry
  | THREE.TubeGeometry
  | THREE.WireframeGeometry

export type MaterialConstructors = THREE.MeshPhongMaterial | THREE.MeshBasicMaterial | THREE.MeshLambertMaterial


//интерфейся для организации елементов объекта
interface GroupsElements {
  [name: string]: THREE.Group
}

interface ElementInElements {
  [name: string]: THREE.Mesh
}

export interface Elements {
  groups: GroupsElements,
  elements: ElementInElements
}

export type EventTarget = {
  [name: string]: THREE.Group | THREE.Mesh;
};

export interface Event {
  (): void
}

export interface AddDOMElement {
  (element: THREE.Group | THREE.Mesh, eventTargets: EventTarget, addEvent?: boolean): void
}

export interface AddEvent {
  (array: EventTarget): void
}

export interface RemoveEvent {
  (array: EventTarget): void
}


export interface EventItem {
  eventTargets: EventTarget,
  addDOMElement: AddDOMElement,
  event: Event,
  addEvent: AddEvent,
  removeEvent: RemoveEvent
}


export interface CameraPositionProps {
  position: { x: number, y: number, z: number },
  rotation: { x: number, y: number, z: number },
  time: number,
  ease?: string,
}


export type SceneCreatorArguments = {
  background?: THREE.Color | THREE.Texture | null | undefined,
  fog?: FogBase | null | undefined,
  overrideMaterial?: Material | null | undefined,
  autoUpdate?: boolean | undefined,
  environment?: Texture | null | undefined
}

export interface CameraCreatorArguments {
  width: number,
  height: number,
  position?: { x?: number, y?: number, z?: number },
  rotation?: { x?: number, y?: number, z?: number },
  near?: number,
  far?: number,
  fov?: number
}


export interface AddElementInScene {
  element: THREE.Mesh | THREE.Mesh[] | THREE.Group,
  nameElement: string,
  inGroup?: boolean,
  position?: [x: number, y: number, z: number ],
}
