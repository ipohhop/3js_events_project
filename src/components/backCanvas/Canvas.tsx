//outer
import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import ThreeJS from "../../threejs/classConstructors/base";
import {
  creatHelperGrid,

} from "../../threejs/sceneElements/grids";
import {MODELS, MODELS_PATH} from "../../threejs/constants";
import {creatPerspectiveCamera} from "../../threejs/sceneElements/camera";
import {lightThreePoints} from "../../threejs/sceneElements/lights";
import {cubsEvents, generationCubs} from "../../threejs/models/cubs";
import {robotEvents, robotSetting} from "../../threejs/models/robot";


//local

interface OwnProps {

}

type Props = OwnProps

const Canvas: FunctionComponent<Props> = (props) => {

  // реф для ссылки на контейнер для монтажа canvas
  const canvasContainer = useRef(null);

  // получаем размеры для рендера сцены
  const [width] = useState(window.innerWidth);
  const [height] = useState(window.innerHeight);

  // создаю нужную камеру
  const camera = useMemo(() =>
      creatPerspectiveCamera({
        width,
        height,
        position: [20.4, 16.7, 14.5]
      }),
    [width, height])

  // создает экземпляр объекта работы 3js
  const canvas = useRef(new ThreeJS(camera, width, height))

  // настраиваем основные элементы сцены и запускаем в рендер
  useEffect(() => {
    const threejsObject = canvas.current;

    // инициирует создание canvas и запускает в работу с подпиской на animationFrame
    threejsObject.init(canvasContainer.current as unknown as HTMLDivElement, true, true);

    // добавляет свет
    threejsObject.addLights(lightThreePoints());

    // создает подписку на ресайз
    // TODO дополнить метод контролем ресайзом элемента (сейчас настроено для всего окна)
    threejsObject.startWindowResize();

    // добавляет сетку для наглядности пространства
    threejsObject.addGrid(creatHelperGrid());

    // добавляем руку в сцену
    threejsObject.addGLTFObjectModel({
      pathObjectModel: MODELS_PATH.HAND,
      name: MODELS.HAND,
      position: [0, 2, 3],
      scale: [0.03, 0.03, 0.03],
    });

    // добавляем массив кубов в сцену
    threejsObject.addElement({
      element: generationCubs(4, 4),
      name: MODELS.CUB_CUBS,
      position: [-1, 10, 3],
      rotation: [1, 2.5, 0],
      scale: [0.7, 0.7, 0.7],
      events: cubsEvents,
    });

    // добавляем робота в сцену
    threejsObject.addGLTFObjectModel({
      pathObjectModel: MODELS_PATH.ROBOT,
      name: MODELS.ROBOT,
      position: [0, 7.515, -5],
      rotation: [0, 0, 0.1],
      loaderFunction: robotSetting,
      events: robotEvents,
    });

    // старт работы событий
    threejsObject.startEvents();


    // удалить ресайз при размонтировании компоненты
    return threejsObject.stopWindowResize;
  }, []);


  return <div ref={canvasContainer} className="backCanvas__container"/>;
};

export default Canvas;
