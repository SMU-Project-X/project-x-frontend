import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // ← 글쓰기(혹은 중간 핸들러) 페이지로 이동
import {
  PageRoot, Header, HeaderLeft, Logo, Button, Content,
  ViewerCard, ViewerStage, ViewerActions, Sidebar, Panel, PanelTitle, SubTitle,
  IconGrid, IconRow, CapBtn, GripBtn, Field, ColorField, SliderField,
  UploadCard
} from "./styled/light_stick.CustomPage.style.js";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import MyElement3D from "./MyElement3D";

/* ===========================
 * HEX 유틸
 * - #RGB → #RRGGBB로 정규화
 * - #RRGGBB 형식 검사
 * - clamp01: 0~1 범위 제한
 * =========================== */

const HEX6 = /^#([0-9a-fA-F]{6})$/;
const HEX3 = /^#([0-9a-fA-F]{3})$/;

/** 사용자가 #을 빼먹거나 #RGB로 입력해도 안전하게 #RRGGBB로 맞춤 */
function normalizeHex(v) {
  let s = (v ?? "").trim();
  if (!s.startsWith("#")) s = "#" + s;
  const m3 = s.match(HEX3);
  if (m3) {
    const [r, g, b] = m3[1];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return s;
}
const isHex6 = (v) => HEX6.test(normalizeHex(v));
const clamp01 = (n) => Math.min(1, Math.max(0, n));

/* ===========================
 * 카메라 / 오빗 설정
 * - preserveDrawingBuffer: 캡처(toBlob) 위해 필요
 * - OrbitControls: 팬 비활성, 댐핑 활성화
 * =========================== */

const CAMERA_INIT = { fov: 40, near: 0.05, far: 40, position: [1.5, 1.5, 2.7] };
const ORBIT_CFG = {
  enablePan: false,
  enableDamping: true,
  dampingFactor: 0.08,
  minDistance: 1.2,
  maxDistance: 6,
  minPolarAngle: 0.01,
  maxPolarAngle: Math.PI - 0.01,
  target: [0, 0.7, 0], // 카메라가 바라보는 지점(응원봉 상단 근처로 조정)
  zoomSpeed: 0.8,
  rotateSpeed: 0.9,
};

export default function LightStickCustomPage() {
  const navigate = useNavigate(); // 라우팅 훅

  /* =============== 형태 관련 상태 =============== */
  const [capShape, setCapShape] = useState("sphere"); // 캡 모양
  const [thickness, setThickness] = useState("thin"); // 바디 두께
  const [bodyLength, setBodyLength] = useState("short"); // 바디 길이

  /* =============== 색상 상태 (#RRGGBB) =============== */
  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [capColor, setCapColor] = useState("#ffffff");
  // 텍스트 입력값(검증 전)을 별도 보관 → 즉시 미러링 + 검증 UX
  const [bodyColorText, setBodyColorText] = useState(bodyColor);
  const [capColorText, setCapColorText] = useState(capColor);

  // 유효성: 비어있지 않고, 정규화 후 #RRGGBB가 아니면 invalid
  const bodyInvalid = useMemo(
    () => bodyColorText.trim() !== "" && !isHex6(bodyColorText),
    [bodyColorText]
  );
  const capInvalid = useMemo(
    () => capColorText.trim() !== "" && !isHex6(capColorText),
    [capColorText]
  );

  /* =============== 재질(물리 기반 파라미터) =============== */
  const [metallic, setMetallic] = useState(0.25);
  const [roughness, setRoughness] = useState(0.0);
  const [transmission, setTransmission] = useState(0.5);

  /* =============== 스티커(데칼) =============== */
  const [stickerUrl, setStickerUrl] = useState("");
  const [stickerScale, setStickerScale] = useState(0.3); // 크기
  const [stickerY, setStickerY] = useState(0.5);         // 높이(0~1)

  /* =============== 피규어(GLTF) =============== */
  const [figureUrl, setFigureUrl] = useState("");

  /* =============== Blob 정리: 업로드 URL revoke =============== */
  useEffect(() => {
    return () => {
      // 사용자가 업로드한 blob: URL을 페이지 떠날 때 해제하여 메모리 누수 방지
      if (stickerUrl && stickerUrl.startsWith("blob:")) {
        URL.revokeObjectURL(stickerUrl);
      }
    };
  }, [stickerUrl]);

  /* =============== 전체 상태 초기화(초기화 버튼) =============== */
  const resetAll = useCallback(() => {
    setCapShape("sphere");
    setThickness("thin");
    setBodyLength("short");
    setBodyColor("#ffffff");
    setCapColor("#ffffff");
    setMetallic(0.25);
    setRoughness(0.0);
    setTransmission(0.5);
    setStickerUrl("");
    setStickerScale(0.3);
    setStickerY(0.5);
    setBodyColorText("#ffffff");
    setCapColorText("#ffffff");
    setFigureUrl("");
  }, []);

  /* =============== 캡처(이미지 저장/공유) 참조 =============== */
  const glRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  /**
   * 현재 프레임을 강제 렌더링 후 canvas.toBlob 으로 PNG 생성
   * - preserveDrawingBuffer: true 여야 toBlob 가능
   * - requestAnimationFrame 내부에서 호출하여 최신 프레임 보장
   */
  const captureBlob = useCallback(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          const gl = glRef.current, scene = sceneRef.current, camera = cameraRef.current;
          if (!gl || !scene || !camera) return resolve(null);
          gl.render(scene, camera);
          gl.domElement.toBlob((blob) => resolve(blob), "image/png");
        });
      }),
    []
  );

  /** 파일로 저장(a[download]) */
  const handleSaveImage = useCallback(async () => {
    const blob = await captureBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    try {
      const a = document.createElement("a");
      a.href = url;
      a.download = "lightstick.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      URL.revokeObjectURL(url);
    }
  }, [captureBlob]);

  /**
   * (새로운) 공유하기 버튼 동작 — "페이지 이동" 버전
   * - 스티커 관련(이미지/스케일/Y)은 제외하고 현재 설정만 페이로드로 구성
   * - 전담 핸들러 라우트(/lightstick/share)로 이동하며 state로 전달
   *   → 전담 페이지가 서버 저장(POST) → code 수신 → 글쓰기로 redirect 수행
   */
  const buildSharePayload = useCallback(() => {
    return {
      schemaVersion: 1,
      clientTs: Date.now(),

      // 형태
      capShape,
      thickness,
      bodyLength,

      // 색상
      bodyColor,
      capColor,

      // 재질 (0~1 범위 보정)
      metallic: clamp01(metallic),
      roughness: clamp01(roughness),
      transmission: clamp01(transmission),

      // 피규어
      figureUrl: figureUrl || null,
    };
  }, [capShape, thickness, bodyLength, bodyColor, capColor, metallic, roughness, transmission, figureUrl]);

  const handleShare = useCallback(() => {
    const payload = buildSharePayload();
    // 라우터 state로 전달 → LightstickShareHandler에서 서버 저장/리다이렉트 담당
    navigate("/lightstick/share", { state: payload });
  }, [buildSharePayload, navigate]);

  return (
    <PageRoot>
      {/* ---------- 상단 헤더 ---------- */}
      <Header>
        <HeaderLeft>
          <Logo aria-hidden>✨</Logo>
          <h1>응원봉 커스텀</h1>
        </HeaderLeft>
      </Header>

      <Content>
        {/* ---------- 좌측 3D 뷰어 ---------- */}
        <ViewerCard>
          <ViewerStage>
            <Canvas
              dpr={[1, 2]}                             /* 레티나 대응(DPR 1~2) */
              camera={CAMERA_INIT}
              gl={{ antialias: true, preserveDrawingBuffer: true }} /* ← 캡처 필요 */
              onCreated={({ gl, scene, camera }) => {
                glRef.current = gl;
                sceneRef.current = scene;
                cameraRef.current = camera;
              }}
            >
              {/* GLTF/텍스처 로딩 중에도 전체가 멈추지 않도록 Suspense 사용 */}
              <Suspense fallback={null}>
                <MyElement3D
                  capShape={capShape}
                  thickness={thickness}
                  bodyLength={bodyLength}
                  bodyColor={bodyColor}
                  capColor={capColor}
                  metallic={clamp01(metallic)}
                  roughness={clamp01(roughness)}
                  transmission={clamp01(transmission)}
                  stickerUrl={stickerUrl}
                  stickerScale={stickerScale}
                  stickerY={stickerY}
                  figureUrl={figureUrl}
                />
                <OrbitControls makeDefault {...ORBIT_CFG} />
                <Environment preset="city" /> {/* 실내/도시 HDRI */}
              </Suspense>
            </Canvas>
          </ViewerStage>

          {/* 하단 액션 바: 초기화/공유/저장 */}
          <ViewerActions>
            <Button onClick={resetAll}>초기화</Button>
            <div className="spacer" />
            <Button className="dark" onClick={handleShare}>공유하기</Button>
            <Button onClick={handleSaveImage}>이미지 저장</Button>
          </ViewerActions>
        </ViewerCard>

        {/* ---------- 우측 사이드바 ---------- */}
        <Sidebar>
          <Panel className="wide">
            <PanelTitle>커스터마이즈</PanelTitle>

            {/* 캡 모양 선택 */}
            <SubTitle>캡 모양</SubTitle>
            <IconGrid>
              <CapBtn className={capShape==="sphere" ? "active" : ""} onClick={()=>setCapShape("sphere")}>구</CapBtn>
              <CapBtn className={capShape==="star" ? "active" : ""} onClick={()=>setCapShape("star")}>별</CapBtn>
              <CapBtn className={capShape==="heart" ? "active" : ""} onClick={()=>setCapShape("heart")}>하트</CapBtn>
              <CapBtn className={capShape==="hemisphere" ? "active" : ""} onClick={()=>setCapShape("hemisphere")}>반구</CapBtn>
            </IconGrid>

            {/* 바디 두께/길이 */}
            <SubTitle>바디 두께 · 길이</SubTitle>
            <IconRow>
              <GripBtn className={`thin  ${thickness==="thin"  ? "active" : ""}`} onClick={()=>setThickness("thin")}><span className="label">얇게</span></GripBtn>
              <GripBtn className={`wide  ${thickness==="wide"  ? "active" : ""}`} onClick={()=>setThickness("wide")}><span className="label">굵게</span></GripBtn>
              <GripBtn className={`short ${bodyLength==="short" ? "active" : ""}`} onClick={()=>setBodyLength("short")}><span className="label">짧게</span></GripBtn>
              <GripBtn className={`long  ${bodyLength==="long"  ? "active" : ""}`} onClick={()=>setBodyLength("long")}><span className="label">길게</span></GripBtn>
            </IconRow>

            {/* 바디 색상 (텍스트 + 컬러 픽커 동기화) */}
            <Field>
              <span>바디 색상</span>
              <ColorField>
                <input
                  type="text"
                  value={bodyColorText}
                  onChange={(e) => {
                    const t = e.target.value;
                    setBodyColorText(t);
                    const n = normalizeHex(t);
                    if (HEX6.test(n)) setBodyColor(n.toLowerCase());
                  }}
                  onBlur={() => {
                    const n = normalizeHex(bodyColorText);
                    setBodyColorText(HEX6.test(n) ? n.toLowerCase() : bodyColor);
                  }}
                  placeholder="#RRGGBB"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  aria-invalid={bodyInvalid}
                  aria-describedby={bodyInvalid ? "bodyColorErr" : undefined}
                  style={bodyInvalid ? { borderColor:"#ef4444", outlineColor:"#ef4444" } : undefined}
                />
                <input
                  type="color"
                  value={bodyColor}
                  onChange={(e)=> {
                    setBodyColor(e.target.value);
                    setBodyColorText(e.target.value);
                  }}
                />
              </ColorField>
              {bodyInvalid && (
                <div id="bodyColorErr" role="alert" style={{ color:"#ef4444", fontSize:12, marginTop:4 }}>
                  유효한 HEX 색상(예: <code>#1a2b3c</code>)을 입력하세요.
                </div>
              )}
            </Field>

            {/* 캡 색상 */}
            <Field>
              <span>캡 색상</span>
              <ColorField>
                <input
                  type="text"
                  value={capColorText}
                  onChange={(e) => {
                    const t = e.target.value;
                    setCapColorText(t);
                    const n = normalizeHex(t);
                    if (HEX6.test(n)) setCapColor(n.toLowerCase());
                  }}
                  onBlur={() => {
                    const n = normalizeHex(capColorText);
                    setCapColorText(HEX6.test(n) ? n.toLowerCase() : capColor);
                  }}
                  placeholder="#RRGGBB"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  aria-invalid={capInvalid}
                  aria-describedby={capInvalid ? "capColorErr" : undefined}
                  style={capInvalid ? { borderColor:"#ef4444", outlineColor:"#ef4444" } : undefined}
                />
                <input
                  type="color"
                  value={capColor}
                  onChange={(e)=> {
                    setCapColor(e.target.value);
                    setCapColorText(e.target.value);
                  }}
                />
              </ColorField>
              {capInvalid && (
                <div id="capColorErr" role="alert" style={{ color:"#ef4444", fontSize:12, marginTop:4 }}>
                  유효한 HEX 색상(예: <code>#1a2b3c</code>)을 입력하세요.
                </div>
              )}
            </Field>

            {/* 재질 (메탈릭/러프니스/투명도) */}
            <SubTitle>재질 속성</SubTitle>
            <SliderField>
              <label>메탈릭</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value={metallic} onChange={(e)=>setMetallic(parseFloat(e.target.value))}/>
                <span className="value">{metallic.toFixed(2)}</span>
              </div>
            </SliderField>
            <SliderField>
              <label>거칠기</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value={roughness} onChange={(e)=>setRoughness(parseFloat(e.target.value))}/>
                <span className="value">{roughness.toFixed(2)}</span>
              </div>
            </SliderField>
            <SliderField>
              <label>투명도</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value={transmission} onChange={(e)=>setTransmission(parseFloat(e.target.value))}/>
                <span className="value">{transmission.toFixed(2)}</span>
              </div>
            </SliderField>

            {/* 피규어 선택(GLTF 경로를 옵션으로 제공) */}
            <SubTitle>피규어 선택</SubTitle>
            <select value={figureUrl} onChange={(e) => setFigureUrl(e.target.value)}>
              <option value="">없음</option>
              <option value="/models/scene.gltf">류하</option>
              {/* 다른 모델도 있으면 여기에 추가 */}
            </select>

            {/* 스티커 업로드 & 파라미터 */}
            <SubTitle>스티커 & 데칼</SubTitle>
            <UploadCard>
              <div className="title">꾸미기 업로드</div>
              <input type="file" accept="image/*" onChange={(e)=>{
                const f = e.target.files?.[0];
                if (!f) return;
                const url = URL.createObjectURL(f); // 임시 URL 생성
                setStickerUrl(url);
              }}/>
              <SliderField>
                <label>스티커 크기</label>
                <div className="slider">
                  <input type="range" min="0.1" max="1" step="0.01" value={stickerScale} onChange={(e)=>setStickerScale(parseFloat(e.target.value))}/>
                  <span className="value">{stickerScale.toFixed(2)}</span>
                </div>
              </SliderField>
              <SliderField>
                <label>스티커 높이(Y)</label>
                <div className="slider">
                  <input type="range" min="0" max="1" step="0.01" value={stickerY} onChange={(e)=>setStickerY(parseFloat(e.target.value))}/>
                  <span className="value">{Math.round(stickerY*100)}%</span>
                </div>
              </SliderField>
            </UploadCard>
          </Panel>
        </Sidebar>
      </Content>
    </PageRoot>
  );
}
