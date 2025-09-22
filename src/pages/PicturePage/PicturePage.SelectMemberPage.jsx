import axios from "axios";
import React, { useEffect, useState } from 'react';
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"
import Header from "@/pages/PicturePage/components/PicturePage.Header"
import Title from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.Title';
import MemberCard from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.MemberCard';
import MemberChoice from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.MemberChoice';
import Next from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.Next';


function PictureSelectMemberPage(){
    const [selectedMember, setSelectedMember] = useState(null);
    const [members, setAllMembers] = useState([]);
    const [startIndex, setStartIndex] = useState(0); // 현재 보여주는 첫 멤버 인덱스

    useEffect(() => {
    axios.get(`http://localhost:8080/api/memberinfo`)
        .then(res => {
            console.log(res);
            setAllMembers(res.data);
            console.log("멤버 : ", res.data);
        })
        .catch(err => console.error(err));
    }, []);


    const handleSelect = (member) => {
        setSelectedMember(member);
    };

    const showPrev = () => {
        if (members.length === 0) return;
        // startIndex가 0이면 마지막 가능한 시작 인덱스로
        setStartIndex(prev => (prev === 0 ? members.length - 4 : prev - 1));
    };

    const showNext = () => {
        if (members.length === 0) return;
        // startIndex가 마지막이면 처음으로
        setStartIndex(prev => (prev >= members.length - 4 ? 0 : prev + 1));
    };

    const visibleMembers = members.slice(startIndex, startIndex + 4);

    return (
        <div>

            <Header />

            <itemS.container>
                <itemS.title>
                    <Title />
                </itemS.title>

                <itemS.bannerWrapper>
                    <itemS.arrow onClick={showPrev}>&lt;</itemS.arrow>

                    <itemS.members>
                        {visibleMembers.map(m => (
                            <MemberCard
                                key={m.memberId}
                                imgSrc={m.profileImageUrl}
                                name={m.name}
                                selected={selectedMember?.memberId === m.memberId}
                                onSelect={() => handleSelect(m)}
                            />
                        ))}
                    </itemS.members>

                    <itemS.arrow onClick={showNext}>&gt;</itemS.arrow>
                </itemS.bannerWrapper>
                
                <MemberChoice/>

                <Next selectedMember={selectedMember} />
            </itemS.container>
            
        </div>
    );
}

export default PictureSelectMemberPage