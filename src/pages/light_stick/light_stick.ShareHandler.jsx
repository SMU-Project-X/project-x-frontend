// 목적: 서버 저장 → code 수신 → 게시판 이동 로직을 모듈로 분리
// 제공: 1) postLightstickShare 헬퍼  2) useLightstickShare 훅

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/** 0~1 범위 고정 */
const clamp01 = (n) => Math.min(1, Math.max(0, Number(n)));

/**
 * 서버 저장 요청(스티커 제외 payload) → code 반환
 * @param {object} payload - 스티커 제외 설정(JSON)
 * @param {object} [opts]
 * @param {string} [opts.endpoint="/api/lightstick/shares"] - API 경로
 * @returns {Promise<string>} code
 */
export async function postLightstickShare(payload, opts = {}) {
  const endpoint = opts.endpoint ?? "/api/lightstick/shares";

  // 보정(필드 누락 시 기본값 보장)
  const safe = {
    schemaVersion: 1,
    clientTs: Date.now(),
    // 형태
    capShape: payload?.capShape ?? "sphere",
    thickness: payload?.thickness ?? "thin",
    bodyLength: payload?.bodyLength ?? "short",
    // 색상
    bodyColor: payload?.bodyColor ?? "#ffffff",
    capColor: payload?.capColor ?? "#ffffff",
    // 재질
    metallic: clamp01(payload?.metallic ?? 0.25),
    roughness: clamp01(payload?.roughness ?? 0.0),
    transmission: clamp01(payload?.transmission ?? 0.5),
    // 피규어
    figureUrl: payload?.figureUrl || null,
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 세션/쿠키 사용 시
    body: JSON.stringify(safe),
  });

  if (!res.ok) {
    try {
      const err = await res.json();
      throw new Error(err?.message || "서버 저장에 실패했습니다.");
    } catch {
      throw new Error("서버 저장에 실패했습니다.");
    }
  }

  const data = await res.json();
  const code = data?.code;
  if (!code) throw new Error("공유 코드가 응답에 없습니다.");
  return code;
}

/**
 * 커스텀 페이지에서 바로 호출할 수 있는 훅
 * - share(payload): 서버 저장 → code 수신 → 게시판으로 이동
 * @param {object} cfg
 * @param {string} cfg.boardWritePath - 글쓰기 페이지 라우트 (예: "/community/write")
 * @param {string} [cfg.endpoint] - API 경로 커스터마이징 시
 */
export function useLightstickShare({ boardWritePath, endpoint } = {}) {
  const navigate = useNavigate();

  const share = useCallback(
    async (payload) => {
      const code = await postLightstickShare(payload, { endpoint });
      navigate(`${boardWritePath}?code=${encodeURIComponent(code)}`);
    },
    [boardWritePath, endpoint, navigate]
  );

  return { share };
}
