
import * as itemS from "@/pages/HomePage/styled/Home.main.style"
function MemberInfoCard({img, name, traits}) {
    return (
        <itemS.MemberCardWapper>
            <itemS.MemberImg src={img} />
            <itemS.MemeberTagWrapper>#{name} #{traits[0]} #{traits[1]}</itemS.MemeberTagWrapper>
        </itemS.MemberCardWapper>
    )
}

export default MemberInfoCard