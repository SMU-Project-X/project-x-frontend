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
            <Canvas>
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
            <PanelTitle>커스터마이즈</PanelTitle>

            {/* 모양 & 스타일 */}
            <SubTitle>캡 모양</SubTitle>
            <IconGrid>
              <CapBtn className="round" />
              <CapBtn className="flat" />
              <CapBtn className="cube" />
              <CapBtn className="taper" />
            </IconGrid>

            <SubTitle>그립 스타일</SubTitle>
            <IconRow>
              <GripBtn />
              <GripBtn className="wide" />
            </IconRow>

            {/* 색상 */}
            <SubTitle>색상</SubTitle>
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

            {/* 재질 속성 */}
            <SubTitle>재질 속성</SubTitle>
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

            {/* 악세서리 */}
            <SubTitle>악세서리</SubTitle>
            <AttachRow>
              <AttachBtn>🪢</AttachBtn>
              <AttachBtn>⭐</AttachBtn>
              <AttachBtn>🔗</AttachBtn>
              <AttachBtn>🧳</AttachBtn>
            </AttachRow>

            {/* 스티커 & 데칼 */}
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
