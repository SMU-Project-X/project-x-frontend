// - 프론트에서 점수 계산 및 설명 자동 생성
// - 백엔드에는 (질문id, 선택번호) + (추천 아이돌)만 전송
import { useState } from "react";
import { StartPage, QuestionPage, ResultPage } from "./PsyComponent.jsx";

export default function PsyInlineControl({ open, onClose }) {
  const [step, setStep] = useState("start");
  const [result, setResult] = useState(null);

  if (!open) return null;

  const handleStart = () => setStep("questions");

  const handleComplete = ({ answers }) => {
    const computed = deriveResultFromAnswers(answers);
    setResult(computed);
    setStep("result");

    // 백엔드 전송 ( 없어도 프론트에 영향없음 )
    try {
      const topTrait = computed?.topTraits?.[0]; // 예: "신비로움"
      if (topTrait) {
        fetch("/api/psytest/hit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trait: topTrait })
        }).catch(() => {}); // 네트워크 오류 무시 (결과 화면 유지)
      }
    } catch (e) {
      // 전송 오류는 콘솔만 찍고 무시
      console.warn("[psytest/hit] send error:", e);
    }
  };

  const handleRetry = () => { setResult(null); setStep("start"); };
  const closeAll = () => { setResult(null); setStep("start"); onClose?.(); };

  return (
    <>
      {step === "start" && <StartPage onStart={handleStart} onClose={closeAll} />}
      {step === "questions" && <QuestionPage onClose={closeAll} onComplete={handleComplete} />}
      {step === "result" && <ResultPage result={result} onRetry={handleRetry} onClose={closeAll} />}
    </>
  );
}

/* ============================================================
 * 점수 계산 & 결과 설명 생성
 * - 답변 선택 시 : 주 성향 +1, 반대 성향 -0.5
 * ============================================================ */

// 반대 성향 정의
const TRAIT_OPPOSITES = {
  "귀여움": "카리스마",   "카리스마": "귀여움",
  "상냥함": "도도함",     "도도함": "상냥함",
  "차분함": "열정",       "열정": "차분함",
  "지성미": "장난기",     "장난기": "지성미",
  "시크함": "사랑스러움", "사랑스러움": "시크함",
  "신비로움": "리더십",   "리더십": "신비로움"
};

// 1순위 성향 → 추천 아이돌
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

// 문항별 보기(0~4) → 주 성향
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
  10:["귀여움","열정","차분함","신비로움","지성미"],
  11:["카리스마","상냥함","시크함","귀여움","지성미"]
};

// 성향별 짧은 설명
const EXPLAIN_BASE = {
  "귀여움":    "밝고 친근한 무드와 자연스러운 호감형 에너지가 두드러져요.",
  "상냥함":    "섬세한 공감과 따뜻한 배려가 강점으로 읽혀요.",
  "장난기":    "재치와 유머로 분위기를 환기하는 센스가 돋보여요.",
  "카리스마":  "장면을 단번에 장악하는 중심감과 임팩트를 선호해요.",
  "도도함":    "절제와 품격, 당당한 태도를 중시하는 미감이에요.",
  "시크함":    "감정 과잉보다 절제된 쿨톤의 균형을 선호해요.",
  "차분함":    "흔들림 없는 안정감과 꾸준한 페이스가 강점이에요.",
  "열정":      "즉각 몰입과 추진력, 무대형 에너지가 뚜렷해요.",
  "지성미":    "계획·분석·구조에서 오는 안정감을 중시해요.",
  "신비로움":  "직설보다 여운과 분위기, 몽환적인 텍스처를 선호해요.",
  "사랑스러움":"로맨틱하고 다정한 교감의 결을 좋아해요.",
  "리더십":    "흐름을 설계하고 중심을 잡는 드라이브가 강해요."
};

// 점수 계산 + 결과 도출(아이돌/이미지/설명)
function deriveResultFromAnswers(answers = []) {
  // 1) 초기 점수판
  const traits = Object.keys(TRAIT_TO_IDOL);
  const scores = Object.fromEntries(traits.map(t => [t, 0]));

  // 2) 가중치 누적 (주 +1, 반대 -0.5)
  answers.forEach(({ id, choice }) => {
    const main = MAIN_TRAITS[id]?.[choice];
    if (!main) return;
    scores[main] += 1;
    const opp = TRAIT_OPPOSITES[main];
    if (opp) scores[opp] -= 0.5;
  });

  // 3) 정렬 → 상위 성향 2개 (동점 시 이름순)
  const sorted = Object.entries(scores)
    .sort((a,b) => (b[1] === a[1] ? a[0].localeCompare(b[0]) : b[1] - a[1]))
    .map(([t]) => t);
  const top1 = sorted[0];
  const top2 = sorted[1];

  // 4) 추천 아이돌 + 이미지 경로 + 설명
  const idolName = TRAIT_TO_IDOL[top1];
  const imgPath = `/Character/${encodeURIComponent(idolName)}.png`;
  const base = EXPLAIN_BASE[top1] || "당신의 선택에서 돋보이는 무드가 있어요.";
  const description = `${base}\n그래서 ‘${idolName}’의 ${top1} 무드가 특히 잘 어울립니다.`;

  return {
    characterImage: imgPath,
    characterName: idolName,
    topTraits: [top1, top2],
    description
  };
}
