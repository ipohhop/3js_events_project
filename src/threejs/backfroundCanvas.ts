// class for back

import gsap from "gsap";
import {Camera, CameraPositionProps, EventItem} from "./threejsTypes";
import React, {Dispatch, SetStateAction} from "react";
import * as THREE from "three";
import {Creator} from "./root_threejs_object_constructor";


export class EventBackgroundCanvas extends Creator {

  private gsapEvent: gsap.core.Tween | undefined;
  private events: { [eventName: string]: EventItem }
  private readonly cameraEventOnFocus: (prop: CameraPositionProps, callbackProps: Dispatch<SetStateAction<boolean>>) => void
  private cameraPositions: {
    onRoom(): { rotation: { x: number; y: number; z: number }; position: { x: number; y: number; z: number }; time: number }
    active: string;
    onMonitor(): { rotation: { x: number; y: number; z: number }; position: { x: number; y: number; z: number }; time: number }
  };
  private readonly getIntersects: (x: number, y: number, camera: Camera, object: (THREE.Group | THREE.Mesh), width: number, height: number) => THREE.Intersection[]


  clickOnMonitor: (callbackProps: React.Dispatch<React.SetStateAction<boolean>>, htmlElement: HTMLElement) => void
  clickOnRobot: () => void
  HTMLElements: { [name: string]: HTMLElement }
  addHTMLElement: (name: string, element: HTMLElement) => void

  constructor(camera: Camera, width: number, height: number) {
    super(camera, width, height)
    this.width = width
    this.height = height
    this.camera = camera
    this.events = {}
    this.HTMLElements = {
      canvas: this.canvas as HTMLCanvasElement
    }
    this.cameraPositions = {
      active: "room",
      onRoom(time: number = 3) {
        this.active = "room"
        return {
          position: {x: -1.4, y: 1.7, z: 1.5},
          rotation: {x: 0, y: -0.5, z: 0},
          time: time,
          ease: "elastic"
        }
      },
      onMonitor(time: number = 3) {
        this.active = "monitor"
        return {
          position: {x: -0.5, y: 1.72, z: 0.33},
          rotation: {x: -0.1, y: 0.0065, z: 0.005},
          time: time
        }
      }
    }

    this.addHTMLElement = (name: string, element: HTMLElement) => {
      this.HTMLElements[name] = element
    }

    this.clickOnMonitor = (callbackProps: Dispatch<SetStateAction<any>>, htmlElement: HTMLElement) => {
      const onDocumentMouseClick = (event: any) => {
        event.preventDefault();

        let intersects = this.getIntersects(
          event.layerX, event.layerY, this.camera,
          this.elements.elements.planeBack as THREE.Mesh, this.width, this.height
        )

        if (intersects.length > 0 || htmlElement.id === "outDoor") {
          // stop camera animation if it was start
          if (this.gsapEvent) this.gsapEvent.pause()

          if (this.cameraPositions.active === "room") {
            this.cameraEventOnFocus(this.cameraPositions.onMonitor(), callbackProps)
            return
          }
          if (this.cameraPositions.active === "monitor") this.cameraEventOnFocus(this.cameraPositions.onRoom(), callbackProps)
        }
      }
      htmlElement.addEventListener("click", onDocumentMouseClick, false);
    }

    this.clickOnRobot = () => {

      const onDocumentMouseClick = (event: any) => {
        event.preventDefault();

        let intersects = this.getIntersects(event.layerX, event.layerY, this.camera, this.elements.groups.robot as THREE.Group, this.width, this.height);

        if (intersects.length > 0) {
          // Create an AnimationMixer, and get the list of AnimationClip instances

          const model = this.elements.groups.robot
          const mixer = new THREE.AnimationMixer(model);

          const clips = model.animations

          // Play a specific animation (проигрываем конкретную анимацию)
          const clip = clips[0]

          const action = mixer.clipAction(clip);
          action.play()


          // @ts-ignore
          model.tick = (delta: any) => mixer.update(delta)
          this.updatable.add(model)
        }
      }
      (this.canvas as HTMLCanvasElement).addEventListener("click", onDocumentMouseClick, false);
    }

    this.cameraEventOnFocus = (finishPosition: CameraPositionProps, callbackProps: Dispatch<SetStateAction<boolean>>) => {

      // start positions
      let {x: PosX, y: PosY, z: PosZ} = this.camera.position
      let {x: RotX, y: RotY, z: RotZ} = this.camera.rotation

      let value = {PosX: PosX, PosY: PosY, PosZ: PosZ, RotX: RotX, RotY: RotY, RotZ: RotZ}

      const gsapAction = gsap.to(value, {
        paused: true,
        ease: finishPosition.ease,

        PosX: finishPosition.position.x,
        PosY: finishPosition.position.y,
        PosZ: finishPosition.position.z,

        RotX: finishPosition.rotation.x,
        RotY: finishPosition.rotation.y,
        RotZ: finishPosition.rotation.z,

        duration: finishPosition.time,
        onUpdate: function () {

          // @ts-ignore
          callbackProps(camera.position.toArray())

          camera.position.set(value.PosX, value.PosY, value.PosZ)
          camera.rotation.set(value.RotX, value.RotY, value.RotZ)

        },
      })

      gsapAction.play()

      this.gsapEvent = gsapAction


    }

    // function for creat raycaster object (объект пересечения с элементом)

    this.getIntersects = (x: number, y: number, camera: Camera, object: THREE.Group | THREE.Mesh, width: number, height: number) => {

      let raycaster = new THREE.Raycaster();
      let mouseVector = new THREE.Vector2();

      let Crx = (x / width) * 2 - 1;
      let Cry = -((y) / height) * 2 + 1;

      mouseVector.set(Crx, Cry);

      raycaster.setFromCamera(mouseVector, camera as THREE.PerspectiveCamera | THREE.OrthographicCamera);

      // object - объект проверяемый на пересечение с узлом
      return raycaster.intersectObject(object, true);
    }
  }
}
