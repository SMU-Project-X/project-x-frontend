import React, { useState } from 'react';
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"
import Header from "@/pages/PicturePage/components/PicturePage.Header"
import Title from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.Title';
import MemberCard from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.MemberCard';
import MemberChoice from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.MemberChoice';
import Next from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.Next';

import member1 from "@/assets/images/PicturePage/member1.png"
import member2 from "@/assets/images/PicturePage/member2.png"
import member3 from "@/assets/images/PicturePage/member3.png"
import member4 from "@/assets/images/PicturePage/member4.png"

function PictureSelectMemberPage(){
    const [selectedMember, setSelectedMember] = useState(null);

    const handleSelect = (member) => {
        setSelectedMember(member);  // member = { imgSrc, name, position }
    };

    return (
        <div>

            <Header />

            <itemS.container>
                <itemS.title>
                    <Title />
                </itemS.title>

                <itemS.members>
                    <MemberCard imgSrc={member1} name="카리나" position="리더, 메인댄서, 서브보컬, 센터"
                    selected={selectedMember?.name === "카리나"} onSelect={() => handleSelect({imgSrc:member1, name:"카리나", position:"리더, 메인댄서, 서브보컬, 센터",})}/>
                    <MemberCard imgSrc={member2} name="장원영" position="센터, 서브보컬"
                    selected={selectedMember?.name === "장원영"} onSelect={() => handleSelect({imgSrc:member2, name:"장원영", position:"센터, 서브보컬",})}/>
                    <MemberCard imgSrc={member3} name="민지" position="리더, 메인보컬"
                    selected={selectedMember?.name === "민지"} onSelect={() => handleSelect({imgSrc:member3, name:"민지", position:"리더, 메인보컬",})}/>
                    <MemberCard imgSrc={member4} name="카즈하" position="메인댄서, 서브보컬"
                    selected={selectedMember?.name === "카즈하"} onSelect={() => handleSelect({imgSrc:member4, name:"카즈하", position:"메인댄서, 서브보컬",})}/>
                </itemS.members>
                
                <MemberChoice/>

                <Next selectedMember={selectedMember} />
            </itemS.container>
            
        </div>
    );
}

export default PictureSelectMemberPage