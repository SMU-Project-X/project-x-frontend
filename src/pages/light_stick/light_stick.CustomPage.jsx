import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PageRoot, Header, HeaderLeft, Logo, Button, Content,
  ViewerCard, ViewerStage, ViewerActions, Sidebar, Panel, PanelTitle, SubTitle,
  IconGrid, IconRow, CapBtn, GripBtn, Field, ColorField, SliderField,
  UploadCard
} from "./styled/light_stick.CustomPage.style.js";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import MyElement3D from "./MyElement3D";

/**
 * Page Component: LightStickCustomPage
 * 목적:
 *  - R3F 캔버스에서 응원봉(바디/캡/재질/데칼)을 실시간 커스터마이즈
 *  - HEX 색상 입력/팔레트 양방향 동기화, 3자리 HEX 확장 지원
 *  - 캔버스 캡처(저장/공유) 제공 (preserveDrawingBuffer on)
 *
 * 주요 상태(그룹):
 *  - 형태: capShape, thickness, bodyLength
 *  - 색상: bodyColor/capColor (+ 입력필드 텍스트 상태 bodyColorText/capColorText)
 *  - 재질: metallic, roughness, transmission, emissive (0~1)
 *  - 데칼: stickerUrl(object URL), stickerScale(0.1~1), stickerY(0~1)
 *
 * 접근성:
 *  - 잘못된 HEX일 때 aria-invalid & 오류 알림(role="alert")
 *  - 주요 버튼에 라벨/텍스트 제공
 *
 * 성능:
 *  - 캡처 관련 핸들러 useCallback
 *  - 정규식/헬퍼는 컴포넌트 외부 정의
 *  - Orbit/Camera 상수화
 *
 * 리소스 정리:
 *  - stickerUrl이 blob:인 경우 교체/언마운트 시 revokeObjectURL
 */

// ── Helpers (컴포넌트 외부: 재생성 방지) ──────────────────────────────────────
const HEX6 = /^#([0-9a-fA-F]{6})$/;
const HEX3 = /^#([0-9a-fA-F]{3})$/;

