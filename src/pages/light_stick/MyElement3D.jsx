import styled from "styled-components";

/**
 * 지금 단계: HTML/CSS 레이아웃만. 3D는 나중에.
 * - 이 컴포넌트는 ViewerStage 내부를 “채우는” 자리표시자 역할.
 * - 추후 @react-three/fiber <Canvas> + 조명/메쉬/후처리 등을 여기로 이동.
 */

const Fill = styled.div`
  position: absolute;
  inset: 0;
  /* 디자인 확인용 배경 (원하면 제거 가능) */
  background: radial-gradient(ellipse at 50% 40%, #ffffff 0%, #f2f5ff 45%, #e9ecf8 70%, #e7e8ec 100%);
  opacity: 0.5;
`;

export default function MyElement3D() {
  return <Fill aria-hidden />;
}
