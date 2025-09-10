import styled from "styled-components";

/* 공통 색/그리드 토큰: 루트에 두고 하위에서 var()로 사용 */
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

/* 상단 헤더 */
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

/* 공통 버튼들 */
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

export const IconBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--card);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

/* 본문 그리드: 좌(2) : 우(1) */
export const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 16px;
  padding: 16px;

  /* 좁은 화면 대응 */
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

/* 좌측 3D 카드 (비율은 2:1, 높이 480px 고정) */
export const ViewerCard = styled.section`
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  height: 800px;
  max-height: 800px;
`;

export const ViewerToolbar = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px;
  justify-content: flex-end;
  border-bottom: 1px solid var(--line);
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

export const StageHint = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  color: var(--muted);
  font-size: 12px;
  gap: 10px;
  padding-bottom: 44px; /* 하단 액션바와 겹치지 않도록 */
`;

export const Dummy3D = styled.div`
  width: 90px;
  height: 150px;
  border-radius: 8px;
  border: 1px dashed #c9ced6;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f3f4f6;
  color: #717991;
  font-weight: 600;
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

/* 우측 패널 */
export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Panel = styled.div`
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 12px;
  box-shadow: var(--shadow);
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

/* 아이콘형 버튼 그리드 */
export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const IconRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

export const ShapeBtn = styled.button`
  border: 1px solid var(--line);
  background: var(--card);
  border-radius: 10px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.tall {
    height: 64px;
  }

  &.active {
    outline: 2px solid var(--accent);
    outline-offset: 0;
  }
`;

/* 캡/그립 간단한 도형 더미 */
export const Cap = styled.span`
  display: block;
  width: 28px;
  height: 28px;
  background: #e5e7eb;
  border: 2px solid #94a3b8;
  border-radius: 6px;

  &.round {
    border-radius: 999px;
  }
  &.flat {
    border-radius: 8px;
  }
  &.taper {
    width: 0;
    height: 0;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 28px solid #94a3b8;
    background: transparent;
    border-top: none;
  }
  &.cube {
    /* 기본 사각형 유지 */
  }
`;

export const Grip = styled.span`
  display: block;
  width: 10px;
  background: #94a3b8;
  height: 38px;
  border-radius: 6px;

  &.wide {
    width: 16px;
  }
`;

/* 폼 필드 */
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

/* 첨부/업로드 */
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
