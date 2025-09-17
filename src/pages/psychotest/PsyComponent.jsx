// src/pages/psychotest/PsyComponent.jsx
import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components"; // [CHANGED] 로딩 스피너용 keyframes/스타일 추가

import {
  ModalContainerWrap, TestModal, Header, Title, CloseButton, ProgressInfo,
  Content, Footer, StartButton, ButtonContent, ButtonText, ButtonIcon, ButtonGlow,
  HeroWrap, LogoContainer, LogoIcon, LogoText, Floating, Heart, Star, Music, Sparkle,
  DescriptionSection, MainDescription, Highlight, TestInfo, Pill, InfoIcon, SubDescription,
  Progress, ProgressFill, OptionBtn, NavBtn, PageIndicator, QuestionSection, QuestionText, OptionsCol,
  CharacterSection, CharacterImageBox, CharacterImg, Placeholder,
  CharacterInfo, CharacterName, PersonalityTag, ResultDescWrap, ResultDesc, Details, DetailItem, AdditionalInfo, InfoLine,
  RetryBtn,
} from "./ptStyled";

/* =========================================
 * 페이지 컴포넌트
 * - Start / Question / Result
 * - PsyInlineControl.jsx에서 단계 전환 로직으로 렌더
 * ========================================= */

/** Start: 소개 + CTA */
export function StartPage({ onStart, onClose }) {
  return (
    <ModalContainer titleId="pt-title">
      <HeaderBar titleId="pt-title" title="나의 최애 버추얼 아이돌 찾기" onClose={onClose} />
      <Content>
        <Hero />
        <DescriptionSection>
          <MainDescription>
            심리테스트로 찾는<br />
            <Highlight>나의 최애 버추얼 아이돌</Highlight>
          </MainDescription>
          {/* 테스트 소요/문항 수 pill */}
          <TestInfo aria-hidden>
            <Pill><InfoIcon>⏱️</InfoIcon><span>약 1분</span></Pill>
            <Pill><InfoIcon>📝</InfoIcon><span>11문항</span></Pill>
          </TestInfo>
          <SubDescription>
            12가지 매력적인 성격 유형 중에서<br />
            당신과 가장 잘 맞는 캐릭터를 찾아드려요
          </SubDescription>
        </DescriptionSection>
      </Content>
      <FooterBar><StartCtaButton onClick={onStart} /></FooterBar>
    </ModalContainer>
  );
}

