// outer
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import React from 'react'
import {PerspectiveCamera} from "three";


// local
import {creatScene} from "./scene&camera";
import {
  AddElementInScene,
  Camera,
  Elements,
  Grid,
  Light, SceneCreatorArguments,
  SceneSettings
} from "./threejsTypes";


//  base class creator

export class BaseCreator {

  elements: Elements;

  renderer: THREE.WebGLRenderer;
  protected mountTime: boolean;  // отражает не был ли смонтирован canvas в DOM
  protected onWindowResize: () => void;
  render: () => void;

  private clock: THREE.Clock;
  private readonly tick: () => void;
  startAnimation: () => void;
  orbitControl: OrbitControls[];

  init: (container: React.MutableRefObject<any>, orbitControl?: boolean) => void;
  startWindowResize: () => void;
  stopWindowResize: () => void;


  scene: THREE.Scene;
  canvas: HTMLCanvasElement | undefined;
  camera: Camera;
  width: number;
  height: number;
  updatable: Set<any>;


  constructor(camera: Camera, width: number, height: number) {
    this.camera = camera  //+
    this.scene = creatScene()  //+
    this.width = width  // +
    this.height = height  // +
    this.mountTime = true
    this.clock = new THREE.Clock()
    this.updatable = new Set()
    this.orbitControl = [] //+
    this.elements = {
      groups: {},   // +
      elements: {}
    }

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,// для белого фона сцены
    })

    // метод инициации работы объекта
    this.init = (container: React.MutableRefObject<any>, orbitControl: boolean = true) => {
      // устанавливает размеры
      (this.renderer as THREE.WebGLRenderer).setSize(this.width, this.height);

      // создает тег canvas
      this.canvas = (this.renderer as THREE.WebGLRenderer).domElement;

      // вставляет canvas в DOM ( в случае если монтажа уже не произошло )
      this.mountTime && container.current.appendChild(this.canvas) && (this.mountTime = false)

      // устанавливает orbitControl
      if (!(this.camera instanceof THREE.CubeCamera) && orbitControl) this.orbitControl = [new OrbitControls(this.camera, this.canvas)];

      this.startAnimation()
    }

    this.render = () => {
      this.renderer.render(this.scene, this.camera as THREE.PerspectiveCamera)
    }

    // добавляет подписку на ресайз на глобальный объект
    this.startWindowResize = () => {
      window.addEventListener('resize', this.onWindowResize)
    }

    // удаляет подписку резайз с глобального объекта
    this.stopWindowResize = () => {
      window.removeEventListener('resize', this.onWindowResize)
    }

    // запускает анимацию ( подписку на requestAnimationFrame )
    this.startAnimation = () => {
      (this.renderer as THREE.WebGLRenderer).render(this.scene, this.camera as THREE.PerspectiveCamera);

      this.tick()

      window.requestAnimationFrame(this.startAnimation);
    };

    this.onWindowResize = () => {
      if (this.camera instanceof THREE.PerspectiveCamera) this.camera.aspect = window.innerWidth / window.innerHeight;
      if (!(camera instanceof THREE.CubeCamera)) camera.updateProjectionMatrix();
      this.width = window.innerWidth
      this.height = window.innerHeight

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }


    this.tick = () => {
      // only call the getDelta function once per frame!
      const delta = this.clock.getDelta();

      // console.log(
      //     `The last frame rendered in ${delta * 1000} milliseconds`,
      // );

      // for (const object of Array.from(this.updatable.values())) {
      //     object.tick(delta);
      // }

      // @ts-ignore
      for (const object of this.updatable) {
        object.tick(delta);
      }

    }
  }
}


// class for creat full object

export class Creator extends BaseCreator {

  addLights: (lights: (Light | Light[])) => void;
  addGrid: (grid: (Grid | Grid[])) => void;
  settingScene: (objectSettings: SceneSettings) => void;
  addElement: ({element, nameElement, inGroup, position}: AddElementInScene) => any;

  tornPerspectiveCamera: (position?: [x: number, y: number, z: number],
                          rotation?: [x: number, y: number, z: number],
                          aspect?: number, near?: number, far?: number) => void;


  constructor(camera: Camera, width: number, height: number) {
    super(camera, width, height)
    this.width = width
    this.height = height
    this.camera = camera


    // добавляет элементы в сцену
    this.addElement = ({
                         element,
                         nameElement,
                         inGroup = false,
                         position = [0, 0, 0]
                       }: AddElementInScene) => {

      // сообщение о перезаписи элемента
      if (nameElement in this.elements.groups || nameElement in this.elements.elements) console.log(`вы перезаписали элемент ${nameElement}`)

      //если element это group добавляем группу по name в объект elements.group[name] далее добавляем в сцену
      if (element instanceof THREE.Group) {
        this.elements.groups[nameElement] = element
        this.scene.add(element)

        return
      }

      //если группа создаем объект группы и заполняем элементом(ми) добавляем группу по name в объект elements.group[name] далее добавляем в сцену
      if (inGroup) {
        const group = new THREE.Group();
        if (element instanceof Array) (group as THREE.Group).add(...element)
        if (element instanceof THREE.Mesh) group.add(element)
        group.position.set(...position)
        this.elements.groups[nameElement] = (group as THREE.Group)
        this.scene.add(this.elements.groups[nameElement])

        return
      }

      //если не в группе по name в объект elements.group[name] далее добавляем в сцену
      if (element instanceof Array) {
        element.forEach((item, index) => {
          this.elements.elements[nameElement + (index + 1)] = item
          this.scene.add(item)
        })
      } else {
        element.position.set(...position)
        this.elements.elements[nameElement] = element
        this.scene.add(element)

      }
    }

    // добавляет свет в сцену
    this.addLights = (lights: Light | Light[]) => {
      if (lights) lights instanceof Array
        ? this.scene.add(...lights)
        : this.scene.add(lights);
    }

    // добавляет сетку в сцену
    this.addGrid = (grid: Grid | Grid[]) => {
      grid instanceof Array
        ? this.scene.add(...grid)
        : this.scene.add(grid);
    }

    // метод для изменения эффектов сцены
    this.settingScene = ({background, fog, overrideMaterial, environment, autoUpdate}: SceneCreatorArguments) => {
      if (background) this.scene.background = background
      if (fog) this.scene.fog = fog
      if (overrideMaterial) this.scene.overrideMaterial = overrideMaterial
      if (autoUpdate) this.scene.autoUpdate = autoUpdate
      if (environment) this.scene.environment = environment
    }

    // метод для изменения состояния камеры
    this.tornPerspectiveCamera = (
      position?: [x: number, y: number, z: number],
      rotation?: [x: number, y: number, z: number],
      aspect?: number, near?: number, far?: number
    ) => {
      if (this.camera instanceof THREE.PerspectiveCamera) {
        if (aspect) this.camera.aspect = aspect
        if (near === 0 || near) this.camera.near = near
        if (far === 0 || far) this.camera.far = far
        if (!(position === undefined)) this.camera.position.set(...position)
        if (!(rotation === undefined)) this.camera.rotation.set(...rotation)
      }
    }
  }
}
