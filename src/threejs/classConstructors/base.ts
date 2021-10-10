//  Класс расширяющий Core методами настройки и добавления элементов

import {
  AddElementInScene,
  AddElementMethod,
  Camera,
  EventItem,
  GLTFModelCreator,
  GLAMCreatParameters,
  Grid,
  Light,
  SceneCreatorArguments,
  EventControllers,
  GetModel,
  InterceptorsResult,
  Interceptors,
  EventForAddEventListener,
  EventWithAnimationFrameFunction, EventForAnimationFrame,
} from "../types";
import * as THREE from "three";
import {Group, Mesh} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Core} from "./core";

/**
 * Base конструктор ThreeJS
 *
 * Нельзя использовать для инициации объекта ThreeJS
 * @class
 * @extends Core
 */
export default class ThreeJS extends Core {


  constructor(camera: Camera, width: number, height: number) {
    super(camera, width, height);
    this.width = width;
    this.height = height;
    this.camera = camera;

    this.addElement = this.addElement.bind(this);
    this.addLights = this.addLights.bind(this);
    this.addGrid = this.addGrid.bind(this);
    this.settingScene = this.settingScene.bind(this);
    this.tornPerspectiveCamera = this.tornPerspectiveCamera.bind(this);
    this.addGLTFObjectModel = this.addGLTFObjectModel.bind(this);
    this.addEvents = this.addEvents.bind(this);

    this.getEventControllers = this.getEventControllers.bind(this)
    this.getModel = this.getModel.bind(this)
    this.getIntersects = this.getIntersects.bind(this)
  }

  // ---------------------------------------------------------------------------------------------------

  /**
   * Метод addElement для добавления моделей и элементов в сцену.
   * Добавляет в объект elements экземпляра класса все добавленные модели.
   * Заполняет предопределенные при добавлении моделей события.
   *
   * @public
   * @param {Object} arguments
   *              Объект с моделью и параметрами.
   * @param {THREE.Mesh | THREE.Mesh[] | THREE.Group}     arguments.element
   *            - Модель или элемент для добавления в сцену.
   *              Обязательный параметр.
   * @param {string}                                      arguments.name
   *            - Имя (ключ) модели под которым будет храниться в объект elements экземпляра
   *              Обязательный параметр.
   * @param {[x: number, y: number, z: number]}           [arguments.position]
   *            - Задает положение элемента в сцене.
   *              По умолчанию - [0, 0, 0].
   *              Необязательный параметр.
   * @param {[x: number, y: number, z: number]}           [arguments.rotation]
   *            - Задает ротацию (поворот) элемента в сцене.
   *              По умолчанию - [0, 0, 0].
   *              Необязательный параметр.
   * @param {[x: number, y: number, z: number]}           [arguments.scale]
   *            - Задает масштаб элемента в сцене.
   *              По умолчанию - [1, 1, 1].
   *              Необязательный параметр.
   * @param {EventItem[]}           [arguments.events]
   *            - Массив событий для группы элемента.
   *              Необязательный параметр.
   */
  public addElement: AddElementMethod = ({
                                           element,
                                           name,
                                           position = [0, 0, 0],
                                           rotation = [0, 0, 0],
                                           scale = [1, 1, 1],
                                           events
                                         }: AddElementInScene) => {
    /**
     * В случае попытки перезаписи модели выдать ошибку и выйти из функции
     */
    if (name in this.elements.groups || name in this.elements.elements) {
      console.error(`вы хотите перезаписать элемент ${name} , я решил что так низя`);
      return;
    }
    /**
     * Добавляем элемент в хранилище экземпляра
     */
    const group = new THREE.Group();

    if (element instanceof Array) group.add(...element);
    if (element instanceof Mesh) group.add(element);

    this.elements.groups[name] = element instanceof Group
      ? element
      : (group as THREE.Group);

    /**
     * Добавляем события
     */
    if (events) this.addEvents(events);

    /**
     * Устанавливаем параметры объекта ( группы )
     */
    this.elements.groups[name].position.set(...position);
    this.elements.groups[name].rotation.set(...rotation);
    this.elements.groups[name].scale.set(...scale);

    /**
     * Добавляем группу в сцену
     */
    this.scene.add(this.elements.groups[name]);
  }

  // ---------------------------------------------------------------------------------------------------

  /**
   * Метод addEvents для заполнения хранилища эвентов экземпляра ThreeJS
   * @param {EventItem[]} events
   *              Массив событий для группы элемента.Обязательный параметр.
   * @private
   */
  private readonly addEvents = (events: EventItem[]) => {

    if (!events || !(events instanceof Array)) return;

    const controller = this.eventController;

    events.forEach(event => {

        if (
          !(event.name in controller.events.inAnimationFrame) &&
          !(event.name in controller.events.inEventListener)
        ) {

          event.addInRequestAnimation && !event.haveInnerRequestAnimationFunction
            ? controller.events.inAnimationFrame[event.name] = {
              function: (event.function as EventForAnimationFrame)(this),
            }
            : controller.events.inEventListener[event.name] = {
              function: (event.function as EventForAddEventListener)(this),
              type: event.type,
            }

          if (event.haveInnerRequestAnimationFunction) {
            const {listener, animationsFramesFunction} = (event.function as EventWithAnimationFrameFunction)(this)
            controller.events.inEventListener[event.name] = {
              function: listener,
              type: event.type,
            }
            controller.events.inAnimationFrame[event.name] = {
              function: animationsFramesFunction,
            }
          }

          if (controller.eventWorkStatus) {
            this.canvas.addEventListener(
              controller.events.inEventListener[event.name].type,
              controller.events.inEventListener[event.name].function,
              false)
          }
        } else console.error(`вы попытались перезаписать event ${event.name}`)

      }
    )
  }

// ---------------------------------------------------------------------------------------------------

// добавляет свет в сцену
  public addLights = (lights: Light | Light[]) => {
    if (lights) lights instanceof Array
      ? this.scene.add(...lights)
      : this.scene.add(lights);
  }

// ---------------------------------------------------------------------------------------------------

// добавляет сетку в сцену
  public addGrid = (grid: Grid | Grid[]) => {
    grid instanceof Array
      ? this.scene.add(...grid)
      : this.scene.add(grid);
  }

// ---------------------------------------------------------------------------------------------------