/** Questions: 질문/선택/진행도/내비게이션 */
export function QuestionPage({ onClose, onComplete }) {
  // [CHANGED] 질문 스키마: 5지선다 (문항 11개)
  const questions = useMemo(() => ([
    {
      id: 1,
      question: "여행을 가기 전날, 네 모습은?",
      options: [
        "꼼꼼히 계획표를 다 짜둔다",
        "설레서 텐션이 올라 잠 못 잔다",
        "즉흥적으로 즐기면 되지~",
        "챙길 건 챙기되 여유롭게 쉰다",
        "누가 챙겨주길 기다린다"
      ]
    },
    {
      id: 2,
      question: "버스 자리가 동시에 겹쳤다 그때 나는?",
      options: [
        "웃으며 양보한다",
        "먼저 앉아버린다",
        "농담하며 가위바위보 제안",
        "그냥 다른 자리 찾아본다",
        "의미심장하게 미소만 짓는다"
      ]
    },
    {
      id: 3,
      question: "휴대폰 배경화면으로 고른다면?",
      options: [
        "불타는 붉은 이미지",
        "단정한 흑백 사진",
        "따뜻한 햇살 사진",
        "몽환적인 일러스트",
        "귀여운 캐릭터 짤"
      ]
    },
    {
      id: 4,
      question: "팀플 과제를 할 때 나는?",
      options: [
        "맡은 파트를 제일 빨리 끝낸다",
        "전체를 총괄하고 마무리한다",
        "묵묵히 자기 파트만 한다",
        "분위기를 풀어준다",
        "발표 때 강렬한 임팩트를 남긴다"
      ]
    },
    {
      id: 5,
      question: "공연 조명 색을 네가 고른다면?",
      options: [
        "라일락/은은한 보라",
        "강렬한 레드/블랙",
        "파스텔 핑크",
        "화이트/실버 톤",
        "오렌지/옐로우 톤"
      ]
    },
    {
      id: 6,
      question: "SNS에 네가 주로 올리는 건?",
      options: [
        "일상 사진 + 따뜻한 멘트",
        "짧고 웃긴 밈",
        "자기계발/공부 기록",
        "미스터리한 사진/글귀",
        "무대 위 포즈컷"
      ]
    },
    {
      id: 7,
      question: "친구가 고민 상담을 할 때, 너는?",
      options: [
        "다정히 들어주고 위로한다",
        "해결책을 논리적으로 제시한다",
        "농담으로 기분을 풀어준다",
        "강하게 독려한다",
        "묵묵히 곁에 있어준다"
      ]
    },
    {
      id: 8,
      question: "첫인상으로 많이 듣는 말은?",
      options: [
        "차갑고 쿨하다",
        "당당하다",
        "따뜻하다",
        "활발하다",
        "귀엽다"
      ]
    },
    {
      id: 9,
      question: "하루 종일 비가 오는 날, 넌?",
      options: [
        "카페에 앉아 책 읽기",
        "빗소리 들으며 낮잠",
        "우산 없이 뛰어다니기",
        "음악 들으며 창가에 앉기",
        "우산 씌워주며 같이 걷기"
      ]
    },
    {
      id: 10,
      question: "네가 가장 좋아하는 계절은?",
      options: [
        "봄 — 설레고 따뜻한 새출발",
        "여름 — 뜨겁고 활발한 에너지",
        "가을 — 차분하고 감성적인 분위기",
        "겨울 — 고요하고 신비로운 무드",
        "계절 상관없이 늘 같은 루틴"
      ]
    },
    {
      id: 11,
      question: "아이돌의 목소리 중 가장 끌리는 건?",
      options: [
        "카리스마 넘치는 파워 보컬",
        "부드럽고 따뜻한 미성",
        "낮고 시크한 톤",
        "귀엽고 개성 있는 목소리",
        "안정적이고 지적인 톤"
      ]
    }
  ]), []);
  const totalQuestions = questions.length;

  // 진행 상태/선택/답안 스토리지
  // [CHANGED] selected를 옵션 인덱스(number)로 관리
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  // [CHANGED] 결과 전 로딩 단계 컨트롤
  const [isLoading, setIsLoading] = useState(false);

  const current = questions[index];
  const progress = Math.round(((index + 1) / totalQuestions) * 100);

  // [CHANGED] 다음 버튼 핸들러
  const handleNext = () => {
    if (selected === null || selected === undefined) return;
    const newAnswers = [...answers];
    newAnswers[index] = { id: current.id, choice: selected }; // choice: number(0~4)
    setAnswers(newAnswers);

    if (index < totalQuestions - 1) {
      setIndex((i) => i + 1);
      setSelected(newAnswers[index + 1]?.choice ?? null);
    } else {
      // 마지막 문항 → 로딩 표시 후 onComplete
      setIsLoading(true);
      setTimeout(() => {
        onComplete?.({ answers: newAnswers }); // 프론트에서 전부 계산 (스프링엔 선택/추천만 보낼 예정)
      }, 800); // 필요 시 연출 시간 조절
    }
  };

  // 이전
  const handlePrev = () => {
    if (index === 0 || isLoading) return;
    const prev = index - 1;
    setIndex(prev);
    setSelected(answers[prev]?.choice ?? null);
  };

  return (
    <ModalContainer titleId="ptq-title">
      <HeaderBar
        titleId="ptq-title"
        title="나의 최애 버추얼 아이돌 찾기"
        onClose={onClose}
        right={`질문 ${index + 1}/${totalQuestions}`}
      />
      <Content>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <ProgressBar value={progress} />
            <QuestionSection>
              <QuestionText>{current.question}</QuestionText>
            </QuestionSection>
            <OptionsCol>
              {current.options.map((opt, idx) => (
                <OptionButton
                  key={idx}
                  selected={selected === idx}
                  onClick={() => setSelected(idx)}
                >
                  {opt}
                </OptionButton>
              ))}
            </OptionsCol>
          </>
        )}
      </Content>
      <FooterBar style={{ display: "flex", gap: 8 }}>
        <NavButton onClick={handlePrev} disabled={index === 0 || isLoading}>
          이전
        </NavButton>
        <PageIndicator style={{ marginLeft: "auto", marginRight: "auto" }}>
          나만의 아이돌 찾기
        </PageIndicator>
        <NavButton
          onClick={handleNext}
          disabled={selected === null || isLoading}
        >
          {index === totalQuestions - 1 ? "결과" : "다음"}
        </NavButton>
      </FooterBar>
    </ModalContainer>
  );
}

/** Result: 결과 이미지/설명/재시작 */
export function ResultPage({ result, onRetry, onClose }) {
  // [CHANGED] 결과 데이터 구조 업데이트:
  // - characterImage: "/Character/아이돌이름.png"
  // - characterName: 아이돌 이름
  // - personality: 1순위 성격
  // - topTraits: [1순위, 2순위] (그냥 나열)
  const data = result ?? {
    characterImage: "",
    characterName: "Ironmouse",
    personality: "열정",
    topTraits: ["열정", "카리스마"],
    description: "",
    details: [],
  };

  return (
    <ModalContainer titleId="ptr-title">
      <HeaderBar titleId="ptr-title" title="나의 최애 버추얼 아이돌 찾기" onClose={onClose} />
      <Content>
        <CharacterSection>
          <CharacterImage src={data.characterImage} alt={data.characterName} />
        </CharacterSection>
        <ResultInfo
          name={data.characterName}
          personality={data.personality}
          topTraits={data.topTraits}       // [CHANGED] TOP2 전달
          description={data.description}
          details={data.details}
          compatibility={data.compatibility}
          similar={data.similar}
          others={data.others}
        />
      </Content>
      <FooterBar><RetryBtn onClick={onRetry}>테스트 다시하기</RetryBtn></FooterBar>
    </ModalContainer>
  );
}

