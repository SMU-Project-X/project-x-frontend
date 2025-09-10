import {
  PageRoot,
  Header,
  HeaderLeft,
  Logo,
  HeaderActions,
  Button,
  Content,
  ViewerCard,
  ViewerStage,
  ViewerActions,
  Sidebar,
  Panel,
  PanelTitle,
  SubTitle,
  IconGrid,
  IconRow,
  CapBtn,
  GripBtn,
  Field,
  ColorField,
  SliderField,
  AttachRow,
  AttachBtn,
  UploadCard,
} from "./styled/light_stick.CustomPage.style.js";

import { Canvas } from "@react-three/fiber";
import MyElement3D from "./MyElement3D";

export default function LightStickCustomPage() {
  return (
    <PageRoot>
      <Header>
        <HeaderLeft>
          <Logo aria-hidden>✨</Logo>
          <h1>응원봉 커스텀</h1>
        </HeaderLeft>
      </Header>

      <Content>
        <ViewerCard>
          <ViewerStage>
            <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <MyElement3D />
            </Canvas>
          </ViewerStage>
          <ViewerActions>
            <Button>초기화</Button>
            <div className="spacer" />
            <Button className="dark">공유하기</Button>
          </ViewerActions>
        </ViewerCard>

        <Sidebar>
          <Panel className="wide">
            <PanelTitle>모양 & 스타일</PanelTitle>
            <SubTitle>캡 모양</SubTitle>
            <IconGrid>
              <CapBtn className="round" />
              <CapBtn className="flat" />
              <CapBtn className="taper" />
              <CapBtn className="cube" />
            </IconGrid>

            <SubTitle>그립 스타일</SubTitle>
            <IconRow>
              <GripBtn />
              <GripBtn className="wide" />
            </IconRow>
          </Panel>

          <Panel className="wide">
            <PanelTitle>색상</PanelTitle>
            <Field>
              <span>바디 색상</span>
              <ColorField>
                <input type="text" value="#000000" readOnly />
                <input type="color" value="#000000" readOnly />
              </ColorField>
            </Field>
            <Field>
              <span>캡 색상</span>
              <ColorField>
                <input type="text" value="#666666" readOnly />
                <input type="color" value="#666666" readOnly />
              </ColorField>
            </Field>
            <Field>
              <span>버튼 색상</span>
              <ColorField>
                <input type="text" value="#999999" readOnly />
                <input type="color" value="#999999" readOnly />
              </ColorField>
            </Field>
          </Panel>

          <Panel className="wide">
            <PanelTitle>재질 속성</PanelTitle>
            <SliderField>
              <label>메탈릭</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value="0.20" readOnly />
                <span className="value">0.20</span>
              </div>
            </SliderField>
            <SliderField>
              <label>거칠기</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value="0.60" readOnly />
                <span className="value">0.60</span>
              </div>
            </SliderField>
            <SliderField>
              <label>발광 강도</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value="0.40" readOnly />
                <span className="value">0.40</span>
              </div>
            </SliderField>
          </Panel>

          <Panel>
            <PanelTitle>악세서리</PanelTitle>
            <AttachRow>
              <AttachBtn>🪢</AttachBtn>
              <AttachBtn>⭐</AttachBtn>
              <AttachBtn>🔗</AttachBtn>
              <AttachBtn>🧳</AttachBtn>
            </AttachRow>
          </Panel>

          <Panel>
            <PanelTitle>스티커 & 데칼</PanelTitle>
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
