import React, { useMemo } from "react";
import * as THREE from "three";
import { Decal, useTexture } from "@react-three/drei";

/** 라이트 구성 */
function SceneSetup() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={0.5} />
    </>
  );
}

// 하트 Extrude
function useHeartGeometry() {
  return useMemo(() => {
    const x = 0, y = 0;
    const shape = new THREE.Shape();
    shape.moveTo(x + 25, y + 25);
    shape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
    shape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
    shape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
    shape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
    shape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
    shape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 18, steps: 3, bevelEnabled: true,
      bevelSegments: 4, bevelSize: 5, bevelThickness: 5, curveSegments: 32,
    });
    geo.center();
    const s = 0.0065, sz = s * 1.35;
    geo.scale(s, s, sz);
    return geo;
  }, []);
}

// 별 Extrude
function useStarGeometry() {
  return useMemo(() => {
    const outer = 50, inner = 20, spikes = 5;
    const shape = new THREE.Shape();
    for (let i = 0; i < spikes * 2; i++) {
      const r = (i % 2 === 0) ? outer : inner;
      const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    }
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 16, steps: 2, bevelEnabled: true,
      bevelSegments: 3, bevelSize: 4, bevelThickness: 4, curveSegments: 48,
    });
    geo.center();
    const s = 0.0062, sz = s * 1.25;
    geo.scale(s, s, sz);
    return geo;
  }, []);
}

const BLANK_1x1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9WfYv9kAAAAASUVORK5CYII=";

export default function MyElement3D({
  capShape,        // "sphere" | "star" | "heart" | "hemisphere"
  thickness,       // "thin" | "wide"
  bodyLength,      // "short" | "long"
  bodyColor,
  capColor,
  metallic,
  roughness,
  transmission,    // 0~1
  emissive,        // 필라멘트 강도
  stickerUrl,      // object URL
  stickerScale,    // 0.1~1.0
  stickerY,        // 0~1 (정규화된 높이)
}) {
  const heartGeo = useHeartGeometry();
  const starGeo = useStarGeometry();

  // 바디 파라미터
  const bodyRadius = thickness === "wide" ? 0.16 : 0.11;
  const bodyHeight = useMemo(() => {
    const map = { short: 1.0, long: 1.4 };
    return map[bodyLength] ?? 1.2;
  }, [bodyLength]);

  const bodyCenterY = bodyHeight / 2;
  const bodyTopY = bodyHeight;

  // 캡 오프셋
  const CAP_OFFSETS = {
    sphere: 0.26, star: 0.22, heart: 0.22, hemisphere: 0.36,
  };

  const capPhysMatProps = {
    color: capColor,
    metalness: metallic,
    roughness,
    transmission,
    thickness: 0.4,
    ior: 1.45,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  };

  // 스티커 텍스처 (훅 조건부 호출 방지)
  const stickerTex = useTexture(stickerUrl || BLANK_1x1);
  if (stickerUrl) {
    stickerTex.anisotropy = 8;
    stickerTex.wrapS = stickerTex.wrapT = THREE.ClampToEdgeWrapping;
    stickerTex.colorSpace = THREE.SRGBColorSpace;
  }

  // 필라멘트(발광체): 캡 색상 톤으로 발광
  const Filament = ({ height = 0.14, offsetY = 0 }) => (
    <mesh position={[0, offsetY, 0]}>
      <cylinderGeometry args={[0.035, 0.035, height, 16]} />
      <meshStandardMaterial
        color={capColor}
        emissive={capColor}
        emissiveIntensity={emissive}
        metalness={0}
        roughness={0.4}
      />
    </mesh>
  );

  // 데칼 Y 위치 계산 (바디 로컬 좌표계에서)
  // stickerY: 0(아래) ~ 1(위)
  const yRange = bodyHeight * 0.9;                 // 위아래 5%는 안전 마진
  const yLocal = (stickerY - 0.5) * yRange;        // 중앙 기준 오프셋

  return (
    <>
      <SceneSetup />

      {/* Body */}
      <mesh position={[0, bodyCenterY, 0]}>
        <cylinderGeometry args={[bodyRadius, bodyRadius, bodyHeight, 40]} />
        <meshStandardMaterial color={bodyColor} metalness={metallic} roughness={roughness} />
        {/* 스티커/데칼: 바디 정면 투사 */}
        {stickerUrl && (
          <Decal
            position={[0, yLocal, bodyRadius + 0.001]}
            rotation={[0, 0, 0]}
            scale={[0.8 * stickerScale, 0.5 * stickerScale, 1]}
            map={stickerTex}
            depthTest
            depthWrite={false}
          />
        )}
      </mesh>

      {/* ── Cap Variants + Filament ───────────────── */}
      {capShape === "sphere" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.sphere, 0]}>
          <mesh>
            <sphereGeometry args={[0.35, 40, 40]} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          <Filament height={0.1} offsetY={-0.12} />
        </group>
      )}

      {capShape === "star" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.star, 0]}>
          <mesh rotation={[0, 0, Math.PI]}>
            <primitive attach="geometry" object={starGeo} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          <Filament height={0.1} offsetY={-0.15} />
        </group>
      )}

      {capShape === "heart" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.heart, 0]} rotation={[0, 0, Math.PI]}>
          <mesh>
            <primitive attach="geometry" object={heartGeo} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          <Filament height={0.1} offsetY={0.2} />
        </group>
      )}

      {capShape === "hemisphere" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.hemisphere, 0]} rotation={[Math.PI, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.40, 40, 40, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.40, 48]} />
            <meshPhysicalMaterial {...capPhysMatProps} side={THREE.DoubleSide} />
          </mesh>
          <Filament height={0.1} offsetY={0.2} />
        </group>
      )}
    </>
  );
}