/* =========================================
 * 공통 JSX 조각
 * ========================================= */

function ModalContainer({ titleId, children }) {
  return (
    <ModalContainerWrap role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <TestModal>{children}</TestModal>
    </ModalContainerWrap>
  );
}

function HeaderBar({ titleId, title, onClose, right }) {
  return (
    <Header>
      <CloseButton onClick={onClose} aria-label="닫기">×</CloseButton>
      <Title id={titleId}>{title}</Title>
      {right ? <ProgressInfo>{right}</ProgressInfo> : null}
    </Header>
  );
}

function FooterBar({ children, style }) { return <Footer style={style}>{children}</Footer>; }

function ProgressBar({ value }) {
  return (
    <Progress value={value}>
      <ProgressFill value={value} />
    </Progress>
  );
}

// OptionBtn은 ptStyled.js의 transient prop($selected) 사용
function OptionButton({ selected, onClick, children }) {
  return <OptionBtn $selected={selected} onClick={onClick}>{children}</OptionBtn>;
}

function NavButton({ disabled, onClick, children }) {
  return <NavBtn onClick={onClick} disabled={disabled}>{children}</NavBtn>;
}

function StartCtaButton({ onClick, label="테스트 시작하기" }) {
  return (
    <StartButton onClick={onClick}>
      <ButtonContent>
        <ButtonText>{label}</ButtonText>
        <ButtonIcon aria-hidden>→</ButtonIcon>
      </ButtonContent>
      <ButtonGlow aria-hidden />
    </StartButton>
  );
}

// [NOTE] ResultPage에서 사용하는 내부 프리젠테이션 컴포넌트
function CharacterImage({ src, alt }) {
  const has = src && src.trim().length > 0;
  return (
    <CharacterImageBox>
      {has ? <CharacterImg src={src} alt={alt} /> : <Placeholder aria-label="이미지 없음">🙂</Placeholder>}
    </CharacterImageBox>
  );
}

function ResultInfo({ name, personality, topTraits=[], description, details=[], compatibility, similar, others }) {
  return (
    <div>
      <CharacterInfo>
        <CharacterName>{name}</CharacterName>
        {personality ? <PersonalityTag>당신에 최애 성격은 : {topTraits.join(" / ")}</PersonalityTag> : null}
      </CharacterInfo>

      
      {Array.isArray(topTraits) && topTraits.length > 0 && (
        <ResultDescWrap>
          
        </ResultDescWrap>
      )}

      <ResultDescWrap>
        {description ? <ResultDesc>{description}</ResultDesc> : null}
        {Array.isArray(details) && details.length > 0 && (
          <Details>{details.map((d,i)=>(<DetailItem key={i}>{d}</DetailItem>))}</Details>
        )}
        {(compatibility || similar || others) && (
          <AdditionalInfo>
            {compatibility && <InfoLine>• {compatibility}</InfoLine>}
            {similar && <InfoLine>• {similar}</InfoLine>}
            {others && <InfoLine>{others}</InfoLine>}
          </AdditionalInfo>
        )}
      </ResultDescWrap>
    </div>
  );
}

function Hero() {
  return (
    <HeroWrap>
      <LogoContainer aria-hidden="true">
        <LogoIcon>🧠</LogoIcon>
        <LogoText>심리 테스트</LogoText>
      </LogoContainer>
      <Floating aria-hidden="true">
        <Heart>💖</Heart><Star>✨</Star><Music>🎵</Music><Sparkle>💫</Sparkle>
      </Floating>
    </HeroWrap>
  );
}

/* =========================================
 * 로딩 스크린 (ptStyled.js 수정 없이, 이 파일 내부에서만 정의)
 * ========================================= */

// [CHANGED] 로딩 스피너 애니메이션
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// [CHANGED] 로딩 스피너 스타일
const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #eee;
  border-top-color: #4a90e2;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

// [CHANGED] 로딩 화면 컴포넌트
function LoadingScreen() {
  return (
    <div style={{
      height: "500px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Spinner />
      <p style={{ marginTop: 16, fontSize: "1.05rem", color: "#555" }}>
        당신의 결과를 분석중...
      </p>
    </div>
  );
}
