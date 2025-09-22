import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { CarouselWrapper, Track, Card } from "@/pages/RandingPage/styled/RandingPage.SelectMemberPage.Carosel.style"

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

export default function Carousel() {
    const trackRef = useRef(null)

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        // 무한 루프 애니메이션
        const totalWidth = track.scrollWidth / 2

        gsap.to(track, {
            x: -totalWidth,
            duration: 10,
            ease: "linear",
            repeat: -1,
        })
    }, [])

    return (
        <CarouselWrapper>
            <Track ref={trackRef}>
                {[...characters, ...characters].map((char, i) => (
                    <Card key={i}>
                        <img src={char.img} alt={char.name} />
                        <p>{char.name}</p>
                    </Card>
                ))}
            </Track>
        </CarouselWrapper>
    )
}
