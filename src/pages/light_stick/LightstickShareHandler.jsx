// 역할: 커스텀 페이지에서 전달된 "현재 설정"을 서버에 저장(스티커 제외)하고
//       반환된 code로 글쓰기 페이지로 라우팅한다.

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** 0~1 범위로 고정 */
const clamp01 = (n) => Math.min(1, Math.max(0, Number(n)));

/** 유효한 페이로드만 추려서(스티커 관련 제외) 서버로 보낼 최종 JSON 생성 */
function sanitizePayload(input) {
  if (!input || typeof input !== "object") return null;

  const out = {
    schemaVersion: 1,
    clientTs: Date.now(),

    // 형태
    capShape: input.capShape ?? "sphere",
    thickness: input.thickness ?? "thin",
    bodyLength: input.bodyLength ?? "short",

    // 색상
    bodyColor: input.bodyColor ?? "#ffffff",
    capColor: input.capColor ?? "#ffffff",

    // 재질
    metallic: clamp01(input.metallic ?? 0.25),
    roughness: clamp01(input.roughness ?? 0.0),
    transmission: clamp01(input.transmission ?? 0.5),

    // 피규어
    figureUrl: input.figureUrl || null,
  };

  return out;
}

export default function LightstickShareHandler() {
  const navigate = useNavigate();
  const { state } = useLocation(); // 커스텀 페이지에서 navigate(..., { state })로 전달한 값
  const [error, setError] = useState("");

  // 전달받은 state에서 서버 전송용 페이로드 생성
  const payload = useMemo(() => sanitizePayload(state), [state]);

  useEffect(() => {
    // 페이로드가 없으면 커스텀 페이지로 되돌리기
    if (!payload) {
      setError("설정 정보가 없습니다. 커스텀 페이지에서 다시 시도해 주세요.");
      // 필요 시 라우팅 경로 수정
      const timer = setTimeout(() => navigate("/lightstick/custom", { replace: true }), 1200);
      return () => clearTimeout(timer);
    }

    // 1) 서버 저장 → 2) code 수신 → 3) 글쓰기로 이동
    let aborted = false;

    (async () => {
      try {
        const res = await fetch("/api/lightstick/shares", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include", // 세션/쿠키 사용 시
        });

        if (!res.ok) {
          let msg = "서버 저장에 실패했습니다.";
          try {
            const err = await res.json();
            if (err?.message) msg = err.message;
          } catch {}
          throw new Error(msg);
        }

        const data = await res.json();
        const code = data?.code;
        if (!code) throw new Error("공유 코드가 응답에 없습니다.");

        if (!aborted) {
          // 글쓰기 페이지로 이동(경로는 프로젝트에 맞게 조정)
          navigate(`/write?code=${encodeURIComponent(code)}`, { replace: true });
        }
      } catch (e) {
        if (!aborted) {
          console.error(e);
          setError(e.message || "네트워크 오류로 공유에 실패했습니다.");
        }
      }
    })();

    return () => {
      aborted = true;
    };
  }, [navigate, payload]);

  // 간단한 상태 UI (원하면 디자인을 입혀도 됨)
  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h2 style={{ margin: 0 }}>공유 실패</h2>
        <p style={{ marginTop: 8, color: "#ef4444" }}>{error}</p>
        <button style={{ marginTop: 12 }} onClick={() => navigate(-1)}>
          뒤로 가기
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ margin: 0 }}>공유 준비 중…</h2>
      <p style={{ marginTop: 8, color: "#64748b" }}>
        설정을 저장한 뒤 글쓰기 페이지로 이동합니다.
      </p>
    </div>
  );
}
