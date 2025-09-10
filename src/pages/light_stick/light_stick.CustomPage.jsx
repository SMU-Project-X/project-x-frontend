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
          <h1>라이트스틱 스튜디오</h1>
        </HeaderLeft>
        <HeaderActions>
          <Button className="ghost" title="내 프리셋">📁 내 프리셋</Button>
          <Button className="primary">공유하기</Button>
        </HeaderActions>
      </Header>

      <Content>
        {/* 좌측 3D 미리보기 카드 */}
        <ViewerCard>
          <ViewerStage>
            {/* 현재는 3D 대신 자리표시자 + 힌트 */}
            <StageHint>
              <Dummy3D>3D 라이트스틱<br />모델</Dummy3D>
              <p>회전 및 확대/축소로 디자인을 확인하세요</p>
            </StageHint>

            {/* 추후 R3F로 교체될 영역 */}
            <MyElement3D />
          </ViewerStage>

          <ViewerActions>
            <Button>전체 초기화</Button>
            <div className="spacer" />
            <Button>프리셋 저장</Button>
            <Button className="dark">제작 공유하기</Button>
          </ViewerActions>
        </ViewerCard>

        {/* 우측 커스터마이즈 섹션 (전부 더미) */}
        <Sidebar>

          <Panel>
            <PanelTitle>모양 &amp; 스타일</PanelTitle>

            <SubTitle>캡 모양</SubTitle>
            <IconGrid>
              <ShapeBtn><Cap className="round" /></ShapeBtn>
              <ShapeBtn><Cap className="flat" /></ShapeBtn>
              <ShapeBtn><Cap className="taper" /></ShapeBtn>
              <ShapeBtn><Cap className="cube" /></ShapeBtn>
            </IconGrid>

            <SubTitle>그립 스타일</SubTitle>
            <IconRow>
              <ShapeBtn className="tall"><Grip /></ShapeBtn>
              <ShapeBtn className="tall"><Grip className="wide" /></ShapeBtn>
            </IconRow>
          </Panel>

          <Panel>
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

          <Panel>
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
              <AttachBtn title="스트랩">🪢</AttachBtn>
              <AttachBtn title="참">⭐</AttachBtn>
              <AttachBtn title="키링">🔗</AttachBtn>
              <AttachBtn title="케이스">🧳</AttachBtn>
            </AttachRow>
          </Panel>

          <Panel>
            <PanelTitle>스티커 &amp; 데칼</PanelTitle>
            <UploadCard>
              <div className="title">디자인 업로드</div>
              <Button className="ghost small">파일 선택</Button>
              <p className="hint">적용 위치: 바디와 캡으로 제한</p>
            </UploadCard>
          </Panel>
        </Sidebar>
      </Content>

      {/* 프리셋 (나중에) */}
      {/* 
      <section>
        ...
      </section>
      */}
    </PageRoot>
  );
}