/** 3자리/6자리/앞에 # 없는 경우를 보정하여 '#rrggbb' 형태로 맞춘다(가능한 경우). */
function normalizeHex(v) {
  let s = (v ?? "").trim();
  if (!s.startsWith("#")) s = "#" + s;
  const m3 = s.match(HEX3);
  if (m3) {
    // #rgb → #rrggbb
    const [r, g, b] = m3[1];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return s;
}
const isHex6 = (v) => HEX6.test(normalizeHex(v));

/** 공통 숫자 clamp */
const clamp01 = (n) => Math.min(1, Math.max(0, n));

// ── 상수: 카메라/오빗 기본값 ───────────────────────────────────────────────
const CAMERA_INIT = {
  fov: 40,
  near: 0.05,
  far: 40,
  position: [1.5, 1.5, 2.7],
};
const ORBIT_CFG = {
  enablePan: false,
  enableDamping: true,
  dampingFactor: 0.08,
  minDistance: 1.2,
  maxDistance: 6,
  minPolarAngle: 0.01,
  maxPolarAngle: Math.PI - 0.01,
  target: [0, 0.8, 0],
  zoomSpeed: 0.8,
  rotateSpeed: 0.9,
};

export default function LightStickCustomPage() {
  // ── 형태 상태 ──
  const [capShape, setCapShape] = useState("sphere");
  const [thickness, setThickness] = useState("thin");     // 'thin' | 'wide'
  const [bodyLength, setBodyLength] = useState("short");  // 'short' | 'long'

  // ── 색상(HEX) 상태: 텍스트/팔레트 입력 동기화 ──
  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [capColor,  setCapColor]  = useState("#ffffff");
  const [bodyColorText, setBodyColorText] = useState(bodyColor);
  const [capColorText,  setCapColorText]  = useState(capColor);

  const bodyInvalid = useMemo(
    () => bodyColorText.trim() !== "" && !isHex6(bodyColorText),
    [bodyColorText]
  );
  const capInvalid = useMemo(
    () => capColorText.trim() !== "" && !isHex6(capColorText),
    [capColorText]
  );

  // ── 재질 상태 ──
  const [metallic, setMetallic]         = useState(0.25);
  const [roughness, setRoughness]       = useState(0.00);
  const [transmission, setTransmission] = useState(0.50);
  const [emissive, setEmissive]         = useState(0.00);

  // ── 스티커/데칼 상태 ──
  const [stickerUrl, setStickerUrl]     = useState("");
  const [stickerScale, setStickerScale] = useState(0.3); // 0.1~1.0
  const [stickerY, setStickerY]         = useState(0.5); // 0~1

  // blob: URL 해제(교체/언마운트 시 안전하게 정리)
  useEffect(() => {
    return () => {
      if (stickerUrl && stickerUrl.startsWith("blob:")) {
        URL.revokeObjectURL(stickerUrl);
      }
    };
  }, [stickerUrl]);

  /** 전체 초기화: UI/3D 상태 동기 초기화 */
  const resetAll = useCallback(() => {
    setCapShape("sphere");
    setThickness("thin");
    setBodyLength("short");
    setBodyColor("#ffffff");
    setCapColor("#ffffff");
    setMetallic(0.25);
    setRoughness(0.0);
    setTransmission(0.5);
    setEmissive(0.0);
    setStickerUrl("");
    setStickerScale(0.3);
    setStickerY(0.5);
    setBodyColorText("#ffffff");
    setCapColorText("#ffffff");
  }, []);

  // ── 캔버스 캡처(다운로드/공유) ───────────────────────────────────────────
  /**
   * 캔버스 참조 보관:
   *  - preserveDrawingBuffer=true 로 설정했으므로 toBlob 가능
   *  - 캡처 시점에 한 프레임 렌더를 보장하기 위해 requestAnimationFrame 사용
   */
  const glRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  /** 현재 프레임을 PNG Blob으로 캡처 (없으면 null) */
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

  /** 로컬 파일로 저장 */
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

  /** Web Share API(가능 시)로 공유, 불가하면 저장 */
  const handleShare = useCallback(async () => {
    const blob = await captureBlob();
    if (!blob) return handleSaveImage();
    const file = new File([blob], "lightstick.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "Lightstick", text: "내 커스텀 응원봉" });
      } catch {
        // 사용자 취소/오류 → 저장으로 폴백
        handleSaveImage();
      }
    } else {
      handleSaveImage();
    }
  }, [captureBlob, handleSaveImage]);

  return (
    <PageRoot>
      <Header>
        <HeaderLeft>
          <Logo aria-hidden>✨</Logo>
          <h1>응원봉 커스텀</h1>
        </HeaderLeft>
      </Header>

      <Content>
        {/* 좌측 3D 뷰어 카드 */}
        <ViewerCard>
          <ViewerStage>
            <Canvas
              dpr={[1, 2]}
              camera={CAMERA_INIT}
              gl={{ antialias: true, preserveDrawingBuffer: true }}
              onCreated={({ gl, scene, camera }) => {
                glRef.current = gl;
                sceneRef.current = scene;
                cameraRef.current = camera;
              }}
            >
              <MyElement3D
                capShape={capShape}
                thickness={thickness}
                bodyLength={bodyLength}
                bodyColor={bodyColor}
                capColor={capColor}
                metallic={clamp01(metallic)}
                roughness={clamp01(roughness)}
                transmission={clamp01(transmission)}
                emissive={clamp01(emissive)}
                stickerUrl={stickerUrl}
                stickerScale={stickerScale}
                stickerY={stickerY}
              />
              <OrbitControls makeDefault {...ORBIT_CFG} />
              <Environment preset="city" /> {/* 실내/도시 조명 리플렉션 */}
            </Canvas>
          </ViewerStage>

          <ViewerActions>
            <Button onClick={resetAll}>초기화</Button>
            <div className="spacer" />
            <Button className="dark" onClick={handleShare}>공유하기</Button>
            <Button onClick={handleSaveImage}>이미지 저장</Button>
          </ViewerActions>
        </ViewerCard>

        {/* 우측 사이드바: 옵션 패널 */}
        <Sidebar>
          <Panel className="wide">
            <PanelTitle>커스터마이즈</PanelTitle>

            {/* 캡 모양 */}
            <SubTitle>캡 모양</SubTitle>
            <IconGrid>
              <CapBtn className={capShape==="sphere" ? "active" : ""} onClick={()=>setCapShape("sphere")}>구</CapBtn>
              <CapBtn className={capShape==="star" ? "active" : ""} onClick={()=>setCapShape("star")}>별</CapBtn>
              <CapBtn className={capShape==="heart" ? "active" : ""} onClick={()=>setCapShape("heart")}>하트</CapBtn>
              <CapBtn className={capShape==="hemisphere" ? "active" : ""} onClick={()=>setCapShape("hemisphere")}>반구</CapBtn>
            </IconGrid>

            {/* 바디 두께 · 길이 */}
            <SubTitle>바디 두께 · 길이</SubTitle>
            <IconRow>
              <GripBtn className={`thin  ${thickness==="thin"  ? "active" : ""}`} onClick={()=>setThickness("thin")}><span className="label">얇게</span></GripBtn>
              <GripBtn className={`wide  ${thickness==="wide"  ? "active" : ""}`} onClick={()=>setThickness("wide")}><span className="label">굵게</span></GripBtn>
              <GripBtn className={`short ${bodyLength==="short" ? "active" : ""}`} onClick={()=>setBodyLength("short")}><span className="label">짧게</span></GripBtn>
              <GripBtn className={`long  ${bodyLength==="long"  ? "active" : ""}`} onClick={()=>setBodyLength("long")}><span className="label">길게</span></GripBtn>
            </IconRow>

            {/* 바디 색상 */}
            <Field>
              <span>바디 색상</span>
              <ColorField>
                <input
                  type="text"
                  value={bodyColorText}
                  onChange={(e) => {
                    const t = e.target.value;
                    setBodyColorText(t); // 입력 원문 유지
                    const n = normalizeHex(t);
                    if (HEX6.test(n)) setBodyColor(n.toLowerCase()); // 유효한 경우에만 상태 반영
                  }}
                  onBlur={() => {
                    const n = normalizeHex(bodyColorText);
                    // blur 시 정규화/복구
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
                    setBodyColor(e.target.value);       // 팔레트 선택 → 상태 반영
                    setBodyColorText(e.target.value);   // 텍스트도 동기화
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

            {/* 재질 속성 */}
            <SubTitle>재질 속성</SubTitle>
            <SliderField>
              <label>메탈릭</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value={metallic} onChange={e=>setMetallic(parseFloat(e.target.value))} />
                <span className="value">{metallic.toFixed(2)}</span>
              </div>
            </SliderField>
            <SliderField>
              <label>거칠기</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value={roughness} onChange={e=>setRoughness(parseFloat(e.target.value))} />
                <span className="value">{roughness.toFixed(2)}</span>
              </div>
            </SliderField>
            <SliderField>
              <label>투명도</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value={transmission} onChange={e=>setTransmission(parseFloat(e.target.value))} />
                <span className="value">{transmission.toFixed(2)}</span>
              </div>
            </SliderField>
            <SliderField>
              <label>발광 강도</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value={emissive} onChange={e=>setEmissive(parseFloat(e.target.value))} />
                <span className="value">{emissive.toFixed(2)}</span>
              </div>
            </SliderField>

            {/* 스티커 & 데칼 */}
            <SubTitle>스티커 & 데칼</SubTitle>
            <UploadCard>
              <div className="title">꾸미기 업로드</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e)=>{
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const url = URL.createObjectURL(f);
                  setStickerUrl(url);
                }}
              />
              <SliderField>
                <label>스티커 크기</label>
                <div className="slider">
                  <input
                    type="range"
                    min="0.1" max="1" step="0.01"
                    value={stickerScale}
                    onChange={e=>setStickerScale(parseFloat(e.target.value))}
                  />
                  <span className="value">{stickerScale.toFixed(2)}</span>
                </div>
              </SliderField>
              <SliderField>
                <label>스티커 높이(Y)</label>
                <div className="slider">
                  <input
                    type="range"
                    min="0" max="1" step="0.01"
                    value={stickerY}
                    onChange={e=>setStickerY(parseFloat(e.target.value))}
                  />
                  <span className="value">{Math.round(stickerY * 100)}%</span>
                </div>
              </SliderField>
            </UploadCard>
          </Panel>
        </Sidebar>
      </Content>
    </PageRoot>
  );
}
