// src/components/AdminUserPage.jsx
import React from "react";
import * as S from "@/pages/AdminPage/styled/AdminPage.UserPage.style";

function AdminUserPage () {
    return (
        <S.Container>
            {/* 상단 배너 */}
            <S.Banner>
                <a href="#"><S.Title>PO-PIN</S.Title></a>
                <S.Menu>
                    <ul>
                        <li><a href="#">메인</a></li>
                        <li><a href="#">공지사항</a></li>
                        <li><a href="#">게시글 관리</a></li>
                        <li className="board"><a href="#">사용자 관리</a></li>
                    </ul>
                </S.Menu>
                <S.BannerRight>
                    <S.HomeButton>
                        <i className="fi fi-rr-home"></i> 홈으로
                    </S.HomeButton>
                </S.BannerRight>
            </S.Banner>

            {/* 메인 콘텐츠 */}
            <S.Content>
                <S.PageHeader>
                    <h2>사용자 관리</h2>
                    <hr />
                </S.PageHeader>

                <S.StatsContainer>
                    <S.StatsBox>
                        <div className="number">0</div>
                        <div className="label">전체 사용자</div>
                    </S.StatsBox>
                    <S.StatsBox>
                        <div className="number">0</div>
                        <div className="label">활성 사용자</div>
                    </S.StatsBox>
                    <S.StatsBox>
                        <div className="number">0</div>
                        <div className="label">정지된 사용자</div>
                    </S.StatsBox>
                </S.StatsContainer>

                <S.FilterSection>
                    <select>
                        <option value="">유저 상태</option>
                        <option value="status-active">정상</option>
                        <option value="status-report">신고</option>
                        <option value="status-suspended">정지</option>
                    </select>
                    <input type="text" className="search-input" placeholder="사용자 ID 또는 이메일로 검색" />
                    <button className="search-btn">검색</button>
                </S.FilterSection>

                <S.TableContainer>
                    <table>
                        <colgroup>
                            <col style={{ width: "5%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "35%" }} />
                            <col style={{ width: "12%" }} />
                            <col style={{ width: "18%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>사용자 ID</th>
                                <th>닉네임</th>
                                <th>이메일</th>
                                <th>신고 횟수</th>
                                <th>계정 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {users.map((user) => (
                                <tr key={user.user_id}>
                                    <td><input type="checkbox" value={user.user_id} /></td>
                                    <td>{user.user_id}</td>
                                    <td>{user.nickname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.report_c}</td>
                                    <td>
                                        {user.state === 1 && <span className="status-active">정상</span>}
                                        {user.state === 2 && <span className="status-report">신고</span>}
                                        {user.state === 3 && <span className="status-suspended">계정 정지</span>}
                                    </td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </S.TableContainer>

                <S.BottomBar>
                    <div></div>
                    <div className="pagination">{/* 페이지네이션 버튼 */}</div>
                    <S.ActionButtons>
                        <button className="action-btn btn-delete">계정 삭제</button>
                        <button className="action-btn btn-suspend">계정 정지</button>
                        <button className="action-btn btn-release">정지 해제</button>
                    </S.ActionButtons>
                </S.BottomBar>
            </S.Content>
        </S.Container>
    );
};

export default AdminUserPage;
