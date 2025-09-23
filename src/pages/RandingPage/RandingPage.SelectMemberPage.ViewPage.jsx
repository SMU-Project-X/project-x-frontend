import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import * as THREE from "three"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import {
    CarouselWrapper,
    Track,
    Card,
    ViewPageContainer,
    CharacterModelViewWrapper,
    NextBtn
} from "@/pages/RandingPage/styled/RandingPage.SelectMemberPage.Carosel.style"
import { useRecoilState } from 'recoil';
import { selectedCharactersState } from '@/recoil/characterAtom';
import { useNavigate } from "react-router-dom"

const characters = [
    { id: 1, name: "가온", img: "/Character/가온.png" },
    { id: 2, name: "다온", img: "/Character/다온.png" },
    { id: 3, name: "류하", img: "/Character/류하.png" },
    { id: 4, name: "모아", img: "/Character/모아.png" },
    { id: 5, name: "세라", img: "/Character/세라.png" },
    { id: 6, name: "세인", img: "/Character/세인.png" },
    { id: 7, name: "수린", img: "/Character/수린.png" },
    { id: 8, name: "아린", img: "/Character/아린.png" },
    { id: 9, name: "유나", img: "/Character/유나.png" },
    { id: 10, name: "지원", img: "/Character/지원.png" },
    { id: 11, name: "채윤", img: "/Character/채윤.png" },
    { id: 12, name: "현", img: "/Character/현.png" },
]

// ---------------- 3D 모델 ----------------
function Model() {
    const { scene } = useGLTF("/models/scene.gltf")
    return <primitive object={scene} scale={2} />
}

// ---------------- 카메라 컨트롤 ----------------
function CameraController({ targetChar }) {
    const { camera } = useThree()
    const controlsRef = useRef()

    const characterViews = {
        가온: { pos: [0.5159652751289685, 2.083365114640386, 3.7417668795811445], lookAt: [0.973613814519157, 1.9229014744605226, 2.867233155489126] },
        다온: { pos: [-2.8834435981386926, 2.4729828973031425, 1.5287231521542535], lookAt: [-2.975271345913904, 2.2118458009704405, 0.5677990752067262] },
        류하: { pos: [-0.14272049077820115, 1.9505091822795233, 4.260298298402865], lookAt: [-0.49319067103004477, 1.8791701380453105, 3.3264453155827693] },
        모아: { pos: [-0.1459238794260113, 2.5076553297967314, 0.1901574556038026], lookAt: [-0.2949641903875492, 2.2122661830893273, -0.7535227008665768] },
        세라: { pos: [-0.49074388016168013, 2.49025717249357, 8.242722766824574], lookAt: [-0.8579025239211168, 2.1656182258168837, 7.371055350539336] },
        세인: { pos: [-3.156219469710801, 2.3064607338047196, 4.896769519352022], lookAt: [-3.434969052080781, 2.0564381553843, 3.969522313581863] },
        수린: { pos: [3.243775667146896, 2.4676974426863625, 1.6305810399346101], lookAt: [3.416207648040183, 2.2965277234114283, 0.660545917287725] },
        아린: { pos: [5.558929163611013, 2.265797088489572, 2.943916483999889], lookAt: [5.984023925512881, 2.1187283198365177, 2.050795427988741] },
        유나: { pos: [0.5062692270629681, 2.0272840308689, 8.161640534685661], lookAt: [0.9373939982996629, 1.9249546766848593, 7.265169601025018] },
        지원: { pos: [3.193358493216367, 1.9453219879497488, 4.946405155656101], lookAt: [3.6245286602066655, 1.8429961635192451, 4.0499556519180615] },
        채윤: { pos: [0.6083156730327968, 1.9631343840695707, 0.35784813467843907], lookAt: [1.0394855717894007, 1.8608087069587391, -0.5386015148892487] },
        현: { pos: [-5.781900240156544, 2.3944618306686625, 3.3394392654020857], lookAt: [-6.180409177753928, 2.114140781210238, 2.4661634006917805] },

    }

    useEffect(() => {
        if (!targetChar) return
        const view = characterViews[targetChar.name]
        if (!view) return

        gsap.to(camera.position, {
            x: view.pos[0],
            y: view.pos[1],
            z: view.pos[2],
            duration: 1.2,
            ease: "power2.inOut",
            onUpdate: () => {
                camera.lookAt(...view.lookAt)
                if (controlsRef.current) {
                    controlsRef.current.target.set(...view.lookAt)
                    controlsRef.current.update()
                }
            },
        })
    }, [targetChar])

    return <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        onChange={() => {
            const pos = camera.position.toArray()
            const dir = camera.getWorldDirection(new THREE.Vector3()).toArray()
            const lookAt = [pos[0] + dir[0], pos[1] + dir[1], pos[2] + dir[2]]
        }}
    />
}

// ---------------- 메인 컴포넌트 ----------------
function ViewPage({ slotIndex = 0 }) {
    const navigate = useNavigate();
    const trackRef = useRef(null)
    const [selectedChar, setSelectedChar] = useState(null)
    const [selectedCharacters, setSelectedCharacters] = useRecoilState(selectedCharactersState);

    // 무한 루프 캐러셀
    useEffect(() => {
        const track = trackRef.current
        if (!track) return
        const totalWidth = track.scrollWidth / 2
        gsap.to(track, {
            x: -totalWidth,
            duration: 30,
            ease: "linear",
            repeat: -1,
        })
    }, [])

    // 확인 버튼 클릭 시 Recoil 상태에 저장 (traits, mbti 유지)
const handleConfirm = () => {
    if (!selectedChar) return;

    const updated = [...selectedCharacters];

    // 기존 traits와 mbti 유지
    const existing = selectedCharacters[slotIndex] || {};
    updated[slotIndex] = {
        ...selectedChar,
        traits: existing.traits || [null, null, null],
        mbti: existing.mbti || null,
    };

    setSelectedCharacters(updated);
    alert(`${selectedChar.name} 선택 완료`);
    console.log(selectedChar);
    console.log(updated); // Recoil 상태에 반영된 최신 값 확인
    navigate(-1);
}


    return (
        <ViewPageContainer>
            {/* 3D 모델 영역 */}
            <CharacterModelViewWrapper>
                <Canvas camera={{ position: [0, 6, 10] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} />
                    <Model />
                    <CameraController targetChar={selectedChar} />
                </Canvas>
            </CharacterModelViewWrapper>

            {/* 캐러셀 */}
            <CarouselWrapper>
                <Track ref={trackRef}>
                    {[...characters, ...characters].map((char, i) => (
                        <Card key={i} onClick={() => setSelectedChar(char)}>
                            <img src={char.img} alt={char.name} />
                            <p>{char.name}</p>
                        </Card>
                    ))}
                </Track>
            </CarouselWrapper>

            {/* 확인 버튼 */}
            <NextBtn onClick={handleConfirm}>
                확인
            </NextBtn>
        </ViewPageContainer>
    )
}

export default ViewPage;