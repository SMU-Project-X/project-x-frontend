import styled, { keyframes } from "styled-components";

/* ============================================================================
 * - ThemeProvider 없이도 동작하도록 색상/그라디언트/그림자 값을 상수로 보관
 * - 디자인 토큰처럼 재사용하며, 컴포넌트에서 직접 참조한다(예: ${PT.color.primary}).
 * - 토큰 값을 바꾸면 전체 컴포넌트에 일괄 반영
 * ========================================================================== */
const PT = {
  color: {
    surface: "#fff",        // 카드/모달의 표면 배경색
    textStrong: "#2c3e50",  // 진한 본문 텍스트 색
    textMuted: "#666",      // 보조 설명 텍스트 색
    white: "#fff",
    primary: "#4a90e2",     // 주 브랜드 색(버튼/테두리 등)
    dark2: "#2c2c2c",
    dark3: "#3c3c3c",
    // 경고/하이라이트 톤(태그 등)
    warnBg: "#fff3cd",
    warnText: "#856404",
    warnBorder: "#ffeaa7",
  },
  grad: {
    // 상단 헤더/CTA 영역의 메인 그라디언트
    header: "linear-gradient(135deg, #87b2d4 0%, #8aa7ff 52%, #a78bfa 100%)",
    // 히어로 로고 박스 배경
    hero:   "linear-gradient(135deg, #667eea 0%, #a78bfa 100%)",
    // CTA 버튼에 사용하는 포괄적 그라디언트(현재 header와 동일 톤 사용)
    cta:    "linear-gradient(135deg, #667eea 0%, #a78bfa 60%, #f0abfc 100%)",
    // 작은 알약형 배지(Pill) 배경
    pill:   "linear-gradient(135deg, #8ed0ff 0%, #7aa5ff 45%, #9a8bff 100%)",
    // 진행도 바(Progress) 채움 색
    progress:"linear-gradient(135deg, #667eea 0%, #a78bfa 100%)",
  },
  shadow: {
    // 모달 카드 외곽 그림자(살짝 떠보이게)
    modal: "0 20px 60px rgba(0,0,0,.15), 0 0 0 1px rgba(255,255,255,.8)",
    // 히어로 로고 박스 전용 그림자
    logo: "0 10px 30px rgba(24, 41, 194, 0.25)",
    // Pill 배지 전용 그림자
    pill: "0 4px 15px rgba(0,0,0,0.15)",
    // CTA 버튼 기본/호버 그림자
    cta: "0 8px 25px rgba(102,126,234,.4)",
    ctaHover: "0 12px 35px rgba(102,126,234,.5)",
  },
};

/* ============================================================================
 * Keyframes: 재사용 애니메이션
 * - gradientShift: 배경 그라디언트가 좌우로 흐르는 효과
 * - shine: 로고 위로 비친 빛이 지나가는 효과
 * - floatKF: 이모지가 살짝 떠다니는 효과
 * ========================================================================== */
export const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;
export const shine = keyframes`
  0%{transform:translateX(-100%)}
  50%{transform:translateX(100%)}
  100%{transform:translateX(100%)}
`;
export const floatKF = keyframes`
  0%,100%{ transform: translateY(0) rotate(0) }
  25%{ transform: translateY(-8px) rotate(2deg) }
  50%{ transform: translateY(-4px) rotate(-1deg) }
  75%{ transform: translateY(-6px) rotate(1deg) }
`;

/* ============================================================================
 * 레이아웃(모달 뼈대)
 * - 전체 화면 오버레이, 모달 카드, 헤더/본문/푸터로 구성
 * - 접근성: role, aria-*는 상위 JSX(PsyComponent)에서 부여
 * ========================================================================== */
export const ModalContainerWrap = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,.6);         /* 반투명 블러 오버레이 */
  display:flex; justify-content:center; align-items:center;
  z-index:1000; backdrop-filter: blur(8px);
`;
export const TestModal = styled.div`
  background: linear-gradient(145deg, #ffffff, ${PT.color.surface});
  width:90%; max-width:400px;         /* 모바일 우선: 최대 400px 카드 */
  height:85vh; max-height:700px;      /* 뷰포트 대비 높이 제한(스크롤 발생) */
  border-radius:20px; display:flex; flex-direction:column;
  overflow:hidden; position:relative;
  box-shadow:${PT.shadow.modal};
  line-height: 1.4;

  /* 카드 위에 은은한 점무늬 질감(시각적 깊이용) */
  &::after{
    content:''; position:absolute; inset:0; pointer-events:none;
    background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px);
    background-size:6px 6px; mix-blend-mode: overlay; opacity:.35;
  }
`;
export const Header = styled.div`
  background:${PT.grad.header};
  background-size:180% 180%;
  padding:20px; text-align:center; position:relative; color:#fff; flex-shrink:0;

  /* 헤더 호버 시 그라디언트가 천천히 흐르는 연출 */
  &:hover { animation:${gradientShift} 6s ease infinite; }
