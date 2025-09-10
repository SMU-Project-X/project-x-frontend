import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, ScrollControls, useScroll, Text} from '@react-three/drei'
import { easing } from 'maath'
import * as itemS from '@/pages/RandingPage/styled/RandingPage.SelectMemberPage.ViewPage.style'
import { useGLTF, OrbitControls } from '@react-three/drei'
import './util'
import { characters } from '@/assets/data/characters'

// ---------------- Rig ---------------- 회전하는 wrapper
function Rig(props) {
    const ref = useRef()
    const scroll = useScroll()
    const rotationSpeed = 0.001
    const [isScrolling, setIsScrolling] = useState(false)

    useFrame((state, delta) => {
        if (!ref.current) return

        const scrollDelta = Math.abs(scroll.delta)
        setIsScrolling(scrollDelta > 0.001)

        // 스크롤 없을 시 자동으로 회전
        if (!isScrolling) {
            ref.current.rotation.y -= rotationSpeed * delta * 60
        }

        // 스크롤 있을 시 그 비율만큼 화전
        if (scrollDelta > 0.001) {
            ref.current.rotation.y = -scroll.offset * (Math.PI * 2)
        }

        state.events.update()
        // 마우스 움직일 때마다 카메라도 따라오도록
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

// ---------------- Carousel ---------------- 카드 배열 배치
function Carousel({ onCardClick }) {
    return characters.map((char, i) => (
        // 캐릭터 length만큼 카드 생성 후 배치
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
        // 호버할 시 액션
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

            {/* 카드 Rig에 맞게 휘어지게 */}
            <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />

            {/* 카드 호버할 시 카드 위에 이름 텍스트 배치 */}
            {hovered && (
            <Text
                position={[0, 0.65, 0.1]} // 이미지 아래쪽
                rotation={[0, Math.PI, 0]} // 이미지와 동일하게 텍스트 뒤집기
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

// ---------------- 3D Model ---------------- 테스트 중, 추후 수정
function Model({ url }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} scale={2} />
}

// ---------------- ViewPage ---------------- main
function ViewPage() {
    const [selectedModel, setSelectedModel] = useState(null)
    const cards = Array.from({ length: 12 }, (_, i) => i + 1)

    return (
        <itemS.ViewPageContainer>
            {/* Carousel 영역 */}
            <itemS.CharacterImgContainer>
                <itemS.CharacterImgTitle>스크롤하여 캐릭터 카드를 선택해 보세요</itemS.CharacterImgTitle>
                <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
                    <ScrollControls pages={4} infinite>
                        <Rig rotation={[0, 0, 0.15]}>
                            <Carousel
                                count={cards.length}
                                onCardClick={() =>
                                    setSelectedModel('/models/scene.gltf') // 클릭하면 모델 scene.gltf 로드 (현재 테스트 모델)
                                }
                            />
                        </Rig>
                        {/* <Banner position={[0, -0.15, 0]} /> */}
                    </ScrollControls>
                </Canvas>
            </itemS.CharacterImgContainer>

            {/* 선택된 3D 모델 영역 */}
            {selectedModel && (
                <itemS.CharacterModelViewWrapper>
                    <Canvas camera={{ position: [0, 2, 3] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} />
                        <group position={[0, -2.5, 0]}>
                            <Model url={selectedModel} />
                        </group>
                        <OrbitControls enableZoom={true} />
                    </Canvas>

                    <itemS.NextBtn onClick={() => setSelectedModel(null)}>
                        완료
                    </itemS.NextBtn>
                </itemS.CharacterModelViewWrapper>
            )}
        </itemS.ViewPageContainer>
    )
}

export default ViewPage
