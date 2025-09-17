import React from "react";
import * as itemS from "../styled/CommunityPage.VoteBanner.style";
import image2 from "@/assets/images/CommunityPage/image2.png";

const BannerSlide = ({ title, date, img, onClick }) => {
  return (
    <itemS.vote_card onClick={onClick}>
      <itemS.vote_content>
        <h3 className="vote_title">{title}</h3>
        <p className="vote_date">{date}</p>
      </itemS.vote_content>
      <itemS.vote_img>
        <img src={img || "투표이미지"} alt={title} />
      </itemS.vote_img>
    </itemS.vote_card>
  );
};

export default BannerSlide;