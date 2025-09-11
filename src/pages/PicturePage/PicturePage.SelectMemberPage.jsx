import React from 'react';
import * as itemS from "@/pages/PicturePage/styled/PicturePage.SelectMemberPage.style"
import Header from "@/pages/PicturePage/components/PicturePage.Header"
import Title from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.Title';
import MemberCard from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.MemberCard';
import MemberChoice from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.MemberChoice';
import Next from '@/pages/PicturePage/components/PicturePage.SelectMemberPage.Next';

function PictureSelectMemberPage(){
    return (
        <div>

            <Header />

            <itemS.container>
                <itemS.title>
                    <Title />
                </itemS.title>

                <itemS.members>
                    <MemberCard imgSrc="/images/PicturePage/member1.png" name="카리나" position="리더, 메인댄서, 서브보컬, 센터"/>
                    <MemberCard imgSrc="/images/PicturePage/member2.png" name="장원영" position="센터, 서브보컬"/>
                    <MemberCard imgSrc="/images/PicturePage/member3.png" name="민지" position="리더, 메인보컬"/>
                    <MemberCard imgSrc="/images/PicturePage/member4.png" name="카즈하" position="메인댄서, 서브보컬"/>
                </itemS.members>
                
                <MemberChoice />

                <Next />
            </itemS.container>
            
        </div>
    );
}

export default PictureSelectMemberPage