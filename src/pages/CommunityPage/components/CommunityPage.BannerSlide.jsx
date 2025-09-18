import React, { useState } from "react";
import * as itemS from "../styled/CommunityPage.VoteBanner.style";
import image2 from "@/assets/images/CommunityPage/image2.png";
import { UseBanner } from "../hooks/CommunityPage.useBanner";

const BannerSlide = ({ bannerId,title, startDate,endDate, img, onClick }) => {

  return (
    <itemS.vote_card onClick={onClick}>
      <itemS.vote_content key={bannerId}>
        <h3 className="vote_title">{title}</h3>
        <p className="vote_date">{`${startDate} ~ ${endDate}`}</p>
      </itemS.vote_content>
      <itemS.vote_img>
        <img src={img || "투표이미지"} alt={title} />
      </itemS.vote_img>
    </itemS.vote_card>
  );
};

export default BannerSlide;