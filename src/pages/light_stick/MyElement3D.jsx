import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Decal, useTexture } from "@react-three/drei";

/**
 * Component: MyElement3D
 * 목적:
 *  - 응원봉의 바디/캡(4종)/필라멘트/데칼을 구성하고, R3F 머티리얼 파라미터를 반영
 * 입력(props):
 *  - capShape: "sphere" | "star" | "heart" | "hemisphere"
 *  - thickness: "thin" | "wide"
 *  - bodyLength: "short" | "long"
 *  - bodyColor, capColor: '#rrggbb'
 *  - metallic, roughness, transmission, emissive: 0~1
 *  - stickerUrl(object URL), stickerScale(0.1~1), stickerY(0~1; 바디 높이 내 정규화)
 *
 * 성능:
 *  - 하트/별 Geometry는 useMemo로 캐시
 *  - 바디 길이/두께 파생 파라미터도 메모
 *  - 데칼 텍스처는 빈 1x1로 대체하여 훅 조건분기 방지
 *
 * 주의:
 *  - transmission 사용을 위해 meshPhysicalMaterial 사용
 *  - texture.colorSpace = SRGBColorSpace로 텍스처 감마 보정
 */

const BLANK_1x1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9WfYv9kAAAAASUVORK5CYII=";

const CAP_OFFSETS = {
  sphere: 0.26,
  star: 0.22,
  heart: 0.22,
  hemisphere: 0.36,
};

const clamp01 = (n) => Math.min(1, Math.max(0, n));

/** 장면 기본 라이트 **/
function SceneSetup() {
  return (
    <>
      <directionalLight position={[5, 6, 4]} intensity={0.5} />
    </>
  );
}

/** 하트 Geometry 생성(Extrude + 베벨, 크기/정렬 보정) */
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
    const s = 0.0060, sz = s * 1.35; // 사이즈
    geo.scale(s, s, sz);
    return geo;
  }, []);
}

/** 별 Geometry 생성(Extrude + 베벨, 스파이크 5개) */
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

export default function MyElement3D({
  capShape,
  thickness,
  bodyLength,
  bodyColor,
  capColor,
  metallic,
  roughness,
  transmission,    // 0~1
  emissive,        // 0~1 (필라멘트 발광 강도)
  stickerUrl,      // object URL
  stickerScale,    // 0.1~1.0
  stickerY,        // 0~1 (정규화된 높이)
}) {
  // ── 준비된 기하 ──
  const heartGeo = useHeartGeometry();
  const starGeo = useStarGeometry();

  // ── 바디 파라미터(두께/길이 파생값) ──
  const bodyRadius = useMemo(() => (thickness === "wide" ? 0.11 : 0.07), [thickness]);
  const bodyHeight = useMemo(() => {
    const map = { short: 0.8, long: 1.1 };
    return map[bodyLength] ?? 1.2;
  }, [bodyLength]);

  const bodyCenterY = bodyHeight / 2;
  const bodyTopY = bodyHeight;

  // ── 캡 머티리얼(유리 느낌을 위해 PhysicalMaterial 사용) ──
  const capPhysMatProps = useMemo(() => ({
    color: capColor,
    metalness: clamp01(metallic),
    roughness: clamp01(roughness),
    transmission: clamp01(transmission),
    thickness: 0.4,     // 유리 두께감(투과)
    ior: 1.45,          // 굴절률
    clearcoat: 0.6,     // 외피 코팅
    clearcoatRoughness: 0.2,
  }), [capColor, metallic, roughness, transmission]);

  // ── 스티커 텍스처(있으면 세팅, 없으면 1x1 투명) ──
  const texSrc = stickerUrl || BLANK_1x1;
  const stickerTex = useTexture(texSrc);
  useEffect(() => {
    // 빈 텍스처(1x1)에는 불필요
    if (!stickerUrl) return;
    stickerTex.anisotropy = 8;
    stickerTex.wrapS = stickerTex.wrapT = THREE.ClampToEdgeWrapping;
    stickerTex.colorSpace = THREE.SRGBColorSpace;
  }, [stickerUrl, stickerTex]);

  // ── 필라멘트(발광체): 캡 색상 톤으로 발광 ──
  const Filament = ({ height = 0.14, offsetY = 0 }) => (
    <mesh position={[0, offsetY, 0]}>
      <cylinderGeometry args={[0.035, 0.035, height, 16]} />
      <meshStandardMaterial
        color={capColor}
        emissive={capColor}
        emissiveIntensity={clamp01(emissive)}
        metalness={0}
        roughness={0.4}
      />
    </mesh>
  );

  // ── 데칼 Y 위치(바디 로컬) 계산 ──
  const { yLocal } = useMemo(() => {
    // 위아래 5% 안전 마진 → 90% 범위에만 배치
    const yRange = bodyHeight * 0.9;
    return { yLocal: (clamp01(stickerY) - 0.5) * yRange };
  }, [bodyHeight, stickerY]);

  return (
    <>
      <SceneSetup />

      {/* Body */}
      <mesh position={[0, bodyCenterY, 0]}>
        <cylinderGeometry args={[bodyRadius, bodyRadius, bodyHeight, 40]} />
        <meshStandardMaterial color={bodyColor} metalness={clamp01(metallic)} roughness={clamp01(roughness)} />
        {/* 스티커/데칼: 정면 투사 (Decal) */}
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
        <group position={[0, bodyTopY + CAP_OFFSETS.star - 0.03, 0]}>
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
