import React, { useMemo } from "react";
import * as THREE from "three";

/** 라이트 구성: 간단히 ambient + dir 조합 (그림자/바닥 없음) */
function SceneSetup() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1.05} />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} />
    </>
  );
}

// 하트: 도톰(볼록) Extrude
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
      depth: 18,
      steps: 3,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 5,
      bevelThickness: 5,
      curveSegments: 32,
    });
    geo.center();
    const s = 0.0065;     // xy
    const sz = s * 1.35;  // z만 더 키워서 볼록
    geo.scale(s, s, sz);
    return geo;
  }, []);
}

// 별: 2D 스타(5각) → Extrude
function useStarGeometry() {
  return useMemo(() => {
    const outer = 50;
    const inner = 20;
    const spikes = 5;

    const shape = new THREE.Shape();
    for (let i = 0; i < spikes * 2; i++) {
      const r = (i % 2 === 0) ? outer : inner;
      const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 16,
      steps: 2,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 4,
      bevelThickness: 4,
      curveSegments: 48,
    });
    geo.center();
    const s = 0.0062;
    const sz = s * 1.25;
    geo.scale(s, s, sz);
    return geo;
  }, []);
}

export default function MyElement3D({
  capShape,        // "sphere" | "star" | "heart" | "hemisphere"
  thickness,       // "thin" | "wide"  → 반지름 변경
  bodyLength,      // "short" | "long"
  bodyColor,
  capColor,
  buttonColor,
  metallic,
  roughness,
  transmission,    // 새로 추가: 투명도 (0~1)
  emissive,        // 발광 강도(필라멘트만)
  accessories,
}) {
  const heartGeo = useHeartGeometry();
  const starGeo = useStarGeometry();

  // ── 바디 파라미터: 반지름·길이 ──
  const bodyRadius = thickness === "wide" ? 0.18 : 0.14;

  // 기본 short, long만 지원
  const bodyHeight = useMemo(() => {
    const map = { short: 1.0, long: 1.4 };
    return map[bodyLength] ?? 1.2;
  }, [bodyLength]);

  const bodyCenterY = bodyHeight / 2; // 바닥(0) 위에 세우기
  const bodyTopY = bodyHeight;        // 캡 기준 높이

  // 캡 Y 오프셋(모양별 중앙 위치) — 보정치
  const CAP_OFFSETS = {
    sphere: 0.26,
    star: 0.22,
    heart: 0.22,
    hemisphere: 0.24,
  };

  // 공통 캡 재질(유리/플라스틱 느낌)
  const capPhysMatProps = {
    color: capColor,
    metalness: metallic,
    roughness: roughness,
    transmission: transmission, // 투명도
    thickness: 0.4,
    ior: 1.45,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  };

  // 필라멘트(발광체) 컴포넌트
  const Filament = ({ height = 0.14 }) => (
    <mesh position={[0, 0, 0]}>
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

  return (
    <>
      <SceneSetup />

      {/* Body */}
      <mesh position={[0, bodyCenterY, 0]}>
        <cylinderGeometry args={[bodyRadius, bodyRadius, bodyHeight, 40]} />
        <meshStandardMaterial color={bodyColor} metalness={metallic} roughness={roughness} />
      </mesh>

      {/* 사이드 버튼: 바디 중간 높이에 고정 */}
      <mesh position={[bodyRadius + 0.07 - 0.01, bodyCenterY, 0]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color={buttonColor} metalness={0.2} roughness={0.6} />
      </mesh>

      {/* ── Cap Variants + Filament ───────────────── */}

      {/* 1) 구(Sphere) */}
      {capShape === "sphere" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.sphere, 0]}>
          <mesh>
            <sphereGeometry args={[0.35, 40, 40]} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          {/* 구 내부 필라멘트 */}
          <Filament height={0.16} />
        </group>
      )}

      {/* 2) 별(Star) */}
      {capShape === "star" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.star, 0]}>
          <mesh rotation={[0, 0, 0]}>
            <primitive object={starGeo} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          {/* 별 내부 필라멘트 (얇게) */}
          <Filament height={0.1} />
        </group>
      )}

      {/* 3) 하트 */}
      {capShape === "heart" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.heart, 0]} rotation={[0, 0, Math.PI]}>
          <mesh>
            <primitive object={heartGeo} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          {/* 하트 내부 필라멘트 */}
          <Filament height={0.12} />
        </group>
      )}

      {/* 4) 반구 + 바닥면 캡(원 디스크) */}
      {capShape === "hemisphere" && (
        <group position={[0, bodyTopY + CAP_OFFSETS.hemisphere, 0]} rotation={[Math.PI, 0, 0]}>
          {/* 반구 */}
          <mesh>
            <sphereGeometry args={[0.40, 40, 40, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial {...capPhysMatProps} />
          </mesh>
          {/* 절단면 덮기 */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.40, 48]} />
            <meshPhysicalMaterial {...capPhysMatProps} side={THREE.DoubleSide} />
          </mesh>
          {/* 반구 내부 필라멘트 */}
          <Filament height={0.12} />
        </group>
      )}

      {/* ── Accessories (옵션) ─────────────────────── */}
      {accessories?.rope && (
        <mesh position={[0, 0.35, 0]}>
          <torusKnotGeometry args={[0.18, 0.03, 100, 16, 2, 3]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.35} />
        </mesh>
      )}
      {accessories?.star && (
        <mesh position={[0.55, bodyTopY - 0.2, 0]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#ffd166" metalness={0.3} roughness={0.4} />
        </mesh>
      )}
      {accessories?.chain && (
        <group position={[-0.28, bodyCenterY, 0.18]} rotation={[0, Math.PI / 2, 0]}>
          {useMemo(() => Array.from({ length: 5 }), []).map((_, i) => (
            <mesh key={i} position={[i * 0.18, 0, 0]} rotation={[Math.PI/2 * (i%2), 0, 0]}>
              <torusGeometry args={[0.08, 0.022, 16, 28]} />
              <meshStandardMaterial color="#bfbfbf" metalness={0.9} roughness={0.25} />
            </mesh>
          ))}
        </group>
      )}
      {accessories?.tag && (
        <mesh position={[0, -0.35, 0.0]} rotation={[0.15, 0.3, 0]}>
          <boxGeometry args={[0.24, 0.14, 0.03]} />
          <meshStandardMaterial color="#e11d48" metalness={0.1} roughness={0.6} />
        </mesh>
      )}
    </>
  );
}
