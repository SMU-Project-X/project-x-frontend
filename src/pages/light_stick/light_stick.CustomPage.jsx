import {
  PageRoot,
  Header,
  HeaderLeft,
  Logo,
  HeaderActions,
  Button,
  IconBtn,
  Content,
  ViewerCard,
  ViewerToolbar,
  ViewerStage,
  StageHint,
  Dummy3D,
  ViewerActions,
  Sidebar,
  SidebarTitle,
  Panel,
  PanelTitle,
  SubTitle,
  IconGrid,
  IconRow,
  ShapeBtn,
  Cap,
  Grip,
  Field,
  ColorField,
  SliderField,
  AttachRow,
  AttachBtn,
  UploadCard,
} from "./styled/light_stick.CustomPage.style.js";
import MyElement3D from "./MyElement3D";

/**
 * HTML + CSS 레이아웃만 구성 (상태/로직 없음)
 * - 좌(3D 카드) : 우(사이드바) = 2:1
 * - 3D 카드 높이 480px 고정
 * - 컨트롤은 전부 더미 요소 (JS 로직 없이 시각만)
 */
export default function LightStickCustomPage() {
  return (
    <PageRoot>
      <Header>
        <HeaderLeft>
          <Logo aria-hidden>✨</Logo>
          <h1>Lightstick Studio</h1>
        </HeaderLeft>
        <HeaderActions>
          <Button className="ghost" title="My Presets">📁 My Presets</Button>
          <Button className="primary">Share</Button>
        </HeaderActions>
      </Header>

      <Content>
        {/* 좌측 3D 미리보기 카드 */}
        <ViewerCard>
          
          <ViewerStage>
            {/* 현재는 3D 대신 자리표시자 + 힌트 */}
            <StageHint>
              <Dummy3D>3D Lightstick<br />Model</Dummy3D>
              <p>Rotate and zoom to view your design</p>
            </StageHint>

            {/* 추후 R3F로 교체될 영역 */}
            <MyElement3D />
          </ViewerStage>

          <ViewerActions>
            <Button>Reset All</Button>
            <div className="spacer" />
            <Button>Save Preset</Button>
            <Button className="dark">Share Creation</Button>
          </ViewerActions>
        </ViewerCard>

        {/* 우측 커스터마이즈 섹션 (전부 더미) */}
        <Sidebar>
          <SidebarTitle>Customize Your Lightstick</SidebarTitle>

          <Panel>
            <PanelTitle>Shape &amp; Style</PanelTitle>

            <SubTitle>Cap Shape</SubTitle>
            <IconGrid>
              <ShapeBtn><Cap className="round" /></ShapeBtn>
              <ShapeBtn><Cap className="flat" /></ShapeBtn>
              <ShapeBtn><Cap className="taper" /></ShapeBtn>
              <ShapeBtn><Cap className="cube" /></ShapeBtn>
            </IconGrid>

            <SubTitle>Grip Style</SubTitle>
            <IconRow>
              <ShapeBtn className="tall"><Grip /></ShapeBtn>
              <ShapeBtn className="tall"><Grip className="wide" /></ShapeBtn>
            </IconRow>
          </Panel>

          <Panel>
            <PanelTitle>Colors</PanelTitle>
            <Field>
              <span>Body Color</span>
              <ColorField>
                <input type="text" value="#000000" readOnly />
                <input type="color" value="#000000" readOnly />
              </ColorField>
            </Field>
            <Field>
              <span>Cap Color</span>
              <ColorField>
                <input type="text" value="#666666" readOnly />
                <input type="color" value="#666666" readOnly />
              </ColorField>
            </Field>
            <Field>
              <span>Button Color</span>
              <ColorField>
                <input type="text" value="#999999" readOnly />
                <input type="color" value="#999999" readOnly />
              </ColorField>
            </Field>
          </Panel>

          <Panel>
            <PanelTitle>Material Properties</PanelTitle>
            <SliderField>
              <label>Metalness</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value="0.20" readOnly />
                <span className="value">0.20</span>
              </div>
            </SliderField>
            <SliderField>
              <label>Roughness</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value="0.60" readOnly />
                <span className="value">0.60</span>
              </div>
            </SliderField>
            <SliderField>
              <label>Glow Intensity</label>
              <div className="slider">
                <input type="range" min="0" max="1" step="0.01" value="0.40" readOnly />
                <span className="value">0.40</span>
              </div>
            </SliderField>
          </Panel>

          <Panel>
            <PanelTitle>Attachments</PanelTitle>
            <AttachRow>
              <AttachBtn title="Lanyard">🪢</AttachBtn>
              <AttachBtn title="Charm">⭐</AttachBtn>
              <AttachBtn title="Keyring">🔗</AttachBtn>
              <AttachBtn title="Case">🧳</AttachBtn>
            </AttachRow>
          </Panel>

          <Panel>
            <PanelTitle>Stickers &amp; Decals</PanelTitle>
            <UploadCard>
              <div className="title">Upload your design</div>
              <Button className="ghost small">Browse Files</Button>
              <p className="hint">Placement restricted to body and cap</p>
            </UploadCard>
          </Panel>
        </Sidebar>
      </Content>

      {/* Presets (나중에) */}
      {/*
      <section>
        ...
      </section>
      */}
    </PageRoot>
  );
}
