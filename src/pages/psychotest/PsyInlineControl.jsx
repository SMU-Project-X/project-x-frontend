// src/pages/psychotest/PsyInlineControl.jsx
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { ptTheme } from "./ptTheme";
import { StartPage, QuestionPage, ResultPage } from "./PsyComponent.jsx";

/**
 * PsyInlineControl
 * - 외부에서 open/onClose로 제어하는 모달 컨트롤러
 * - 프론트에서 모든 로직을 계산하고, 백엔드에는
 *   "질문별 선택 번호 + 추천 아이돌"만 전송할 예정
 */
export default function PsyInlineControl({ open, onClose }) {
  const [step, setStep] = useState("start");
  const [result, setResult] = useState(null);

  if (!open) return null;

  const handleStart = () => setStep("questions");

  const handleComplete = ({ answers }) => {
    // 1) 프론트에서 점수 계산 (주 성격 +1, 반대 성격 -0.5)
    const computed = deriveResultFromAnswers(answers);
    setResult(computed);
    setStep("result");

    // 2) (선택) 백엔드 전송 페이로드 예시 — 필요 시 주석 해제
    /*
    const payload = {
      selections: answers.map(a => ({ qid: a.id, opt: a.choice })),
      recommend: {
        idolId: computed.characterName,        // 아이돌 식별자(이름 그대로)
        trait: computed.personality            // 1순위 성격
      }
    };
    fetch("/api/psytest/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    */
  };

  const handleRetry = () => {
    setResult(null);
    setStep("start");
  };

  const closeAll = () => {
    setResult(null);
    setStep("start");
    onClose?.();
  };

  return (
    <ThemeProvider theme={ptTheme}>
      {step === "start" && <StartPage onStart={handleStart} onClose={closeAll} />}
      {step === "questions" && (
        <QuestionPage onClose={closeAll} onComplete={handleComplete} />
      )}
      {step === "result" && (
        <ResultPage result={result} onRetry={handleRetry} onClose={closeAll} />
      )}
    </ThemeProvider>
  );
}

/* ============================================================
 * 점수 계산 로직
 * - 규칙: 주 성격 +1, 상반(반대) 성격 -0.5
 * - 11문항, 각 문항 5지선다
 * - 1순위/2순위 성격을 뽑아 1순위 성격과 매칭된 아이돌 추천
 * ============================================================ */

/** 상반(반대) 성격 정의 */
const TRAIT_OPPOSITES = {
  "귀여움": "카리스마",
  "카리스마": "귀여움",
  "상냥함": "도도함",
  "도도함": "상냥함",
  "차분함": "열정",
  "열정": "차분함",
  "지성미": "장난기",
  "장난기": "지성미",
  "시크함": "사랑스러움",
  "사랑스러움": "시크함",
  "신비로움": "리더십",
  "리더십": "신비로움"
};

/** 결과 매핑: 1순위 성격 → 추천 아이돌 이름 */
const TRAIT_TO_IDOL = {
  "신비로움": "류하",
  "상냥함": "다온",
  "장난기": "채윤",
  "열정": "세라",
  "도도함": "수린",
  "귀여움": "모아",
  "리더십": "지원",
  "지성미": "세인",
  "시크함": "아린",
  "차분함": "현",
  "카리스마": "가온",
  "사랑스러움": "유나"
};

/** 문항별: 보기 인덱스 → 주 성격 매핑 (0~4) */
const MAIN_TRAITS = {
  1: ["지성미","열정","장난기","차분함","귀여움"],
  2: ["상냥함","도도함","장난기","차분함","신비로움"],
  3: ["열정","시크함","상냥함","신비로움","귀여움"],
  4: ["열정","리더십","차분함","장난기","카리스마"],
  5: ["신비로움","카리스마","귀여움","도도함","사랑스러움"],
  6: ["상냥함","장난기","지성미","신비로움","카리스마"],
  7: ["상냥함","지성미","장난기","열정","차분함"],
  8: ["시크함","도도함","상냥함","열정","귀여움"],
  9: ["지성미","차분함","열정","신비로움","사랑스러움"],
  10:["귀여움","열정","차분함","신비로움","지성미"], // 계절
  11:["카리스마","상냥함","시크함","귀여움","지성미"] // 목소리
};

/** 점수 계산 + 결과 도출 */
function deriveResultFromAnswers(answers = []) {
  // 1) 초기 점수판
  const traits = Object.keys(TRAIT_TO_IDOL);
  const scores = Object.fromEntries(traits.map(t => [t, 0]));

  // 2) 각 문항의 선택에 따라 점수 반영 (주 +1, 반대 -0.5)
  answers.forEach(({ id, choice }) => {
    const main = MAIN_TRAITS[id]?.[choice];
    if (!main) return;
    scores[main] += 1;

    const opp = TRAIT_OPPOSITES[main];
    if (opp) scores[opp] -= 0.5;
  });

  // 3) 점수 정렬 → 상위 1, 2 순위 도출 (동점 시 trait명 알파벳/가나다순 보조)
  const sorted = Object.entries(scores)
    .sort((a,b) => {
      if (b[1] === a[1]) return a[0].localeCompare(b[0]); // tie-break: 이름순
      return b[1] - a[1];
    })
    .map(([t]) => t);

  const top1 = sorted[0];
  const top2 = sorted[1];

  // 4) 1순위 성격 → 추천 아이돌 + 이미지 경로
  const idolName = TRAIT_TO_IDOL[top1];
  // public/Character/이름.png (공백/특수문자 대비 인코딩)
  const imgPath = `/Character/${encodeURIComponent(idolName)}.png`;

  return {
    characterImage: imgPath,
    characterName: idolName,
    personality: top1,
    topTraits: [top1, top2],

    // (옵션) 추가 텍스트/디테일 필요 시 확장 가능
    description: "",   // 지금은 빈값으로 둠
    details: []
  };
}
