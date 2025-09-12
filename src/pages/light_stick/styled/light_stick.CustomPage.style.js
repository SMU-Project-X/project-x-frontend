import styled from "styled-components";

/**
 * styled-system: 공통 토큰/레이아웃 정의
 * 목적:
 *  - 라이트/카드/그리드/버튼 상태를 토큰화하여 일관된 룩앤필 유지
 *  - 반응형(≤960px)에서 1열 전환
 * 비고:
 *  - 색상/그림자/곡률 토큰은 컴포넌트 전반에서 재사용
 *  - 아이콘형 버튼(정사각형)은 aspect-ratio로 안정적 비율 유지
 */

export const PageRoot = styled.div`
  --bg: #f5f6f8;
  --card: #ffffff;
  --line: #e7e8ec;
  --muted: #6b7280;
  --text: #111827;
  --btn: #eef0f4;
  --btn-dark: #0f172a;
  --accent: #2b59ff;
  --shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  --radius: 16px;

  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: ui-sans-serif, system-ui, "Segoe UI", Roboto, "Apple Color Emoji",
    "Noto Color Emoji";
`;

/** 상단 고정 헤더: 로고/타이틀/액션 영역 */
export const Header = styled.header`
  height: 56px;
  padding: 0 20px;
  background: var(--card);
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 5;
`;
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h1 {
    font-size: 16px;
    margin: 0;
  }
`;
export const Logo = styled.span`
  display: inline-flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
`;
export const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

/** 공통 버튼: 기본/primary/dark/ghost/small 변형 */
export const Button = styled.button`
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--btn);
  cursor: pointer;
  font-weight: 600;

  &.primary {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
  }
  &.dark {
    background: var(--btn-dark);
    color: #fff;
    border-color: transparent;
  }
  &.ghost {
    background: transparent;
  }
  &.small {
    height: 30px;
    padding: 0 10px;
    font-size: 13px;
  }
`;

/** 본문 2열 그리드: 좌(뷰어) : 우(사이드바) = 3.5 : 1 */
export const Content = styled.div`
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  gap: 16px;
  padding: 16px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/** 좌측 3D 카드: 고정 높이·스크롤 방지, 캔버스 위치 안정화 */
export const ViewerCard = styled.section`
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  height: 860px;
`;
export const ViewerStage = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 320px;
  background: #fafbfc;
`;
export const ViewerActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-top: 1px solid var(--line);
  background: #fafbfc;

  .spacer {
    flex: 1;
  }
`;

/** 우측 사이드바: 2열 카드 배치(모바일 1열) */
export const Sidebar = styled.aside`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/** 옵션 패널: 기본 박스 + span 조정 */
export const Panel = styled.div`
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px;
  box-shadow: var(--shadow);

  &.wide {
    grid-column: span 2;
  }
`;
export const PanelTitle = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
`;
export const SubTitle = styled.div`
  font-size: 12px;
  color: #64748b;
  margin: 10px 0 6px;
`;

/** 아이콘형 옵션 버튼: 균등 컬럼 그리드 */
export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
export const IconRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

/** 캡 모양 선택 버튼: 정사각형·상태 하이라이트·간단한 도형 프리뷰 */
export const CapBtn = styled.button`
  border: 1px solid var(--line);
  background: var(--card);
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.active {
    outline: 2px solid var(--accent);
    outline-offset: 0;
  }

  &.round::before,
  &.flat::before,
  &.cube::before {
    content: "";
    width: 60%;
    height: 60%;
    background: #e5e7eb;
    border: 2px solid #94a3b8;
    display: block;
  }
  &.round::before {
    border-radius: 999px;
  }
  &.flat::before {
    border-radius: 8px;
  }
  &.cube::before {
    border-radius: 6px;
  }

  &.taper::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 30% solid transparent;
    border-right: 30% solid transparent;
    border-bottom: 60% solid #94a3b8;
  }
`;

/** 그립(두께/길이) 버튼: 위 아이콘/아래 라벨의 2행 그리드 */
export const GripBtn = styled.button`
  border: 1px solid var(--line);
  background: var(--card);
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template-rows: 1fr 22px;
  align-items: center;
  justify-items: center;
  padding: 8px 6px;
  font-size: 12px;
  color: #475569;
  cursor: pointer;

  &.active {
    outline: 2px solid var(--accent);
    outline-offset: 0;
    color: var(--accent);
  }

  &::before {
    content: "";
    grid-row: 1;
    width: 28%;
    height: 60%;
    background: currentColor; 
    border-radius: 6px;
    display: block;
  }
  
  &.thin::before {  width: 20%; height: 70%; }
  &.wide::before {  width: 40%; height: 70%; }
  &.short::before { width: 20%; height: 50%; }
  &.long::before  { width: 20%; height: 80%; }

  .label {
    grid-row: 2;
    line-height: 1;
    white-space: nowrap;
    text-align: center;
  }
`;

/** 입력 필드: 레이블/입력/보조 텍스트 배치 */
export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;

  > span {
    font-size: 12px;
    color: #475569;
    margin-top: 8px;
  }
`;
export const ColorField = styled.div`
  display: flex;
  gap: 8px;

  input[type="text"] {
    flex: 1;
    height: 34px;
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 0 10px;
    font-family: monospace;
    background: #fff;
  }

  input[type="color"] {
    width: 38px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid var(--line);
    padding: 0;
    background: #fff;
  }
`;
export const SliderField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;

  .slider {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  input[type="range"] {
    flex: 1;
  }
  .value {
    width: 46px;
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: #475569;
    font-size: 12px;
  }
`;

/** 첨부 버튼/업로드 카드: 데칼 이미지 업로드 안내 */
export const AttachRow = styled.div`
  display: flex;
  gap: 8px;
`;
export const AttachBtn = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--card);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
`;
export const UploadCard = styled.div`
  border: 1px dashed #cbd5e1;
  border-radius: 14px;
  padding: 14px;
  text-align: center;
  background: #fafafa;

  .title {
    font-weight: 700;
    margin-bottom: 8px;
  }
  .hint {
    margin: 6px 0 0;
    font-size: 11px;
    color: #64748b;
  }
`;
