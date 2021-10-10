// outer
import * as THREE from 'three';

export function creatHelperGrid(size?: number , divisions?: number ): THREE.GridHelper {
  const gridHelper = new THREE.GridHelper(100, 100);
  gridHelper.position.y = -1;
  if (gridHelper.material instanceof THREE.Material) gridHelper.material.opacity = 0.25;
  if (gridHelper.material instanceof THREE.Material) gridHelper.material.transparent = true;
  return gridHelper;
}