`;
export const Title = styled.h1`
  font-size:17px; font-weight:600; margin:0; text-shadow:0 2px 4px rgba(0,0,0,.1);
`;
export const CloseButton = styled.button`
  position:absolute; left:20px; top:50%; transform: translateY(-50%);
  background: rgba(255,255,255,.2); border:none; border-radius:50%;
  width:36px; height:36px; font-size:20px; color:#fff; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition: all .3s ease; backdrop-filter: blur(10px);

  /* 터치/마우스 오버 시 살짝 확대 */
  &:hover { background: rgba(255,255,255,.3); transform: translateY(-50%) scale(1.1); }
`;
export const ProgressInfo = styled.div`
  font-size:12px; color:#eee; margin-top:3px;
  position:absolute; right:20px; top:50%; transform: translateY(-50%);
`;
export const Content = styled.div`
  flex:1; padding:30px 25px 20px; overflow-y:auto; position:relative;

  /* 얇은 스크롤바(웹킷 계열), 모바일에선 기본 스크롤 사용 */
  &::-webkit-scrollbar { width:4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(102,126,234,.3); border-radius:2px; }
`;
export const Footer = styled.div`
  padding:25px; background: linear-gradient(to top, rgba(255,255,255,.9), transparent);
  flex-shrink:0;  /* 하단이 접히지 않도록 고정 */
`;

/* ============================================================================
 * 진행도 바(Progress)
 * - 접근성 속성(aria-*)을 attrs로 부여하여 스크린리더와 호환
 * ========================================================================== */
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
export const ProgressFill = styled.div`
  height:100%;
  width: ${({value}) => `${value}%`};
  background: ${PT.grad.progress};
  border-radius:999px; transition: width .25s ease; /* 값 변경 시 부드럽게 채움 */
`;

/* ============================================================================
 * 버튼류
 * - StartButton: CTA. 그라디언트/그림자/호버 애니메이션 포함
 * - OptionBtn: 질문 보기 버튼(선택 상태 색상 차등)
 * - NavBtn: 이전/다음 네비게이션
 * ========================================================================== */
export const StartButton = styled.button`
  width:100%;
  background:${PT.grad.header};
  background-size:200% 200%;
  border:none; border-radius:16px; padding:0; cursor:pointer; position:relative; overflow:hidden;
  box-shadow:${PT.shadow.cta}; transition:all .3s ease;

  &:hover { transform: translateY(-2px); box-shadow:${PT.shadow.ctaHover}; animation:${gradientShift} 3s ease infinite; }
  &:active { transform: translateY(0); }
`;
export const ButtonContent = styled.div`
  display:flex; align-items:center; justify-content:center; padding:16px 24px; color:#fff; position:relative; z-index:2;
`;
export const ButtonText = styled.span` font-size:1.1rem; font-weight:600; flex:1; text-align:center; `;
export const ButtonIcon = styled.span`
  font-size:1.3rem; transition: transform .3s ease;
  /* CTA 호버 시 화살표가 살짝 오른쪽으로 이동 */
  ${StartButton}:hover & { transform: translateX(4px); }
`;
export const ButtonGlow = styled.div`
  position:absolute; inset:0; left:-100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
  transition:left .6s ease;

  /* 광택이 좌→우로 지나가는 연출 */
  ${StartButton}:hover & { left: 100%; }
`;

export const OptionBtn = styled.button`
  /* 선택됨/기본 상태 색상 구분: 즉각적 피드백 */
  background: ${({$selected}) => ($selected ? '#87b2d4' : '#4a90e2')};
  color:#fff; border:none; border-radius:8px;
  padding:20px 16px; font-size:14px; line-height:1.4; text-align:left;
  cursor:pointer; transition:all .2s ease; min-height:60px; display:flex; align-items:center; width: 100%;
