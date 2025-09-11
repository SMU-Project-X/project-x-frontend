import React, { useRef, useState } from "react";
import {
  PageRoot, Header, HeaderLeft, Logo, Button, Content,
  ViewerCard, ViewerStage, ViewerActions, Sidebar, Panel, PanelTitle, SubTitle,
  IconGrid, IconRow, CapBtn, GripBtn, Field, ColorField, SliderField,
  AttachRow, AttachBtn, UploadCard
} from "./styled/light_stick.CustomPage.style.js";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MyElement3D from "./MyElement3D";

export default function LightStickCustomPage() {
  // 캡 모양: sphere | star | heart | hemisphere
  const [capShape, setCapShape] = useState("sphere");

  // 두께(=반지름) 얇게/굵게
  const [thickness, setThickness] = useState("thin"); // 'thin' | 'wide'

  // 길이: 기본 short, 'long'만 선택 제공
  const [bodyLength, setBodyLength] = useState("short"); // 'short' | 'long'

  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [capColor, setCapColor] = useState("#ffffff");
  const [buttonColor, setButtonColor] = useState("#ffffff");

  const [metallic, setMetallic] = useState(0.0);
  const [roughness, setRoughness] = useState(0.0);

  // 투명도(=transmission) 슬라이더 추가
  const [transmission, setTransmission] = useState(0.5);

  // 발광 강도(필라멘트에만 적용)
  const [emissive, setEmissive] = useState(0.0);

  const [accessories, setAccessories] = useState({
    rope: false,  // 🪢
    star: false,  // ⭐
    chain: false, // 🔗
    tag: false,   // 🧳
  });

  const toggleAccessory = (key) =>
    setAccessories((prev) => ({ ...prev, [key]: !prev[key] }));

  const resetAll = () => {
    setCapShape("sphere");
    setThickness("thin");
    setBodyLength("short");
    setBodyColor("#000000");
    setCapColor("#666666");
    setButtonColor("#999999");
    setMetallic(0.2);
    setRoughness(0.6);
    setTransmission(0.3);
    setEmissive(0.4);
    setAccessories({ rope: false, star: false, chain: false, tag: false });
  };

  // 캔버스 캡처용 ref
  const glRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const captureBlob = async () =>
    new Promise((resolve) => {
      const gl = glRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      if (!gl || !scene || !camera) return resolve(null);
      // 최신 프레임 보장 후 캡처
      gl.render(scene, camera);
      gl.domElement.toBlob((blob) => resolve(blob), "image/png");
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
        await navigator.share({
          files: [file],
          title: "Lightstick",
          text: "내 커스텀 응원봉",
        });
      } catch {
        // 취소/오류 시 저장으로 폴백
        handleSaveImage();
      }
    } else {
      // 파일 공유 불가 환경은 저장으로 폴백
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
              camera={{ fov: 45, near: 0.1, far: 50, position: [2, 2, 5] }}
              gl={{ antialias: true }}
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
                buttonColor={buttonColor}
                metallic={metallic}
                roughness={roughness}
                transmission={transmission}
                emissive={emissive}
                accessories={accessories}
              />
              {/* 마우스 회전 + 휠 줌 */}
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
              <CapBtn
                className={capShape==="sphere" ? "active" : ""}
                onClick={()=>setCapShape("sphere")}
              >구</CapBtn>
              <CapBtn
                className={capShape==="star" ? "active" : ""}
                onClick={()=>setCapShape("star")}
              >별</CapBtn>
              <CapBtn
                className={capShape==="heart" ? "active" : ""}
                onClick={()=>setCapShape("heart")}
              >♥</CapBtn>
              <CapBtn
                className={capShape==="hemisphere" ? "active" : ""}
                onClick={()=>setCapShape("hemisphere")}
              >반구</CapBtn>
            </IconGrid>

            {/* 바디 두께 · 길이 */}
            <SubTitle>바디 두께 · 길이</SubTitle>
            <IconRow>
              {/* 두께 */}
              <GripBtn
                className={thickness==="thin" ? "active" : ""}
                onClick={()=>setThickness("thin")}
              >얇게</GripBtn>
              <GripBtn
                className={thickness==="wide" ? "active wide" : "wide"}
                onClick={()=>setThickness("wide")}
              >굵게</GripBtn>

              {/* 길이 (보통 제거, short 기본값 / long 선택만 제공) */}
              <GripBtn
                className={bodyLength==="short" ? "active" : ""}
                onClick={()=>setBodyLength("short")}
              >짧게</GripBtn>
              <GripBtn
                className={bodyLength==="long" ? "active" : ""}
                onClick={()=>setBodyLength("long")}
              >길게</GripBtn>
            </IconRow>

            {/* 색상 */}
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
            <Field>
              <span>버튼 색상</span>
              <ColorField>
                <input type="text" value={buttonColor} readOnly />
                <input type="color" value={buttonColor} onChange={e=>setButtonColor(e.target.value)} />
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

            {/* 악세서리 */}
            <SubTitle>악세서리</SubTitle>
            <AttachRow>
              <AttachBtn
                onClick={()=>toggleAccessory("rope")}
                style={{ outline: accessories.rope ? "2px solid var(--accent)" : "none" }}
              >🪢</AttachBtn>
              <AttachBtn
                onClick={()=>toggleAccessory("star")}
                style={{ outline: accessories.star ? "2px solid var(--accent)" : "none" }}
              >⭐</AttachBtn>
              <AttachBtn
                onClick={()=>toggleAccessory("chain")}
                style={{ outline: accessories.chain ? "2px solid var(--accent)" : "none" }}
              >🔗</AttachBtn>
              <AttachBtn
                onClick={()=>toggleAccessory("tag")}
                style={{ outline: accessories.tag ? "2px solid var(--accent)" : "none" }}
              >🧳</AttachBtn>
            </AttachRow>

            {/* 스티커 & 데칼 (후순위) */}
            <SubTitle>스티커 & 데칼</SubTitle>
            <UploadCard>
              <div className="title">디자인 업로드</div>
              <Button className="ghost small">파일 선택</Button>
              <p className="hint">적용 위치: 바디와 캡으로 제한</p>
            </UploadCard>
          </Panel>
        </Sidebar>
      </Content>
    </PageRoot>
  );
}
