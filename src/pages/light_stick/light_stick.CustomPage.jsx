import React, { useRef, useState } from "react";
import {
  PageRoot, Header, HeaderLeft, Logo, Button, Content,
  ViewerCard, ViewerStage, ViewerActions, Sidebar, Panel, PanelTitle, SubTitle,
  IconGrid, IconRow, CapBtn, GripBtn, Field, ColorField, SliderField,
  UploadCard
} from "./styled/light_stick.CustomPage.style.js";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import MyElement3D from "./MyElement3D";

export default function LightStickCustomPage() {
  const [capShape, setCapShape] = useState("sphere");
  const [thickness, setThickness] = useState("thin");     // 'thin' | 'wide'
  const [bodyLength, setBodyLength] = useState("short");  // 'short' | 'long'

  // 색상(유지)
  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [capColor, setCapColor]   = useState("#ffffff");

  // 재질/광택
  const [metallic, setMetallic]       = useState(0.25);
  const [roughness, setRoughness]     = useState(0.00);
  const [transmission, setTransmission] = useState(0.50);
  const [emissive, setEmissive]       = useState(0.00);

  // 스티커/데칼
  const [stickerUrl, setStickerUrl]   = useState("");
  const [stickerScale, setStickerScale] = useState(0.3); // 0.1~1.0
  const [stickerY, setStickerY]       = useState(0.5);   // 0~1 (바디 높이 내 정규화된 Y 위치)

  const resetAll = () => {
    setCapShape("sphere");
    setThickness("thin");
    setBodyLength("short");
    setBodyColor("#e5e7eb");
    setCapColor("#ffffff");
    setMetallic(0.2);
    setRoughness(0.6);
    setTransmission(0.3);
    setEmissive(0.4);
    setStickerUrl("");
    setStickerScale(0.5);
    setStickerY(0.5);
  };

  // 캔버스 캡처
  const glRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const captureBlob = async () =>
    new Promise((resolve) => {
      requestAnimationFrame(() => {
        const gl = glRef.current, scene = sceneRef.current, camera = cameraRef.current;
        if (!gl || !scene || !camera) return resolve(null);
        gl.render(scene, camera);
        gl.domElement.toBlob((blob) => resolve(blob), "image/png");
      });
    });

  const handleSaveImage = async () => {
    const blob = await captureBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lightstick.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const blob = await captureBlob();
    if (!blob) return handleSaveImage();
    const file = new File([blob], "lightstick.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "Lightstick", text: "내 커스텀 응원봉" });
      } catch {
        handleSaveImage();
      }
    } else {
      handleSaveImage();
    }
  };

  return (
    <PageRoot>
      <Header>
        <HeaderLeft>
          <Logo aria-hidden>✨</Logo>
          <h1>응원봉 커스텀</h1>
        </HeaderLeft>
      </Header>

      <Content>
        {/* 좌측 3D 뷰어 */}
        <ViewerCard>
          <ViewerStage>
            <Canvas
              dpr={[1, 2]}
              camera={{ fov: 40, near: 0.05, far: 40, position: [1.5, 1.5, 2.7] }}
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
                metallic={metallic}
                roughness={roughness}
                transmission={transmission}
                emissive={emissive}
                stickerUrl={stickerUrl}
                stickerScale={stickerScale}
                stickerY={stickerY}
              />
              <OrbitControls
                makeDefault
                enablePan={false}
                enableDamping
                dampingFactor={0.08}
                minDistance={1.2}
                maxDistance={6}
                minPolarAngle={0.3}
                maxPolarAngle={1.45}
                target={[0, 1, 0]}
                zoomSpeed={0.8}
                rotateSpeed={0.9}
              />
              <Environment preset="city" /> {/* 환경 */}
            </Canvas>
          </ViewerStage>

          <ViewerActions>
            <Button onClick={resetAll}>초기화</Button>
            <div className="spacer" />
            <Button className="dark" onClick={handleShare}>공유하기</Button>
            <Button onClick={handleSaveImage}>이미지 저장</Button>
          </ViewerActions>
        </ViewerCard>

        {/* 우측 사이드바 */}
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
              <GripBtn className={thickness==="thin" ? "active" : ""} onClick={()=>setThickness("thin")}>얇게</GripBtn>
              <GripBtn className={thickness==="wide" ? "active wide" : "wide"} onClick={()=>setThickness("wide")}>굵게</GripBtn>
              <GripBtn className={bodyLength==="short" ? "active" : ""} onClick={()=>setBodyLength("short")}>짧게</GripBtn>
              <GripBtn className={bodyLength==="long" ? "active" : ""} onClick={()=>setBodyLength("long")}>길게</GripBtn>
            </IconRow>

            {/* 색상 (바디/캡 유지) */}
            <SubTitle>색상</SubTitle>
            <Field>
              <span>바디 색상</span>
              <ColorField>
                <input type="text" value={bodyColor} readOnly />
                <input type="color" value={bodyColor} onChange={e=>setBodyColor(e.target.value)} />
              </ColorField>
            </Field>
            <Field>
              <span>캡 색상</span>
              <ColorField>
                <input type="text" value={capColor} readOnly />
                <input type="color" value={capColor} onChange={e=>setCapColor(e.target.value)} />
              </ColorField>
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
                  <input type="range" min="0.1" max="1" step="0.01" value={stickerScale} onChange={e=>setStickerScale(parseFloat(e.target.value))} />
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