`;
export const NavBtn = styled.button`
  background:none; border:none; color:${PT.color.primary}; font-size:14px; cursor:pointer; padding:8px 12px; min-width:50px; text-align:center;
  &:disabled { color:#ccc; cursor:not-allowed; } /* 결과 계산 중 또는 첫 페이지에서 비활성화 */
`;

/* ============================================================================
 * 히어로 영역(Start 페이지 상단)
 * - 로고 상자/이모지 플로팅으로 시각적 몰입 제공
 * ========================================================================== */
export const HeroWrap = styled.div` text-align:center; margin-bottom:35px; position:relative; `;
export const LogoContainer = styled.div`
  background-image:
    radial-gradient(120% 90% at 85% -10%, rgba(255,255,255,.35) 0%, transparent 60%),
    ${PT.grad.hero};
  background-blend-mode: screen, normal;
  border-radius:20px; padding:25px; margin: 0 auto 20px; width: fit-content;
  box-shadow:${PT.shadow.logo}; position:relative; overflow:hidden;

  /* 상단을 가로지르는 빛줄기 애니메이션 */
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

/* ============================================================================
 * 설명/부가 카피
 * - 메인 타이틀/하이라이트/배지/보조 설명
 * ========================================================================== */
export const DescriptionSection = styled.div` text-align:center; `;
export const MainDescription = styled.h3`
  font-size:1.3rem; font-weight:600; color:${PT.color.textStrong}; line-height:1.4; margin:0 0 25px;
`;
export const Highlight = styled.span`
  background: linear-gradient(135deg, #667eea, #a78bfa);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:700;
`;
export const TestInfo = styled.div` display:flex; justify-content:center; gap:15px; margin-bottom:20px; `;
export const Pill = styled.div`
  background:${PT.grad.pill}; color:#fff; padding:8px 16px; border-radius:20px; font-size:.85rem; font-weight:500; display:flex; align-items:center; gap:6px; box-shadow:${PT.shadow.pill};
`;
export const InfoIcon = styled.span` font-size:1rem; `;
export const SubDescription = styled.p` font-size:.9rem; color:${PT.color.textMuted}; line-height:1.5; margin:0; `;

/* ============================================================================
 * Q&A 레이아웃
 * - 질문 텍스트, 보기 버튼 컬럼
 * ========================================================================== */
export const PageIndicator = styled.div` color:#999; font-size:12px; `;
export const QuestionSection = styled.div` text-align:center; margin-bottom:60px; `;
export const QuestionText = styled.h2`
  font-weight:500; color:#333; line-height:1.4; margin:40px;
`;
export const OptionsCol = styled.div` display:flex; flex-direction:column; gap:15px; margin-bottom:40px; `;

/* ============================================================================
 * 결과 화면(이미지/텍스트 블록)
 * - 상단 이미지와 설명 블록 간격은 CharacterSection/ResultDescWrap의 마진으로 조절
 * ========================================================================== */
export const CharacterSection = styled.div` text-align:center; margin-bottom:15px; `;
export const CharacterImageBox = styled.div`
  display:inline-block; border:3px solid ${PT.color.primary}; border-radius:12px; overflow:hidden; margin-bottom:0px; /* margin-collapse 방지 위해 0 */
`;
/* ▶ 결과 이미지 크기(정사각), object-fit으로 중앙 크롭 */
export const CharacterImg = styled.img`
  width:260px; height:260px; object-fit:cover; display:block;
`;
export const Placeholder = styled.div`
  width:260px; height:260px; display:grid; place-items:center; background:#eef1ff; color:#667eea; font-size:48px;
`;

export const CharacterInfo = styled.div` text-align:center; margin-bottom:10px; `;
export const CharacterName = styled.h2` font-size:22px; font-weight:700; color:#333; margin:0 0 6px; `;
export const PersonalityTag = styled.span`
  background:${PT.color.warnBg}; color:${PT.color.warnText};
  padding:8px 12px; border-radius:6px; font-size:13px; display:inline-block; border:1px solid ${PT.color.warnBorder};
`;

/* 결과 텍스트 박스
 * - 카드처럼 보이는 흰 배경 박스
 * - 두 블록(헤드라인/설명)을 동일 스타일로 감쌀 때 시각적으로 통일감 제공 */
export const ResultDescWrap = styled.div`
  background:#fff;
  border-radius:8px;
  padding:12px 14px;
  margin:8px 0;
`;

/* 설명 문단 스타일 */
export const ResultDesc = styled.p`
  font-size:14px; color:#333; line-height:1.6; margin:0 0 6px; text-align:center;
  white-space: pre-line;
  text-wrap: pretty;
  word-break: keep-all;
  letter-spacing: -0.2px;
`;

export const Details = styled.div` margin-bottom:15px; `;
export const DetailItem = styled.p` font-size:13px; color:#666; line-height:1.6; margin:0 0 8px; text-align:left; `;
export const AdditionalInfo = styled.div` border-top:1px solid #eee; padding-top:15px; `;
export const InfoLine = styled.p` font-size:13px; color:#666; line-height:1.5; margin:0 0 5px; `;

/* “다시하기” 버튼: 중립 톤의 Pill */
export const RetryBtn = styled.button`
  width:100%; background:#6c757d; color:#fff; border:none; border-radius:25px;
  padding:12px 20px; font-size:14px; font-weight:500; cursor:pointer; transition: background .2s ease;
  &:hover{ background:#5a6268; }
`;

/*
 * 로딩 상태(Spinner)
 * - 결과 계산 직전 짧은 연출 */
const spin = keyframes` to { transform: rotate(360deg); } `;
export const Spinner = styled.div`
  width: 48px; height: 48px;
  border: 4px solid #eee; border-top-color: #4a90e2; /* 상단만 컬러 → 회전 시 스피너로 보임 */
  border-radius: 50%; animation: ${spin} 1.2s linear infinite;
`;
export const LoadingWrap = styled.div`
  height: 500px; display:flex; flex-direction:column; align-items:center; justify-content:center;
`;
