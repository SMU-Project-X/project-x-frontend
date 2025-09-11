import styled from "styled-components";

/* 공통 색/그리드 토큰 */
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

/* Header */
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

/* Buttons */
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

/* 본문 그리드 */
export const Content = styled.div`
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  gap: 16px;
  padding: 16px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/* 좌측 3D 카드 */
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

/* Sidebar */
export const Sidebar = styled.aside`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/* Panel */
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

/* 기존: 섹션 내부 버튼 컨테이너 (유지) */
export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개 */
  gap: 10px;
`;
export const IconRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 2개 */
  gap: 10px;
`;


/* 캡 버튼 */
export const CapBtn = styled.button`
  border: 1px solid var(--line);
  background: var(--card);
  border-radius: 10px;
  width: 100%;          /* 부모 칸 100% 채우기 */
  aspect-ratio: 1 / 1;  /* 정사각형 */
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

/* 그립 버튼 */
export const GripBtn = styled.button`
  border: 1px solid var(--line);
  background: var(--card);
  border-radius: 10px;
  width: 100%;          /* 부모 칸 100% 채우기 */
  aspect-ratio: 1 / 1;  /* 정사각형 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.active {
    outline: 2px solid var(--accent);
    outline-offset: 0;
  }

  &::before {
    content: "";
    width: 24%;
    height: 60%;
    background: #94a3b8;
    border-radius: 6px;
    display: block;
  }
  &.wide::before {
    width: 36%;
  }
`;

/* Fields */
export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;

  > span {
    font-size: 12px;
    color: #475569;
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
    width: 46px;
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

/* Attachments */
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