  /**
   * Метод позволяет изменять эффекты сцены
   *
   * @param {Object} arguments
   *              Объект настроек сцены.
   * @param {THREE.Color | THREE.Texture | null}  [arguments.background]
   *            - Если не null, устанавливает фон, используемый при рендеринге сцены, и всегда
   *              визуализируется первым. Может быть установлен на Color, который устанавливает
   *              прозрачный цвет, текстуру, покрывающую холст, кубическую карту как CubeTexture
   *              или равнопрямоугольную как текстуру.
   *              Необязательный параметр.
   * @param {FogBase | null}                       [arguments.fog]
   *            - Объект тумана, определяющий тип тумана, который влияет на все,
   *              что отображается в сцене.
   *              Необязательный параметр.
   * @param {boolean}                              [arguments.autoUpdate]
   *            - Если true, рендерер проверяет каждый кадр,
   *              нуждается ли сцена и ее объекты в обновлении матрицы.
   *              Если это не так, вы должны сами поддерживать все матрицы в сцене.
   *              Необязательный параметр.
   * @param {Texture | null}                       [arguments.environment]
   *            - Если не null, эта текстура устанавливается как карта среды для всех
   *              физических материалов в сцене. Однако невозможно перезаписать существующую текстуру,
   *              назначенную MeshStandardMaterial.envMap.
   *              Необязательный параметр.
   * @param {Material | null}                      [arguments.overrideMaterial]
   *            - Если значение не равно null, это приведет к тому, что все в сцене будет.
   *              отображаться с использованием этого материала.
   *              Необязательный параметр.
   */
  public settingScene = ({background, fog, overrideMaterial, environment, autoUpdate}: SceneCreatorArguments) => {
    if (background) this.scene.background = background;
    if (fog) this.scene.fog = fog;
    if (overrideMaterial) this.scene.overrideMaterial = overrideMaterial;
    if (autoUpdate) this.scene.autoUpdate = autoUpdate;
    if (environment) this.scene.environment = environment;
  }

// ---------------------------------------------------------------------------------------------------

// метод для изменения состояния камеры
  public tornPerspectiveCamera = (
    position?: [x: number, y: number, z: number],
    rotation?: [x: number, y: number, z: number],
    aspect?: number, near?: number, far?: number
  ) => {
    if (this.camera instanceof THREE.PerspectiveCamera) {
      if (aspect) this.camera.aspect = aspect;
      if (near === 0 || near) this.camera.near = near;
      if (far === 0 || far) this.camera.far = far;
      if (!(position === undefined)) this.camera.position.set(...position);
      if (!(rotation === undefined)) this.camera.rotation.set(...rotation);
    }
  }

// ---------------------------------------------------------------------------------------------------

// метод для добавления импортируемой GLTF модели
  public addGLTFObjectModel: GLTFModelCreator = ({
                                                   pathObjectModel,
                                                   name,
                                                   scale = [1, 1, 1],
                                                   position = [0, 0, 0],
                                                   rotation = [0, 0, 0],
                                                   loaderFunction,
                                                   events
                                                 }: GLAMCreatParameters
  ) => {
    const loader = new GLTFLoader();

    loader.load(pathObjectModel,
      (gltf) => {
        let element = gltf.scene;
        element.name = name;

        if (loaderFunction) element = loaderFunction(element, gltf);

        this.addElement({element, name, position, rotation, scale, events})

      },
      undefined,
      function (error) {
        console.error(`error in addGLTFObjectModel function with ${name} model`, error)
      })
  }


// ---------------------------------------------------------------------------------------------------

  readonly getEventControllers: EventControllers = () => {
    return {
      getIntersects: this.getIntersects,
      getModel: this.getModel
    }
  }

// ---------------------------------------------------------------------------------------------------

  readonly getModel: GetModel = (name: string) => {
    return this.elements.groups?.[name] || this.elements.elements?.[name] || undefined;
  }

// ---------------------------------------------------------------------------------------------------

//  raycaster object (объект пересечения с элементом)
  private readonly getIntersects: InterceptorsResult = ({mouseCoordinates, object}: Interceptors) => {

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const Crx = (mouseCoordinates.x / this.width) * 2 - 1;
    const Cry = -((mouseCoordinates.y) / this.height) * 2 + 1;

    mouseVector.set(Crx, Cry);

    raycaster.setFromCamera(mouseVector, this.camera as THREE.Camera);

    // object - объект проверяемый на пересечение с узлом
    return raycaster.intersectObject(object, true);
  }

}
