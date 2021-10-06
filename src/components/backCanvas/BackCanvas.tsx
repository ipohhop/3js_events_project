//outer
import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import {creatPerspectiveCamera} from "../../threejs/scene&camera";
import {EventBackgroundCanvas} from "../../threejs/backfroundCanvas";
import {creatGrid, generationCubs, lightThreePoints} from "../../threejs/otherConstructors";


//local

interface OwnProps {

}

type Props = OwnProps

const BackCanvas: FunctionComponent<Props> = (props) => {
  const canvasContainer = useRef(null)

  const [width] = useState(window.innerWidth)
  const [height] = useState(window.innerHeight)

  // создаю нужную камеру
  const camera = useMemo(() =>
      creatPerspectiveCamera({width, height, position: {x: 11.4, y: 10.7, z: 4.5}}),
    [width, height])

  // создает экземпляр объекта работы 3js
  const canvas = useRef(new EventBackgroundCanvas(camera, width, height))

  // инициирует создание canvas и запускает в работу с подпиской на animationFrame
  useEffect(() => {
    canvas.current.init(canvasContainer, true)
  }, [])

  // добавляет свет
  useEffect(() => {
    canvas.current.addLights(lightThreePoints())
  }, [])

  // создает подписку на ресайз
  useEffect(() => {
    canvas.current.startWindowResize()
    return canvas.current.stopWindowResize
  }, [])

  // добавляет сетку для наглядности пространства
  useEffect(() => {
    canvas.current.addGrid(creatGrid())
  }, [])

  // добавляем массив кубов
  useEffect(() => {
    canvas.current.addElement({
      element: generationCubs(4, 4),
      nameElement: 'cub_cubs'
    })
  }, [])

  return (
    <>
      <div ref={canvasContainer} className="backCanvas__container"/>
    </>

  );
};

export default BackCanvas;
