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

    useEffect(() => {
    const userId = 1234;
    axios.get(`http://localhost:8080/api/myidol/members/${userId}`)
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

    return (
        <div>

            <Header />

            <itemS.container>
                <itemS.title>
                    <Title />
                </itemS.title>

                <itemS.members>
                    {members.map(m => (
                        <MemberCard
                            key={m.name}
                            imgSrc={m.profileImageUrl}
                            name={m.name}
                            position={m.position}
                            selected={selectedMember?.name === m.name}
                            onSelect={() => handleSelect(m)}
                        />
                    ))}
                </itemS.members>
                
                <MemberChoice/>

                <Next selectedMember={selectedMember} />
            </itemS.container>
            
        </div>
    );
}

export default PictureSelectMemberPage