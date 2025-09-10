// src/pages/psychotest/PsyInlineControl.jsx
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { ptTheme } from "./ptTheme"; // 기존 테마 사용
import { StartPage, QuestionPage, ResultPage } from "./PsyComponent.jsx";

/**
 * PsyInlineControl
 * - 외부에서 open/onClose로 제어하는 "모달 전용" 컨트롤러
 * - 라우팅 없이 현재 페이지 위에 Start → Questions → Result 모달을 띄움
 */
export default function PsyInlineControl({ open, onClose }) {
  const [step, setStep] = useState("start"); // 호출 즉시 Start부터
  const [result, setResult] = useState(null);

  // 모달이 닫혀야 할 때는 렌더 자체를 막아 오버레이 제거
  if (!open) return null;

  const handleStart = () => setStep("questions");

  const handleComplete = ({ answers }) => {
    const computed = deriveResultFromAnswers(answers);
    setResult(computed);
    setStep("result");
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
      {/* 오버레이/모달은 PsyComponent의 각 페이지가 자체적으로 렌더 */}
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

/** 간단한 더미 결과 계산 로직 */
function deriveResultFromAnswers(answers = []) {
  const score = answers.reduce((acc, a) => acc + (a?.choice === "A" ? 1 : -1), 0);
  const isA = score >= 0;
  return {
    characterImage: "",
    characterName: isA ? "에리나" : "리나에",
    personality: isA ? "상냥함" : "시크함",
    description: isA ? "항상 밝고 다정하다." : "절제된 매력과 차분한 카리스마.",
    details: [],
  };
}
