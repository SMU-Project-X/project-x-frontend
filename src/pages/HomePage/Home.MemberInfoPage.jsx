
import * as itemS from "@/pages/HomePage/styled/Home.main.style"
import Mark_img from "@/assets/images/CommunityPage/image1.png"

function MemberInfoPage() {
    return (
        <itemS.MemberCardWapper>
            <itemS.MemberImg src={Mark_img} />
            <itemS.MemeberTagWrapper>#류하 #도도함 #지성</itemS.MemeberTagWrapper>
        </itemS.MemberCardWapper>
    )
}

export default MemberInfoPage