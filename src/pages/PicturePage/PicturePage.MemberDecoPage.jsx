import React from "react";
import Header from "@/pages/PicturePage/components/PicturePage.Header";
import MemberImg from "@/pages/PicturePage/components/PicturePage.MemberDecoPage.MemberImg";
import DecoImg from "@/pages/PicturePage/components/PicturePage.MemberDecoPage.DecoImg";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.MemberDecoPage.style";

function MemberDecoPage(){
    return (
        <div>

            <Header />
            
            <itemS.container>
                <itemS.background>
                    <MemberImg imgSrc="/images/PicturePage/member1.png" />
                    <itemS.deco_title>
                        Decoration
                    </itemS.deco_title>
                    <itemS.deco_imgs>
                        <DecoImg imgSrc="/images/PicturePage/deco1.png" />
                        <DecoImg imgSrc="/images/PicturePage/deco2.png" />
                        <DecoImg imgSrc="/images/PicturePage/deco3.png" />
                        <DecoImg imgSrc="/images/PicturePage/deco4.png" />
                        <DecoImg imgSrc="/images/PicturePage/deco5.png" />
                    </itemS.deco_imgs>
                </itemS.background>

                <itemS.buttons>
                    <itemS.reset>
                        <img src="/images/PicturePage/reset.png" alt=""/>
                    </itemS.reset>
                    <itemS.next>
                        <img src="/images/PicturePage/next.png" alt=""/>
                    </itemS.next>
                </itemS.buttons>
            </itemS.container>

        </div>
    );
}

export default MemberDecoPage