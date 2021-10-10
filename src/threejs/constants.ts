import {generateEnum} from "../lib/generate-enum";

export const MODELS = generateEnum([
  'ROBOT',
  'HAND',
  'CUB_CUBS'
]);

export const MODELS_PATH = {
  [MODELS.ROBOT]: '/models/RobotExpressive.glb',
  [MODELS.HAND]: '/models/hand/scene.gltf',
}
