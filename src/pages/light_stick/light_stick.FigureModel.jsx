import React from "react";
import { useGLTF } from "@react-three/drei";

/* 단순 GLTF 로더 래퍼 */
export default function FigureModel({ url, scale = 0.2, position = [0, 0, 0] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={position} />;
}

/* 
성능 최적화: 사전 프리로드(브라우저가 백그라운드에서 fetch/파싱)
실제 사용 전 캐시되어 첫 표시가 빨라짐
프로젝트에서 사용 가능성이 있는 모델 경로를 미리 등록
*/
useGLTF.preload("/models/scene.gltf");
useGLTF.preload("/models/characterA.glb");
useGLTF.preload("/models/characterB.glb");
