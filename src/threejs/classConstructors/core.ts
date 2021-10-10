// outer
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

// local
import {
  Camera,
  Elements,
  EventsController,
  Init,
} from "../types";
import creatScene from "../sceneElements/scene";

/**
 * Core конструкторов ThreeJS
 * Нельзя использовать для инициации объекта ThreeJS
 * @class
 */
export class Core {

  protected mountTime: boolean;  // отражает не был ли смонтирован canvas в DOM
  protected elements: Elements;
  protected width: number;
  protected height: number;
  protected camera: Camera;
  protected eventController: EventsController;

  private readonly clock: THREE.Clock;
  private readonly renderer: THREE.WebGLRenderer;

  orbitControl: OrbitControls[];
  readonly scene: THREE.Scene;
  readonly canvas: HTMLCanvasElement;
  readonly updatable: Set<any>;

  constructor(camera: Camera, width: number, height: number) {

    this.eventController = {
      eventWorkStatus: false,
      events: {
        inAnimationFrame: {},
        inEventListener: {},
      }
    };

    this.camera = camera;
    this.scene = creatScene();
    this.width = width;
    this.height = height;
    this.mountTime = true;
    this.clock = new THREE.Clock();
    this.updatable = new Set();
    this.orbitControl = [];
    this.elements = {
      groups: {},
      elements: {}
    };

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,// для белого фона сцены
    });

    // создает тег canvas
    this.canvas = (this.renderer as THREE.WebGLRenderer).domElement;

    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.startWindowResize = this.startWindowResize.bind(this);
    this.stopWindowResize = this.stopWindowResize.bind(this);
    this.startEvents = this.startEvents.bind(this);
    this.stopEvents = this.stopEvents.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.tick = this.tick.bind(this);

  }

  // ---------------------------------------------------------------------------------------------------

  // метод инициации работы объекта.
  readonly init: Init = (container: HTMLElement,
                         orbitControl: boolean = true,
                         startEvents = false) => {
    // устанавливает размеры
    (this.renderer as THREE.WebGLRenderer).setSize(this.width, this.height);

    // вставляет canvas в DOM ( в случае если монтажа уже не произошло )
    this.mountTime && container.appendChild(this.canvas) && (this.mountTime = false);

    // устанавливает orbitControl
    if (!(this.camera instanceof THREE.CubeCamera) && orbitControl) {
      this.orbitControl = [new OrbitControls(this.camera, this.canvas)]
    }

    this.startAnimation();

    if (startEvents) this.startEvents();
  }

  // ---------------------------------------------------------------------------------------------------

  private render = () => {
    this.renderer.render(this.scene, this.camera as THREE.Camera);
  }

  // ---------------------------------------------------------------------------------------------------

  // добавляет подписку на ресайз на глобальный объект.
  readonly startWindowResize = () => {
    window.addEventListener('resize', this.onWindowResize);
  }

  // ---------------------------------------------------------------------------------------------------

  // удаляет подписку резайз с глобального объекта.
  readonly stopWindowResize = () => {
    window.removeEventListener('resize', this.onWindowResize);
  }

  // ---------------------------------------------------------------------------------------------------

  // запускает и останавливает выполнение эвентов.
  readonly startEvents = () => {
    const controller = this.eventController

    /**
     * Выполнить участок только если до этого стояло false ,
     * что бы избежать повторного добавления событий.
     */
    if (!controller.eventWorkStatus) {
      controller.eventWorkStatus = true;

      // Добавляем все события
      Object.values(controller.events.inEventListener).forEach(event => {
        this.canvas.addEventListener(event.type, event.function, false)
      })

    }
  };

  // ---------------------------------------------------------------------------------------------------

  readonly stopEvents = () => {
    const controller = this.eventController;

    /**
     * Выполнить участок только если до этого стояло true,
     * что бы избежать повторного удаления событий.
     */
    if (controller.eventWorkStatus) {
      controller.eventWorkStatus = false;

      Object.values(controller.events.inEventListener).forEach(event => {
        this.canvas.removeEventListener(event.type, event.function, false)
      })
    }
  };

  // ---------------------------------------------------------------------------------------------------

  // запускает анимацию , события и прочая деятельность (с подпиской на requestAnimationFrame ).
  // ОСТОРОЖНО !!! все попадающее сюда выполняется с частотой больше 16 раз в секунду.
  private readonly startAnimation = () => {
    this.renderer.render(this.scene, this.camera as THREE.PerspectiveCamera);

    // отрабатывают все эвенты проброшенные в объект events
    if (this.eventController.eventWorkStatus) {
      Object.values(this.eventController.events.inAnimationFrame)
        .forEach(eventFunction => eventFunction.function())
    }

    this.tick();

    window.requestAnimationFrame(this.startAnimation);
  };

  // ---------------------------------------------------------------------------------------------------

  protected onWindowResize = () => {
    if (this.camera instanceof THREE.PerspectiveCamera) this.camera.aspect = window.innerWidth / window.innerHeight;
    if (!(this.camera instanceof THREE.CubeCamera)) this.camera.updateProjectionMatrix();
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // ---------------------------------------------------------------------------------------------------

  private readonly tick = () => {
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
