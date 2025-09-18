import React, { useState, useEffect } from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.PostPage.View.style";
import Header from "@/pages/PicturePage/components/PicturePage.Header";
import { useParams, useNavigate } from "react-router-dom";
import { postList, imageMap } from "@/pages/PicturePage/PicturePage.PostPage.data";

import back from "@/assets/images/PicturePage/back.png";
import share from "@/assets/images/PicturePage/share.png";
import kakao from "@/assets/images/PicturePage/kakao.png";
import x from "@/assets/images/PicturePage/x.png";
import link from "@/assets/images/PicturePage/link.png";

function PostView() {
    const {id} = useParams();   // 클릭한 post id
    const post = postList.find(p => p.id === parseInt(id));
    if (!post) return <div>게시글이 없습니다.</div>;
    const navigate = useNavigate();
    const [showShare, setShowShare] = useState(false);  // 바텀시트 토글
    const [kakaoReady, setKakaoReady] = useState(false);
    const currentURL = window.location.href;    // 현재 url

    useEffect(() => {
        // 이미 스크립트가 있으면 바로 init
        if (window.Kakao) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init("YOUR_KAKAO_JS_KEY");
            }
            setKakaoReady(true);
            return;
        }

        // 동적으로 스크립트 생성
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        script.onload = () => {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init("c380482074c418d864af8e0765e83c45");
            }
            setKakaoReady(true);
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 카카오톡 공유
    const handleKakaoShare = () => {
        if (!kakaoReady) {
            alert("카카오톡 공유를 사용할 수 없습니다.");
            return;
        }

        window.Kakao.Link.sendDefault({
            objectType: "feed",
            content: {
                title: post.title,
                description: `${post.member}와 찍은 사진`,
                imageUrl: window.location.origin + imageMap[post.image_url],
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
        });
    };

    // 트위터 공유
    const handleTwitterShare = () => {
        const text = encodeURIComponent(`${post.title} - ${post.member}와 찍은 사진`);
        const url = encodeURIComponent(currentURL);
        const twitterURL = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        window.open(twitterURL, "_blank");
    };

    // 클립보드 복사
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentURL);
            alert("링크가 복사되었습니다!");
        } catch {
            alert("복사에 실패했습니다.");
        }
    };


    return (
        <div style={{ width: "100%", overflowX: "hidden" }}>

            <Header/>

            <itemS.content>
                <itemS.content_background>
                    <itemS.pocanavi>
                        <itemS.back onClick={() => navigate(-1)}>
                            <img src={back} alt=""/>
                        </itemS.back>
                        <itemS.icons>
                            <img src={share} alt="" onClick={() => setShowShare(prev => !prev)}/>
                        </itemS.icons>
                        {showShare && (
                            <itemS.share_overlay onClick={() => setShowShare(false)} />
                        )}
                        <itemS.share_bottom_sheet className={showShare ? "show" : ""}>
                            <div className="sheet-header">
                                <div className="closeBtn" onClick={() => setShowShare(false)}>x</div>
                            </div>
                            <div className="sheet-icons">
                                <div className="icon-item">
                                    <img src={kakao} alt="" onClick={handleKakaoShare}/>
                                    <span>카카오톡</span>
                                </div>
                                <div className="icon-item">
                                    <img src={x} alt="" onClick={handleTwitterShare}/>
                                    <span>X</span>
                                </div>
                                <div className="icon-item">
                                    <img src={link} alt="" onClick={handleCopyLink}/>
                                    <span>URL 복사</span>
                                </div>
                            </div>
                        </itemS.share_bottom_sheet>
                    </itemS.pocanavi>
                    <itemS.deco_item>
                        <itemS.result_img>
                            <img src={imageMap[post.image_url]} alt=""/>
                        </itemS.result_img>
                        <itemS.photo_info>
                            <itemS.photo_title>{post.title}</itemS.photo_title>
                            <itemS.photo_meta>
                                <span>{post.user}</span>
                                <itemS.created_at>{post.created_at}</itemS.created_at>
                            </itemS.photo_meta>
                            <itemS.photo_stats>
                                <itemS.tag>{post.member}</itemS.tag>
                                <itemS.stat_item><span>👀</span><span>{post.hit}</span></itemS.stat_item>
                            </itemS.photo_stats>
                            <itemS.postContent>{post.content}</itemS.postContent>
                        </itemS.photo_info>
                    </itemS.deco_item>
                </itemS.content_background>
            </itemS.content>

        </div>
    );
}

export default PostView