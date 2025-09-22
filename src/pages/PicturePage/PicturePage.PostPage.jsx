import axios from "axios";
import React, { useState, useEffect } from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.PostPage.style";
import Header from "@/pages/PicturePage/components/PicturePage.Header";
import { useNavigate } from "react-router-dom";

import write from "@/assets/images/PicturePage/write.png";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);


function PostPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setAllPosts] = useState([]);

  useEffect (() => {
    const fetchPosts = () => {
      axios.get("http://localhost:8080/api/posts")
        .then(res => { 
          const postsData = res.data.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
          setAllPosts(postsData);
          setFilteredPosts(postsData);
        })
        .catch(err => console.log(err));
    };
    
    fetchPosts();
  }, []);

  const handleSearch = () => {
    const keyword = searchInput.trim().toLowerCase();
    if (!keyword) {
      setFilteredPosts(posts); // 빈 검색이면 전체 표시
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(keyword)
      );
      setFilteredPosts(filtered);
    }
    setCurrentPage(1); // 검색 후 페이지 초기화
  };

  // Enter 키로 검색
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // 날짜 포맷 함수
  const formatDate = (isoString) => {
    return dayjs(isoString).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm");
  }

  const itemsPerPage = 2; // 한 페이지에 보여줄 아이템 수
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));

  const currentItems = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <Header />

      <itemS.container>
        <itemS.main_content>
          <itemS.sidebar>
            <itemS.filter_title>검색어 입력</itemS.filter_title>
            <itemS.search_input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="검색할 게시글 제목을 입력해주세요"
            />
            <itemS.searchBtn onClick={handleSearch}>검색</itemS.searchBtn>
          </itemS.sidebar>

          <itemS.content>
            <itemS.navbar>
              <itemS.navbar_header>
                <h1>사진촬영 공유 게시판</h1>
                <p>멤버와 찍은 사진을 공유해보세요!</p>
              </itemS.navbar_header>
            </itemS.navbar>

            <itemS.photo_grid className={currentItems.length === 0 ? "no-results" : ""}>
              {currentItems.length > 0 ? (
                currentItems.map(post => (
                <itemS.photo_card key={post.id} onClick={() => navigate(`/picture/post/view/${post.id}`)}>
                  <itemS.photo_image>
                    <img src={`http://localhost:8080${post.image_url}`} alt="" />
                  </itemS.photo_image>
                  <itemS.photo_info>
                    <itemS.photo_title>{post.title}</itemS.photo_title>
                    <itemS.photo_meta>
                      <span>{post.username}</span>
                      <span>{formatDate(post.created_at)}</span>
                    </itemS.photo_meta>
                    <itemS.photo_stats>
                      <itemS.tag>{post.member}</itemS.tag>
                      <itemS.stat_item>👀 {post.hit}</itemS.stat_item>
                    </itemS.photo_stats>
                  </itemS.photo_info>
                </itemS.photo_card>
              ))
              ) : (
                <itemS.no_results>게시글이 없습니다.</itemS.no_results>
              )}
            </itemS.photo_grid>

            <itemS.page_num>
              <li className="arrow" onClick={() => setCurrentPage(1)}>{'«'}</li>
              <li className="arrow" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>{'‹'}</li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <li
                  key={num}
                  className={currentPage === num ? "active" : ""}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </li>
              ))}

              <li className="arrow" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>{'›'}</li>
              <li className="arrow" onClick={() => setCurrentPage(totalPages)}>{'»'}</li>
            </itemS.page_num>
          </itemS.content>
        </itemS.main_content>

        <itemS.uploadBtn onClick={() => navigate('/picture/post/write')}>
          <img src={write} alt="" />
        </itemS.uploadBtn>
      </itemS.container>
    </div>
  );
}

export default PostPage