import {CameraCreatorArguments} from "../types";
import * as THREE from "three";

/**
 * Создает экземпляр камеры THREE.PerspectiveCamera
 *
 * @link  https://threejs.org/docs/index.html?q=PerspectiveCamera#api/en/cameras/PerspectiveCamera
 *
 * @author Artem ipohhop@gmail.com
 *
 * @param {Object}                                  arguments
 *              Объект настроек камеры.
 * @param {number}                                  arguments.width
 *            - Ширина для расчета соотношения сторон пирамиды камеры.
 *              Обязательный параметр.
 * @param {number}                                  arguments.height
 *            - Высота для расчета соотношения сторон пирамиды камеры.
 *              Обязательный параметр.
 * @param {[x: number, y: number, z: number]}       [arguments.position]
 *            - Массив координат для установки начального положения камеры в сцене.
 *              По умолчанию - [0, 0, 0].
 *              Необязательный параметр.
 * @param {[x: number, y: number, z: number]}       [arguments.rotation]
 *            - Массив координат для установки начального положения камеры в сцене.
 *              По умолчанию - [0, 0, 0].
 *              Необязательный параметр.
 * @param {number}                                  [arguments.near]
 *            - Усечение камеры в ближней плоскости.
 *              По умолчанию - 0.1.
 *              Не обязательный аргумент.
 * @param {number}                                  [arguments.far]
 *            - Усечение камеры в дальней плоскости.
 *              По умолчанию - 5000.
 *              Не обязательный аргумент.
 * @param {number}                                  [arguments.fov]
 *            - Угол обзора камеры по вертикали..
 *              По умолчанию - 75.
 *              Не обязательный аргумент.
 *
 * @return      Объект сцены ( THREE.Scene ) который позволит настроить, что и где должно отображаться в three.js.
 *              В нем размещаются объекты (модели), источники света и камеры.
 */

export function creatPerspectiveCamera({
                                         width,
                                         height,
                                         position = [0, 0, 0],
                                         rotation = [0, 0, 0],
                                         near = 0.1,
                                         far = 5000,
                                         fov = 75
                                       }: CameraCreatorArguments) {

  // создаем объект камеры
  const cameraPoint = new THREE.PerspectiveCamera(fov, width / height, near, far);

  // устанавливаем положение камеры на сцене
  cameraPoint.position.copy(new THREE.Vector3(...position));
  cameraPoint.rotation.copy(new THREE.Euler(...rotation));

  return cameraPoint;
}

