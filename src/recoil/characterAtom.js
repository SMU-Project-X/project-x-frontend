// characterAtom.js
import { atom } from 'recoil';

export const selectedCharactersState = atom({
    key: 'selectedCharactersState',
    default: [
        { img: null, name: null, traits: [null, null], mbti: null },
        { img: null, name: null, traits: [null, null], mbti: null },
        { img: null, name: null, traits: [null, null], mbti: null },
        { img: null, name: null, traits: [null, null], mbti: null }
    ],
});
