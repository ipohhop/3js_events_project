// outer
import React from "react";
import {Group} from "three";
import {DragControls} from "three/examples/jsm/controls/DragControls";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


// local
import {Creator} from "./root_threejs_object_constructor";
import {Camera} from "./threejsTypes";



export class ConstructorCanvas extends Creator {

    private canvasEvent: () => void;

    addIphone: () => void;
    addIpad: () => void;
    addMac: () => void;
    playControl: (value: boolean) => void;
    addTransformControls: () => void;
    getIntersects: (x: number, y: number, camera: Camera, object: Group[], width: number, height: number) => Group | null;
    checkElementEvent: (leftMenuIndicator: [any, React.Dispatch<React.SetStateAction<any>>]) => void;


    constructor(camera: Camera, width: number, height: number) {
        super(camera, width, height)

        this.addTransformControls = () => {
            this.controls = new TransformControls(this.camera as THREE.PerspectiveCamera, this.canvas);
        }


        this.playControl = (value: boolean) => {
            if (this.controls) this.controls.enabled = value
        }

        this.canvasEvent = () => {
            (this.canvas as HTMLCanvasElement).addEventListener("click", () => {
                console.log(" click click to canvas")
            })
        }

        this.addIphone = () => {
            const loader = new GLTFLoader()
            const pathIphone = 'models/apple/iphone11/scene.gltf'
            const canvas = this
            loader.load(pathIphone, function (gltf) {
                const element = gltf.scene
                element.scale.set(0.05, 0.05, 0.05)
                let name = `iphone#${Math.random()}`
                element.name = name

                element.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10)

                canvas.addElement(element, name, true)

            })
        }

        this.addIpad = () => {
            const loader = new GLTFLoader()
            const pathIphone = 'models/apple/ipad/scene.gltf'
            const canvas = this
            loader.load(pathIphone, function (gltf) {
                const element = gltf.scene
                element.scale.set(0.4, 0.4, 0.4)
                let name = `ipad#${Math.random()}`
                element.name = name

                element.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10)

                canvas.addElement(element, name, true)

            })
        }

        this.addMac = () => {
            const loader = new GLTFLoader()
            const pathIphone = 'models/apple/macbook/scene.gltf'
            const canvas = this
            loader.load(pathIphone, function (gltf) {
                const element = gltf.scene
                element.scale.set(0.7, 0.7, 0.7)
                let name = `mac#${Math.random()}`
                element.name = name

                element.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10)

                canvas.addElement(element, name, true)
            })
        }

        this.checkElementEvent = (leftMenuIndicator: [any, React.Dispatch<React.SetStateAction<any>>]) => {

            const onDocumentMouseClick = (event: any) => {
                event.preventDefault();



                // @ts-ignore
                const arrayGroup : Group[] = this.scene.children.filter(item=>item.type === "Group")



                // let intersects = this.getIntersects(event.layerX, event.layerY, this.camera, Object.values(this.elements.groups), this.width, this.height);
                let intersects = this.getIntersects(event.layerX, event.layerY, this.camera, arrayGroup , this.width, this.height);

                if (intersects){
                    let element = intersects as Group
                    leftMenuIndicator[1]({type:""})
                    leftMenuIndicator[1]({type:"element",props: element})
                }

            }
            (this.canvas as HTMLCanvasElement).addEventListener("click", onDocumentMouseClick, false);
        }

        // function for creat raycaster object (объект пересечения с элементом)

        this.getIntersects = (x: number, y: number, camera: Camera, object: THREE.Group[] , width: number, height: number) => {

            let raycaster = new THREE.Raycaster();
            let mouseVector = new THREE.Vector2();

            let Crx = (x / width) * 2 - 1;
            let Cry = -((y) / height) * 2 + 1;

            mouseVector.set(Crx, Cry);

            raycaster.setFromCamera(mouseVector, camera as THREE.PerspectiveCamera | THREE.OrthographicCamera);

            // object - объект проверяемый на пересечение с узлом

            let value = null

            object.forEach((item)=>{
               if (raycaster.intersectObjects([item], true).length > 1 ) value = item
            })

            return value
        }

    }


}
