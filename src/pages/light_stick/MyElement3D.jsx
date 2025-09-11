import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function SceneSetup() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
}

function MyElement3D() {
  return (
    <>
      <SceneSetup />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}

export default MyElement3D;
