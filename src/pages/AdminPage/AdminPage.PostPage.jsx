import React from "react";
import * as itemS from "@/pages/AdminPage/styled/AdminPage.PostPage.style";

function AdminPostPage() {
    return (
        <itemS.Container>
            {/* Banner */}
            <itemS.Banner>
                <itemS.BannerTitle>PROJECT-X</itemS.BannerTitle>
                <itemS.Menu>
                    <itemS.MenuItem><a href="#">메인</a></itemS.MenuItem>
                    <itemS.MenuItem><a href="#">공지사항</a></itemS.MenuItem>
                    <itemS.MenuItem className="board"><a href="#">게시글 관리</a></itemS.MenuItem>
                    <itemS.MenuItem><a href="#">사용자 관리</a></itemS.MenuItem>
                </itemS.Menu>
                <itemS.BannerRight>
                    <itemS.HomeLink href="#"><i className="fi fi-rr-home"></i>홈으로</itemS.HomeLink>
                </itemS.BannerRight>
            </itemS.Banner>

            {/* Notice Container */}
            <itemS.NoticeContainer>

                {/* Dashboard / Box */}
                <itemS.DashTop>
                    <h2>게시글 관리</h2>
                    <hr />
                </itemS.DashTop>

                <itemS.Box>
                    <itemS.BoxItem>
                        <p>0</p>
                        <a>전체 게시글</a>
                    </itemS.BoxItem>
                    <itemS.BoxItem>
                        <p>0</p>
                        <a>신고된 게시글</a>
                    </itemS.BoxItem>
                    <itemS.BoxItem>
                        <p>0</p>
                        <a>오늘 작성</a>
                    </itemS.BoxItem>
                </itemS.Box>

                {/* Filter */}
                <itemS.Filter>
                    <itemS.FilterInner>
                        <itemS.Select>
                            <option value="">전체 게시판</option>
                        </itemS.Select>
                        <itemS.Select>
                            <option value="">게시글 상태</option>
                        </itemS.Select>
                        <itemS.SearchInput type="text" placeholder="게시글 제목, 작성자 검색..." />
                        <itemS.SearchButton>검색</itemS.SearchButton>
                    </itemS.FilterInner>
                </itemS.Filter>

                {/* Table Controls */}
                <itemS.TableControls>
                    <h3>
                        선택된 게시글을 관리하세요 <span>0개 선택됨</span>
                    </h3>
                    <itemS.ActionButtons>
                        <itemS.ActionBtn disabled>선택 삭제</itemS.ActionBtn>
                    </itemS.ActionButtons>
                </itemS.TableControls>

                {/* Posts Table */}
                <itemS.PostsTable>
                    <thead>
                        <tr>
                            <th><input type="checkbox" disabled /></th>
                            <th>게시글 ID</th>
                            <th>게시판</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>신고수</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>게시글이 없습니다.</td>
                        </tr>
                    </tbody>
                </itemS.PostsTable>

                {/* BottomBar / Pagination */}
                <itemS.BottomBar>
                    <itemS.Pagination>
                        <a href="#" className="active">1</a>
                    </itemS.Pagination>
                </itemS.BottomBar>
            </itemS.NoticeContainer>
        </itemS.Container>
    );
}

export default AdminPostPage;
