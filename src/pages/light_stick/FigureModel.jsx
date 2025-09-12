// src/components/FigureModel.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function FigureModel({ url, scale = 0.2, position = [0, 0, 0] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={position} />;
}

// 메모리 캐시 활성화 (성능)
useGLTF.preload("/models/scene.gltf");
useGLTF.preload("/models/characterA.glb");
useGLTF.preload("/models/characterB.glb");
