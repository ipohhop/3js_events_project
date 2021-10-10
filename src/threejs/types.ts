import * as THREE from "three";
import {FogBase} from "three/src/scenes/Fog";
import {Material} from "three/src/materials/Material";
import {Texture} from "three/src/textures/Texture";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import ThreeJS from "./classConstructors/base";
import {BufferGeometry, Group, Intersection, Mesh} from "three";


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

export interface GeometriesParameters {
  position?: [x: number, y: number, z: number],
  rotation?: [x: number, y: number, z: number],
}


// интерфейс для организации элементов объекта
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

export interface AddEvent {
  (array: EventTarget): void
}

export type Init = (container: HTMLElement, orbitControl?: boolean, startEvents?: boolean) => void;

export type EventWithAnimationFrameFunction = (canvas: ThreeJS) => {
  listener: (event: Event) => void,
  animationsFramesFunction: () => void
}

export type EventForAddEventListener = (canvas: ThreeJS) => EventListenerOrEventListenerObject
export type EventForAnimationFrame = (canvas: ThreeJS) => () => void

export interface EventItem {
  function: EventForAddEventListener | EventWithAnimationFrameFunction | EventForAnimationFrame
  type: keyof HTMLElementEventMap,
  name: string,
  addInRequestAnimation: boolean,
  haveInnerRequestAnimationFunction?: boolean,
}

export interface RequestAnimationFrameEventItemStorage {
  function: () => void | EventListenerOrEventListenerObject
}

export interface EventItemStorage {
  function: EventListenerOrEventListenerObject
  type: keyof HTMLElementEventMap,
}

export interface CameraPositionProps {
  position: { x: number, y: number, z: number },
  rotation: { x: number, y: number, z: number },
  time: number,
  ease?: string,
}


export type SceneCreatorArguments = {
  background?: THREE.Color | THREE.Texture | null,
  fog?: FogBase | null,
  overrideMaterial?: Material | null,
  autoUpdate?: boolean,
  environment?: Texture | null
}

export interface CameraCreatorArguments extends GeometriesParameters {
  width: number,
  height: number,
  near?: number,
  far?: number,
  fov?: number
}

export interface AddElementInScene extends GeometriesParameters {
  element: THREE.Mesh | THREE.Mesh[] | THREE.Group | THREE.Group[],
  name: string,
  scale?: [x: number, y: number, z: number],
  events?: EventItem[]
}

export type AddElementMethod = ({}: AddElementInScene) => void;

export interface GLAMCreatParameters extends GeometriesParameters {
  pathObjectModel: string,
  name: string,
  scale?: [x: number, y: number, z: number],
  loaderFunction?: (element: THREE.Group, gltf: GLTF) => THREE.Group,
  events?: EventItem[]
}

export type GLTFModelCreator = ({}: GLAMCreatParameters) => void;

export interface Interceptors {
  mouseCoordinates: { x: number, y: number }
  object: THREE.Group | THREE.Mesh,
}

export type InterceptorsResult = ({}: Interceptors) => THREE.Intersection[];

export interface EventsController {
  eventWorkStatus: boolean,
  events: {
    inAnimationFrame: { [eventName: string]: RequestAnimationFrameEventItemStorage },
    inEventListener: { [eventName: string]: EventItemStorage }
  },
}

export type GetModel = (name: string) => Group | Mesh<BufferGeometry, Material | Material[]> | undefined;

export type EventControllers = () => {
  getIntersects: ({}: Interceptors) => Intersection[],
  getModel: GetModel
}
