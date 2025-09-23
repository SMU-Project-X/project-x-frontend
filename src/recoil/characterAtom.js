// recoil/characterAtom.js
import { atom } from 'recoil';

const SESS_KEY = 'selectedCharacters';

/** 기본값(4 슬롯, trait 2개) */
const DEFAULT = [
  { img: null, name: null, traits: [null, null], mbti: null },
  { img: null, name: null, traits: [null, null], mbti: null },
  { img: null, name: null, traits: [null, null], mbti: null },
  { img: null, name: null, traits: [null, null], mbti: null },
];

/** 저장 데이터 구조 보정 */
const normalizeSlot = (slot = {}) => ({
  img: slot?.img ?? null,
  name: slot?.name ?? null,
  traits: Array.isArray(slot?.traits)
    ? [slot.traits[0] ?? null, slot.traits[1] ?? null]
    : [null, null],
  mbti: slot?.mbti ?? null,
});

/** 세션에서 최초 로드 */
const loadInitial = () => {
  try {
    const raw = sessionStorage.getItem(SESS_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT;

    const normalized = parsed.slice(0, 4).map(normalizeSlot);
    while (normalized.length < 4) normalized.push(normalizeSlot());
    return normalized;
  } catch {
    return DEFAULT;
  }
};

/** 세션 퍼시스트 이펙트 */
const persistEffect = ({ setSelf, onSet, trigger }) => {
  if (trigger === 'get') {
    setSelf(loadInitial());
  }
  onSet((newValue, _, isReset) => {
    try {
      if (isReset) {
        sessionStorage.removeItem(SESS_KEY);
      } else {
        sessionStorage.setItem(SESS_KEY, JSON.stringify(newValue));
      }
    } catch {
      /* ignore quota / private mode errors */
    }
  });
};

export const selectedCharactersState = atom({
  key: 'selectedCharactersState',
  default: DEFAULT,
  effects_UNSTABLE: [persistEffect],
});
