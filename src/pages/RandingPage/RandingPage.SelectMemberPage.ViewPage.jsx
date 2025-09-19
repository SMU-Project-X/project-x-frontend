import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, ScrollControls, useScroll, Text } from '@react-three/drei'
import { easing } from 'maath'
import * as itemS from '@/pages/RandingPage/styled/RandingPage.SelectMemberPage.ViewPage.style'
import { useGLTF, OrbitControls } from '@react-three/drei'
import './util'
import { characters } from '@/assets/data/characters'

import { useRecoilState } from 'recoil';
import { selectedCharactersState } from '@/recoil/characterAtom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';


// ---------------- Rig ---------------- 회전 wrapper
function Rig(props) {
    const ref = useRef()
    const scroll = useScroll()
    const rotationSpeed = 0.001
    const [isScrolling, setIsScrolling] = useState(false)

    useFrame((state, delta) => {
        if (!ref.current) return

        const scrollDelta = Math.abs(scroll.delta)
        setIsScrolling(scrollDelta > 0.001)

        if (!isScrolling) {
            ref.current.rotation.y -= rotationSpeed * delta * 60
        } else if (scrollDelta > 0.001) {
            ref.current.rotation.y = -scroll.offset * (Math.PI * 2)
        }

        state.events.update()
        easing.damp3(
            state.camera.position,
            [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
            0.3,
            delta
        )
        state.camera.lookAt(0, 0, 0)
    })

    return <group ref={ref} {...props} />
}

// ---------------- Carousel ---------------- 카드 배열
function Carousel({ onCardClick }) {
    return characters.map((char, i) => (
        <Card
            key={i}
            url={char.img}
            name={char.name}
            onClick={() => onCardClick?.(char)}
            position={[
                Math.sin((i / characters.length) * Math.PI * 2) * 2.1,
                0,
                Math.cos((i / characters.length) * Math.PI * 2) * 2.1,
            ]}
            rotation={[0, Math.PI + (i / characters.length) * Math.PI * 2, 0]}
        />
    ))
}

// ---------------- Card ---------------- 각 카드
function Card({ url, name, ...props }) {
    const ref = useRef()
    const [hovered, setHovered] = useState(false)

    useFrame((state, delta) => {
        if (!ref.current) return
        easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
        easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
        easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
    })

    return (
        <Image
            ref={ref}
            url={url}
            transparent
            side={THREE.DoubleSide}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
            onPointerOut={() => setHovered(false)}
            onClick={props.onClick}
            {...props}
        >
            <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
            {hovered && (
                <Text
                    position={[0, 0.65, 0.1]}
                    rotation={[0, Math.PI, 0]}
                    fontSize={0.1}
                    color="#172031"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
            )}
        </Image>
    )
}

// ---------------- 3D Model ----------------
function Model({ url }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} scale={2} />
}

// ---------------- ViewPage ---------------- main
function ViewPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { slotIndex } = useParams(); // URL /view/:slotIndex
    const slot = parseInt(slotIndex ?? '0', 10);

    const [selectedModel, setSelectedModel] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)

    const [selectedCharacters, setSelectedCharacters] = useRecoilState(selectedCharactersState);

    // 카드 클릭 시 3D 모델 표시
    const handleCardClick = (char) => {
        setSelectedCard(char);
        setSelectedModel('/models/scene.gltf');
    };

    // 확인 버튼 클릭 시 Recoil 업데이트 + 이전 페이지 이동
    const handleConfirm = () => {
    if (!selectedCard) return;

    const updated = [...selectedCharacters];
    updated[slotIndex] = {
        ...selectedCard,
        traits: selectedCharacters[slotIndex].traits || [null, null, null] // 기존 traits 유지
    };
    setSelectedCharacters(updated);
    navigate(-1);
};

    return (
        <itemS.ViewPageContainer>
            {/* Carousel 영역 */}
            <itemS.CharacterImgContainer>
                <itemS.CharacterImgTitle>스크롤하여 캐릭터 카드를 선택해 보세요</itemS.CharacterImgTitle>
                <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
                    <ScrollControls pages={4} infinite>
                        <Rig rotation={[0, 0, 0.15]}>
                            <Carousel onCardClick={handleCardClick} />
                        </Rig>
                    </ScrollControls>
                </Canvas>
            </itemS.CharacterImgContainer>

            {/* 선택된 3D 모델 영역 */}
            {selectedModel && selectedCard && (
                <itemS.CharacterModelViewWrapper>
                    <Canvas camera={{ position: [0, 2, 3] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} />
                        <group position={[0, -2.5, 0]}>
                            <Model url={selectedModel} />
                        </group>
                        <OrbitControls enableZoom={true} />
                    </Canvas>

                    <itemS.NextBtn onClick={handleConfirm}>
                        확인
                    </itemS.NextBtn>
                </itemS.CharacterModelViewWrapper>
            )}
        </itemS.ViewPageContainer>
    )
}

export default ViewPage
