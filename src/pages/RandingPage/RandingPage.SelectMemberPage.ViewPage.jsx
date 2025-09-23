// RandingPage.SelectMemberPage.ViewPage.jsx

import * as THREE from 'three'
import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, ScrollControls, useScroll, Text } from '@react-three/drei'
import { easing } from 'maath'
import * as itemS from '@/pages/RandingPage/styled/RandingPage.SelectMemberPage.ViewPage.style'
import { useGLTF, OrbitControls } from '@react-three/drei'
import './util'
import { characters } from '@/assets/data/characters'

import { useRecoilState } from 'recoil';
import { selectedCharactersState } from '@/recoil/characterAtom';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

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

// ---------------- Card ---------------- 각 카드 (중복 선택 방지용 disabled 지원)
function Card({ url, name, disabled = false, ...props }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (!ref.current) return
    const targetScale = disabled ? 1 : hovered ? 1.15 : 1
    const targetRadius = disabled ? 0.1 : hovered ? 0.25 : 0.1
    const targetZoom = disabled ? 1.5 : hovered ? 1 : 1.5
    easing.damp3(ref.current.scale, targetScale, 0.1, delta)
    easing.damp(ref.current.material, 'radius', targetRadius, 0.2, delta)
    easing.damp(ref.current.material, 'zoom', targetZoom, 0.2, delta)
  })

  const handleOver = (e) => {
    if (disabled) return
    e.stopPropagation()
    setHovered(true)
  }
  const handleOut = () => {
    if (disabled) return
    setHovered(false)
  }
  const handleClick = (e) => {
    if (disabled) {
      e.stopPropagation()
      return
    }
    props.onClick?.()
  }

  return (
    <Image
      ref={ref}
      url={url}
      transparent
      opacity={disabled ? 0.35 : 1}
      side={THREE.DoubleSide}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
      {/* 호버 시 이름 표시 */}
      {!disabled && hovered && (
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
      {/* 이미 다른 슬롯에서 사용 중인 경우 라벨 */}
      {disabled && (
        <Text
          position={[0, 0.65, 0.1]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.1}
          color="#9e9e9e"
          anchorX="center"
          anchorY="middle"
        >
          사용 중
        </Text>
      )}
    </Image>
  )
}

// ---------------- Carousel ---------------- 카드 배열
function Carousel({ onCardClick, isUsedElsewhere }) {
  return characters.map((char, i) => {
    const disabled = isUsedElsewhere?.(char.name)
    return (
      <Card
        key={i}
        url={char.img}
        name={char.name}
        disabled={!!disabled}
        onClick={() => onCardClick?.(char)}
        position={[
          Math.sin((i / characters.length) * Math.PI * 2) * 2.1,
          0,
          Math.cos((i / characters.length) * Math.PI * 2) * 2.1,
        ]}
        rotation={[0, Math.PI + (i / characters.length) * Math.PI * 2, 0]}
      />
    )
  })
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
  const slot = Number.isInteger(Number(slotIndex)) ? parseInt(slotIndex, 10) : 0

  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  const [selectedCharacters, setSelectedCharacters] = useRecoilState(selectedCharactersState);

  // 이미 선택된 멤버 이름 목록(현재 슬롯은 제외)
  const usedNames = useMemo(
    () =>
      selectedCharacters
        .map((c, idx) => (idx === slot ? null : c?.name))
        .filter(Boolean),
    [selectedCharacters, slot]
  )

  const isUsedElsewhere = (name) => usedNames.includes(name)

  // 카드 클릭 시 3D 모델 표시 (중복이면 선택 자체를 막고 안내)
  const handleCardClick = (char) => {
    if (isUsedElsewhere(char.name)) {
      // 시각적으로는 Card에서 disabled 처리, 이중 방어
      alert('이미 다른 슬롯에서 선택한 멤버입니다.')
      return
    }
    setSelectedCard(char);
    setSelectedModel('/models/scene.gltf');
  };

  // 확인 버튼 클릭 시 Recoil 업데이트 + 이전 페이지 이동
  const handleConfirm = () => {
    if (!selectedCard) return;

    // 최종 저장 전에도 중복 확인(이중 방어)
    if (isUsedElsewhere(selectedCard.name)) {
      alert('이미 다른 슬롯에서 선택한 멤버입니다.')
      return
    }

    const updated = [...selectedCharacters];
    updated[slot] = {
      ...selectedCard,
      traits: selectedCharacters[slot]?.traits || [null, null], // 기존 traits 유지(없으면 기본)
      mbti: selectedCharacters[slot]?.mbti ?? null
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
              <Carousel onCardClick={handleCardClick} isUsedElsewhere={isUsedElsewhere} />
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
