import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Decal, useTexture } from "@react-three/drei";
import FigureModel from "./FigureModel";

const BLANK_1x1 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9WfYv9kAAAAASUVORK5CYII=";

/** 캡별 바디 꼭대기 기준 추가 높이(월드 기준 y 오프셋) */
const CAP_OFFSETS = {
  sphere: 0.26,
  star: 0.22,
  heart: 0.22,
  hemisphere: 0.36,
};

const clamp01 = (n) => Math.min(1, Math.max(0, n));

/** 기본 조명: 단순 방향광 */
function SceneSetup() {
  return <directionalLight position={[5, 6, 4]} intensity={0.5} />;
}

/** 하트 Geometry: 2D Shape를 Extrude하여 볼륨 생성 → 중심 정렬 후 스케일 조정 */
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
    geo.center();                      // 중심 (0,0,0)으로 이동
    geo.scale(0.0060, 0.0060, 0.0060 * 1.35); // 전체 스케일 조정(두께 z축 보정)
    return geo;
  }, []);
}

/** 별 Geometry: 톱니형(outer/inner) 꼭짓점을 연결 → Extrude */
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
    geo.scale(0.0062, 0.0062, 0.0062 * 1.25);
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
  transmission,
  stickerUrl,
  stickerScale,
  stickerY,
  figureUrl,
}) {
  const heartGeo = useHeartGeometry();
  const starGeo = useStarGeometry();

  /* ===== 바디 파라미터: 두께/길이 → 반지름/높이 계산 ===== */
  const bodyRadius = useMemo(() => (thickness === "wide" ? 0.11 : 0.07), [thickness]);
  const bodyHeight = useMemo(() => (bodyLength === "short" ? 0.7 : 1.0), [bodyLength]);

  /* ===== 바디 월드 오프셋(바디와 받침을 함께 이동) =====
   * - bodyBaseY만 조절하면 전체가 더 낮아지거나 높아짐
   * - 장면 내 다른 객체와의 상대적인 높이를 맞출 때 유용
   */
  const bodyBaseY = -0.06; // ↓ 더 내리고 싶으면 음수 절댓값을 키우세요

  /* ===== 바디의 로컬/월드 위치 계산 =====
   * - Three의 cylinderGeometry는 중심 기준으로 위/아래가 ±height/2
   */
  const bodyCenterLocalY = bodyHeight / 2;               // 로컬 중심(+y가 위)
  const bodyCenterWorldY = bodyBaseY + bodyCenterLocalY; // 월드에서 바디 중심
  const bodyTopY         = bodyHeight;                   // 바디 꼭대기(월드 기준 offset 포함 반영됨)

  /* ===== 캡(유리) 물리 재질 =====
   * - transmission, ior, clearcoat 등을 활용한 간단한 유리 같은 느낌
   */
  const capPhysMatProps = useMemo(() => ({
    color: capColor,
    metalness: clamp01(metallic),
    roughness: clamp01(roughness),
    transmission: clamp01(transmission),
    thickness: 0.1,
    ior: 1.1,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  }), [capColor, metallic, roughness, transmission]);

  /* ===== 데칼 텍스처 =====
   * - 업로드 없을 때는 1x1 투명 PNG로 대체
   * - 색 공간/래핑/이방성 설정
   */
  const texSrc = stickerUrl || BLANK_1x1;
  const stickerTex = useTexture(texSrc);
  useEffect(() => {
    if (!stickerUrl) return;
    stickerTex.anisotropy = 8;
    stickerTex.wrapS = stickerTex.wrapT = THREE.ClampToEdgeWrapping;
    stickerTex.colorSpace = THREE.SRGBColorSpace;
  }, [stickerUrl, stickerTex]);

  /* ===== 데칼 Y 배치(바디 로컬 기준) =====
   * - 상하 5% 마진을 두고 0~1 값을 -y~+y로 변환
   */
  const { yLocal } = useMemo(() => {
    const yRange = bodyHeight * 0.9; // 상하 5% 마진
    return { yLocal: (clamp01(stickerY) - 0.5) * yRange };
  }, [bodyHeight, stickerY]);

  /* ===== 피규어(모델) 위치/스케일 =====
   * - 캡 모양에 따라 내부 배치를 약간씩 보정
   */
  const FIGURE_PLACEMENT = useMemo(() => {
    switch (capShape) {
      case "sphere":     return { pos: [0, -0.28, 0], scale: 0.1 };
      case "star":       return { pos: [0, -0.2,  0], scale: 0.1 };
      case "heart":      return { pos: [0, -0.23,  0], scale: 0.1 };
      case "hemisphere": return { pos: [0, -0.364,  0], scale: 0.1 };
      default:           return { pos: [0, -0.25,  0], scale: 0.1 };
    }
  }, [capShape]);

  /* ===== 받침 원반(바디의 자식) =====
   * - 바디 로컬 기준으로 바로 위에 얹는 얇은 디스크
   */
  const PLATE_R_FACTOR = 1.5;     // 바디 반지름 대비 확대 비율
  const PLATE_T        = 0.045;   // 두께
  const PLATE_EPS      = 0.001;   // z-fighting 방지용 미세 오프셋

  const plateR = bodyRadius * PLATE_R_FACTOR;
  const plateY = bodyHeight / 2 + PLATE_T / 2 + PLATE_EPS; // 바디 로컬 상단 바로 위

  return (
    <>
      <SceneSetup />

      {/* Body (받침 원반은 바디의 '자식') */}
      <mesh position={[0, bodyCenterWorldY, 0]}>
        {/* 원통(바디) */}
        <cylinderGeometry args={[bodyRadius, bodyRadius, bodyHeight, 40]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={clamp01(metallic)}
          roughness={clamp01(roughness)}
        />

        {/* 스티커 데칼: 바디 표면 정면에 투영 */}
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

        {/* 받침 원반(바디 상단에 얹음) */}
        <mesh position={[0, plateY, 0]}>
          <cylinderGeometry args={[plateR, plateR, PLATE_T, 64]} />
          <meshStandardMaterial
            color={bodyColor}
            metalness={clamp01(metallic)}
            roughness={Math.max(0.2, clamp01(roughness))}
          />
        </mesh>
      </mesh>

      {/* ── Cap Variants (그룹 회전 제거, 메쉬 회전만) ── */}

      {/* sphere 캡 */}
      {capShape === "sphere" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.sphere + 0.015, 0]}>
          <mesh>
            <sphereGeometry args={[0.32, 40, 40]} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          {figureUrl && (
            <FigureModel
              url={figureUrl}
              scale={FIGURE_PLACEMENT.scale}
              position={FIGURE_PLACEMENT.pos}
            />
          )}
        </group>
      )}

      {/* star 캡 */}
      {capShape === "star" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.star - 0.03, 0]}>
          <mesh rotation={[0, 0, Math.PI]}>
            <primitive attach="geometry" object={starGeo} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          {figureUrl && (
            <FigureModel
              url={figureUrl}
              scale={FIGURE_PLACEMENT.scale}
              position={FIGURE_PLACEMENT.pos}
            />
          )}
        </group>
      )}

      {/* heart 캡 */}
      {capShape === "heart" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.heart, 0]}>
          <mesh rotation={[0, 0, Math.PI]}>
            <primitive attach="geometry" object={heartGeo} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          {figureUrl && (
            <FigureModel
              url={figureUrl}
              scale={FIGURE_PLACEMENT.scale}
              position={FIGURE_PLACEMENT.pos}
            />
          )}
        </group>
      )}

      {/* hemisphere 캡(반구 + 덮개 원판) */}
      {capShape === "hemisphere" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.hemisphere, 0]}>
          <mesh rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[0.40, 40, 40, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.40, 48]} />
            <meshPhysicalMaterial {...capPhysMatProps} side={THREE.DoubleSide} />
          </mesh>
          {figureUrl && (
            <FigureModel
              url={figureUrl}
              scale={FIGURE_PLACEMENT.scale}
              position={FIGURE_PLACEMENT.pos}
            />
          )}
        </group>
      )}
    </>
  );
}
