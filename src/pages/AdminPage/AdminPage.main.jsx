import React, { useEffect } from "react";
import * as itemS from "@/pages/AdminPage/styled/AdminPage.main.style"


function AdminPage() {
    return (
        <itemS.PageWrapper>
            <itemS.Banner>
                <a href="/"><h2>PO-PIN</h2></a>
                <itemS.Menu>
                    <ul>
                        <li className="board"><a href="/admin">메인</a></li>
                        <li><a href="/admin/notice">공지사항</a></li>
                        <li><a href="/admin/post">게시글 관리</a></li>
                        <li><a href="/admin/user">사용자 관리</a></li>
                    </ul>
                </itemS.Menu>
                <itemS.BannerRight>
                    <a href="/" className="home"><i className="fi fi-rr-home"></i>홈으로</a>
                </itemS.BannerRight>
            </itemS.Banner>

            <itemS.ContentContainer>
                <itemS.WhiteBox>
                    <h2>대시보드</h2>
                    <itemS.Line />
                    <itemS.BoxContainer>
                        <div><a>전체 사용자</a></div>
                        <div><a>전체 게시글</a></div>
                        <div><a>대기중인 신고</a></div>
                        <div><a>차단 사용자</a></div>
                    </itemS.BoxContainer>
                </itemS.WhiteBox>

                <itemS.ChartContainer>
                    <h2>월별 거래 통계</h2>
                    <select>
                        <option value="last3">최근 3개월</option>
                        <option value="last6">최근 6개월</option>
                        <option value="all">연도별</option>
                    </select>
                    <canvas id="monthlyTransactionChart"></canvas>
                </itemS.ChartContainer>
            </itemS.ContentContainer>
        </itemS.PageWrapper>
    )
}

export default AdminPage