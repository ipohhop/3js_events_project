// local
import {SceneCreatorArguments} from "../types";

// outer
import * as THREE from "three";

/**
 * Создает объект сцены с предварительно определенными состоянием и эффектами
 *
 * @link  https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene
 *
 * @author Artem ipohhop@gmail.com
 *
 * @param {Object} arguments
 *              Объект настроек сцены.
 * @param {THREE.Color | THREE.Texture | null}  [arguments.background]
 *            - Если не null, устанавливает фон, используемый при рендеринге сцены, и всегда
 *              визуализируется первым. Может быть установлен на Color, который устанавливает
 *              прозрачный цвет, текстуру, покрывающую холст, кубическую карту как CubeTexture
 *              или равнопрямоугольную как текстуру.
 *              По умолчанию - null.
 *              Необязательный параметр.
 * @param {FogBase | null}                       [arguments.fog]
 *            - Объект тумана, определяющий тип тумана, который влияет на все,
 *              что отображается в сцене.
 *              По умолчанию - null.
 *              Необязательный параметр.
 * @param {boolean}                              [arguments.autoUpdate]
 *            - Если true, рендерер проверяет каждый кадр,
 *              нуждается ли сцена и ее объекты в обновлении матрицы.
 *              Если это не так, вы должны сами поддерживать все матрицы в сцене.
 *              По умолчанию - true.
 *              Необязательный параметр.
 * @param {Texture | null}                       [arguments.environment]
 *            - Если не null, эта текстура устанавливается как карта среды для всех
 *              физических материалов в сцене. Однако невозможно перезаписать существующую текстуру,
 *              назначенную MeshStandardMaterial.envMap.
 *              По умолчанию - null.
 *              Необязательный параметр.
 * @param {Material | null}                      [arguments.overrideMaterial]
 *            - Если значение не равно null, это приведет к тому, что все в сцене будет.
 *              отображаться с использованием этого материала.
 *              По умолчанию - null.
 *              Необязательный параметр.
 *
 * @return      Объект сцены ( THREE.Scene ) который позволит настроить, что и где должно отображаться в three.js.
 *              В нем размещаются объекты (модели), источники света и камеры.
 */

export default function creatScene({
                                     background = null,
                                     fog = null,
                                     overrideMaterial = null,
                                     autoUpdate = true,
                                     environment = null,
                                   }: SceneCreatorArguments = {}): THREE.Scene {
  // создаем объект сцены
  const scene = new THREE.Scene();

  // добавляем в сцену эффекты
  scene.background = background;
  scene.fog = fog;
  scene.overrideMaterial = overrideMaterial;
  scene.autoUpdate = autoUpdate;
  scene.environment = environment;

  return scene;
}
