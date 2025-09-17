import React, { useState, useRef } from "react";
import * as itemS from "@/pages/PicturePage/styled/PicturePage.PostPage.Write.style";
import Header from "@/pages/PicturePage/components/PicturePage.Header";
import { useNavigate } from "react-router-dom";

const members = ["카리나", "장원영", "민지", "카즈하", "가온", "다온", "류하", "모아", "세라", "세인", "수린", "아린", "유나", "지원", "채윤", "현"];

function PostWrite() {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const inputRef = useRef(null);

    // 클릭 시 파일 선택창 열기
    const handleAreaClick = () => {
        if (inputRef.current) inputRef.current.click();
    };

    // 드래그 오버 이벤트
    const handleDragOver = (e) => {
        e.preventDefault(); // 기본 동작 막기
    };

    // 드롭 이벤트
    const handleDrop = (e) => {
        e.preventDefault(); // 기본 동작 막기
        const file = e.dataTransfer.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    // 파일 선택 이벤트
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    return (
        <div style={{ width: "100%", overflowX: "hidden" }}>

            <Header/>

            <itemS.container>
                <itemS.upload_container>
                    <itemS.upload_header>
                        <h1>사진 업로드</h1>
                        <p>멤버와 찍은 사진을 등록하고 다른 팬들과 공유해보세요!</p>
                    </itemS.upload_header>
                    <itemS.form_section>
                        <itemS.form_content>
                            <itemS.label>게시글 제목<itemS.required>*</itemS.required></itemS.label>
                            <itemS.input id="title" placeholder="포토카드 제목을 입력해주세요"></itemS.input>
                        </itemS.form_content>

                        <itemS.form_content>
                            <itemS.label>멤버<itemS.required>*</itemS.required></itemS.label>
                            <itemS.member_container>
                                {members.map((name, index) => (
                                    <itemS.member_toggle key={index} data-selected={(selectedMember === name).toString()} onClick={() => setSelectedMember(selectedMember === name ? null : name)}>{name}</itemS.member_toggle>
                                ))}
                            </itemS.member_container>
                        </itemS.form_content>

                        <itemS.form_content>
                            <itemS.label>사진<itemS.required>*</itemS.required></itemS.label>
                            <itemS.file_upload_area id="fileUploadArea" onClick={handleAreaClick} onDragOver={handleDragOver} onDrop={handleDrop}>
                                <itemS.file_upload_icon>📷</itemS.file_upload_icon>
                                <h4>촬영한 사진을 드래그하거나 클릭하여 업로드</h4>
                            </itemS.file_upload_area>
                            <itemS.hidden_file_input ref={inputRef} id="imageInput" name="image" accept="image/*" onChange={handleFileChange}/>
                            {previewImage && (
                                <itemS.preview_container id="previewContainer">
                                    <itemS.preview_image src={previewImage} alt="미리보기" />
                                </itemS.preview_container>
                            )}
                        </itemS.form_content>

                        <itemS.form_content>
                            <itemS.label>게시글 내용</itemS.label>
                            <itemS.textarea id="description"></itemS.textarea>
                        </itemS.form_content>
                        <itemS.button_container>
                            <itemS.btn_secondary onClick={() => navigate(-1)}>취소하기</itemS.btn_secondary>
                            <itemS.btn_primary>등록하기</itemS.btn_primary>
                        </itemS.button_container>
                    </itemS.form_section>
                </itemS.upload_container>
            </itemS.container>

        </div>
    );
}

export default PostWrite