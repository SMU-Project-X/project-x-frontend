import styled, { keyframes } from "styled-components";

/* =======================
 * Keyframes (애니메이션 정의)
 * ======================= */
// 배경 그라디언트가 좌우로 흐르는 효과
export const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;
// 로고 위로 라이트가 스치는 효과
export const shine = keyframes`
  0%{transform:translateX(-100%)}
  50%{transform:translateX(100%)}
  100%{transform:translateX(100%)}
`;
// 이모지가 살짝 떠다니는 효과
export const floatKF = keyframes`
  0%,100%{ transform: translateY(0) rotate(0) }
  25%{ transform: translateY(-8px) rotate(2deg) }
  50%{ transform: translateY(-4px) rotate(-1deg) }
  75%{ transform: translateY(-6px) rotate(1deg) }
`;

/* =======================
 * Layout (모달 레이아웃/컨테이너)
 * ======================= */
// 화면 전체를 덮는 검은 반투명 오버레이
export const ModalContainerWrap = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,.6);
  display:flex; justify-content:center; align-items:center;
  z-index:1000; backdrop-filter: blur(8px);
`;
// 실제 모달 카드 박스
export const TestModal = styled.div`
  background: linear-gradient(145deg, #ffffff, ${({theme})=>theme.color.surface});
  width:90%; max-width:400px;
  height:85vh; max-height:700px;
  border-radius:20px; display:flex; flex-direction:column;
  overflow:hidden; position:relative;
  box-shadow:${({theme})=>theme.shadow.modal};
  line-height: 1.4;

  /* 모달 위에 은은한 패턴 텍스처 오버레이 */
  &::after{
    content:''; position:absolute; inset:0; pointer-events:none;
    background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
    background-size:6px 6px; mix-blend-mode: overlay; opacity:.35;
  }
`;
// 모달 상단 헤더
export const Header = styled.div`
  background:${({theme})=>theme.grad.header};
  background-size:180% 180%;
  padding:20px; text-align:center; position:relative; color:#fff; flex-shrink:0;

  &:hover { animation:${gradientShift} 6s ease infinite; }
`;
// 헤더 타이틀 텍스트
export const Title = styled.h1`
  font-size:17px; font-weight:600; margin:0; text-shadow:0 2px 4px rgba(0,0,0,.1);
`;
// 닫기(X) 버튼
export const CloseButton = styled.button`
  position:absolute; left:20px; top:50%; transform: translateY(-50%);
  background: rgba(255,255,255,.2); border:none; border-radius:50%;
  width:36px; height:36px; font-size:20px; color:#fff; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition: all .3s ease; backdrop-filter: blur(10px);
  &:hover { background: rgba(255,255,255,.3); transform: translateY(-50%) scale(1.1); }
`;
// 헤더 우측 진행 상태 표시
export const ProgressInfo = styled.div`
  font-size:14px; color:#eee; margin-top:5px;
  position:absolute; right:20px; top:50%; transform: translateY(-50%);
`;
// 모달 본문 컨텐츠 영역 (스크롤 가능)
export const Content = styled.div`
  flex:1; padding:30px 25px 20px; overflow-y:auto; position:relative;

  /* 커스텀 스크롤바 */
  &::-webkit-scrollbar { width:4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(102,126,234,.3); border-radius:2px; }
`;
// 모달 하단 푸터
export const Footer = styled.div`
  padding:25px; background: linear-gradient(to top, rgba(255,255,255,.9), transparent);
  flex-shrink:0;
`;

/* =======================
 * Progress Bar (진행도)
 * ======================= */
// 진행도 바 컨테이너
export const Progress = styled.div.attrs(({value})=>({
  role:'progressbar',
  'aria-label': `진행도 ${value}%`,
  'aria-valuemin': 0,
  'aria-valuemax': 100,
  'aria-valuenow': value ?? 0
}))`
  width:100%; height:6px; background: rgba(102,126,234,.15);
  border-radius:999px; margin:0 0 16px 0; overflow:hidden;
`;
// 진행도 채워진 부분
export const ProgressFill = styled.div`
  height:100%;
  width: ${({value}) => `${value}%`};
  background: ${({theme})=>theme.grad.progress};
  border-radius:999px; transition: width .25s ease;
`;

/* =======================
 * Buttons (CTA, 옵션, 내비)
 * ======================= */
// 시작 CTA 버튼
export const StartButton = styled.button`
  width:100%;
  background:${({theme})=>theme.grad.header};
  background-size:200% 200%;
  border:none; border-radius:16px; padding:0; cursor:pointer; position:relative; overflow:hidden;
  box-shadow:${({theme})=>theme.shadow.cta}; transition:all .3s ease;

  &:hover { transform: translateY(-2px); box-shadow:${({theme})=>theme.shadow.ctaHover}; animation:${gradientShift} 3s ease infinite; }
  &:active { transform: translateY(0); }
`;
export const ButtonContent = styled.div` display:flex; align-items:center; justify-content:center; padding:16px 24px; color:#fff; position:relative; z-index:2; `;
export const ButtonText = styled.span` font-size:1.1rem; font-weight:600; flex:1; text-align:center; `;
export const ButtonIcon = styled.span` font-size:1.3rem; transition: transform .3s ease; ${StartButton}:hover & { transform: translateX(4px); } `;
export const ButtonGlow = styled.div`
  position:absolute; inset:0; left:-100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
  transition:left .6s ease;
  ${StartButton}:hover & { left: 100%; }
`;
// 질문 답변 버튼 (옵션 선택)
export const OptionBtn = styled.button`
  /* 기본: 진한 파랑(#4a90e2), 선택됨: 밝은 파랑(#87b2d4) */
  background: ${({$selected}) => ($selected ? '#87b2d4' : '#4a90e2')};
  color:#fff; border:none; border-radius:8px;
  padding:20px 16px; font-size:14px; line-height:1.4; text-align:left;
  cursor:pointer; transition:all .2s ease; min-height:60px; display:flex; align-items:center;
`;
// 내비 버튼 (이전/다음)
export const NavBtn = styled.button`
  background:none; border:none; color:#4a90e2; font-size:14px; cursor:pointer; padding:8px 12px; min-width:50px; text-align:center;
  &:disabled { color:#ccc; cursor:not-allowed; }
`;

/* =======================
 * Hero (Start 페이지 상단 로고/이모지)
 * ======================= */
export const HeroWrap = styled.div` text-align:center; margin-bottom:35px; position:relative; `;
export const LogoContainer = styled.div`
  background-image:
    radial-gradient(120% 90% at 85% -10%, rgba(255,255,255,.35) 0%, transparent 60%),
    ${({theme})=>theme.grad.hero};
  background-blend-mode: screen, normal;
  border-radius:20px; padding:25px; margin: 0 auto 20px; width: fit-content;
  box-shadow:${({theme})=>theme.shadow.logo}; position:relative; overflow:hidden;

  &::before{
    content:''; position:absolute; inset:0;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,.12), transparent);
    transform: translateX(-100%); animation: ${shine} 3s infinite;
  }
`;
export const LogoIcon = styled.div` font-size: 2.5rem; margin-bottom: 8px; filter: drop-shadow(0 2px 4px rgba(0,0,0,.2)); `;
export const LogoText = styled.h2` color:#fff; font-size:1.1rem; font-weight:700; margin:0; text-shadow:0 2px 4px rgba(0,0,0,.3); `;
export const Floating = styled.div` position:absolute; inset:0; pointer-events:none; `;
const FloatBase = styled.div` position:absolute; font-size:1.2rem; opacity:.7; animation:${floatKF} 4s ease-in-out infinite; `;
export const Heart = styled(FloatBase)` top:20%; left:10%; animation-delay:0s; `;
export const Star  = styled(FloatBase)` top:15%; right:15%; animation-delay:1s; `;
export const Music = styled(FloatBase)` bottom:40%; left:15%; animation-delay:2s; `;
export const Sparkle = styled(FloatBase)` bottom:30%; right:10%; animation-delay:3s; `;

/* =======================
 * Copy blocks (StartPage 설명문)
 * ======================= */
export const DescriptionSection = styled.div` text-align:center; `;
export const MainDescription = styled.h3`
  font-size:1.3rem; font-weight:600; color:${({theme})=>theme.color.textStrong}; line-height:1.4; margin:0 0 25px;
`;
export const Highlight = styled.span`
  background: linear-gradient(135deg, #667eea, #a78bfa);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:700;
`;
export const TestInfo = styled.div` display:flex; justify-content:center; gap:15px; margin-bottom:20px; `;
export const Pill = styled.div` background:${({theme})=>theme.grad.pill}; color:#fff; padding:8px 16px; border-radius:20px; font-size:.85rem; font-weight:500; display:flex; align-items:center; gap:6px; box-shadow:${({theme})=>theme.shadow.pill}; `;
export const InfoIcon = styled.span` font-size:1rem; `;
export const SubDescription = styled.p` font-size:.9rem; color:${({theme})=>theme.color.textMuted}; line-height:1.5; margin:0; `;

/* =======================
 * Q&A layout (질문/선택지 레이아웃)
 * ======================= */
export const PageIndicator = styled.div` color:#999; font-size:12px; `;
export const QuestionSection = styled.div` text-align:center; margin-bottom:60px; `;
export const QuestionText = styled.h2`
  font-size:17px; font-weight:500; color:#333; line-height:1.4;
  margin:40px; /* 질문 텍스트와 주변 여백 */
`;
export const OptionsCol = styled.div` display:flex; flex-direction:column; gap:15px; margin-bottom:40px; `;

/* =======================
 * Result blocks (결과 화면)
 * ======================= */
export const CharacterSection = styled.div` text-align:center; margin-bottom:20px; `;
export const CharacterImageBox = styled.div` display:inline-block; border:3px solid ${({theme})=>theme.color.primary}; border-radius:12px; overflow:hidden; margin-bottom:15px; `;
export const CharacterImg = styled.img` width:200px; height:200px; object-fit:cover; display:block; `;
export const Placeholder = styled.div` width:200px; height:200px; display:grid; place-items:center; background:#eef1ff; color:#667eea; font-size:48px; `;

export const CharacterInfo = styled.div` text-align:center; margin-bottom:20px; `;
export const CharacterName = styled.h2` font-size:20px; font-weight:600; color:#333; margin:0 0 10px; `;
export const PersonalityTag = styled.span`
  background:${({theme})=>theme.color.warnBg}; color:${({theme})=>theme.color.warnText};
  padding:8px 12px; border-radius:6px; font-size:13px; display:inline-block; border:1px solid ${({theme})=>theme.color.warnBorder};
`;
export const ResultDescWrap = styled.div` background:#fff; border-radius:8px; padding:20px 15px; margin-bottom:20px; `;
export const ResultDesc = styled.p` font-size:14px; color:#333; line-height:1.5; margin:0 0 15px; text-align:center; `;
export const Details = styled.div` margin-bottom:15px; `;
export const DetailItem = styled.p` font-size:13px; color:#666; line-height:1.6; margin:0 0 8px; text-align:left; `;
export const AdditionalInfo = styled.div` border-top:1px solid #eee; padding-top:15px; `;
export const InfoLine = styled.p` font-size:13px; color:#666; line-height:1.5; margin:0 0 5px; `;

// 결과 화면의 "다시하기" 버튼
export const RetryBtn = styled.button`
  width:100%; background:#6c757d; color:#fff; border:none; border-radius:25px;
  padding:12px 20px; font-size:14px; font-weight:500; cursor:pointer; transition: background .2s ease;
  &:hover{ background:#5a6268; }
`;
