import React,{ useState } from "react"
import * as itemS from '@/pages/CommunityPage/styled/CommunityPage.CheerArtist.style';
import { useComment } from "../hooks/CommunityPage.useComment";
import SendImg from "@/assets/images/CommunityPage/sendImg.png";
import image1 from '@/assets/images/CommunityPage/image1.png';
import { CommentSection } from "./CommunityPage.CommentContent";
import { useSelectMember } from "../hooks/CommunityPage.UseSelectMember";

export const PuzzleSection = ({reply,saveComment,memberId, memberName}) => {
    const members= useSelectMember();

    const targetMember = members.find((m)=> m.memberId === Number(memberId));

    if(!targetMember) return <></>;

    return (
        <itemS.PuzzleContainer>
            <itemS.PuzzleImg >
                <img  src={targetMember.profileImageUrl} alt={`${memberName}`}/>
            </itemS.PuzzleImg>
            <itemS.PuzzleCongress>
                <InputComment saveComment={saveComment} memberId={memberId} memberName={memberName} />
            </itemS.PuzzleCongress>
        </itemS.PuzzleContainer>
    );
};


export const InputComment = ({ memberId, memberName, saveComment }) => {

    const [commentText, setCommentText ] = useState("");
    // const {saveComment } = useComment(memberId, memberName);

    // const [text, setText] = useState('');
    // 엔터시 댓글입력
    const handlerEnter = (e) => {
        if (e.key ==="Enter"){
            e.preventDefault();
            handleSave();
        }
    }

    // 댓글 저장버튼
    const handleSave = async() => {
        if(commentText.trim().length === 0) {
            alert("댓글을 입력해주세요!");
            return;
        }
        try {
            await saveComment(commentText);
            console.log("입력한 댓글:",commentText);
            setCommentText("");
        } catch (err) {
            console.error("댓글 저장 실패: ", err);
        }
    };
    

    return (
        <itemS.CommentReply>
        <input 
            type="text" id="reply" name="reply"
            placeholder={`${memberName}에게 응원메세지를 적어주세요!`}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handlerEnter}
        />
        <itemS.SendBtn onClick={handleSave}>
            <itemS.SendImg>
                <img src={SendImg} alt="전송"/>
            </itemS.SendImg>
        </itemS.SendBtn>
        </itemS.CommentReply>
    )
}