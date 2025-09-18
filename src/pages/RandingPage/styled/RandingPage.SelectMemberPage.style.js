import styled, { keyframes, css } from "styled-components";
import highlighterImg from '@/assets/images/RandingPage/highlighter.png';
import leftIcon from '@/assets/images/RandingPage/ChevronLeft.png';


export const SelectMemberPageContainer = styled.div `
    width: 100vw;
    background: linear-gradient(to bottom, #FAFAF7 0%,#D7E5F3 80%,#B3D1F0 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TitleWappper = styled.div`
    display: flex;
    width: 443px;
    height: 60px;
    flex-direction: column;
    justify-content: center;

    color: #172031;
    text-align: center;
    //font-family: Pretendard;
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-top: 118px;
`

export const MiddleTitleWapper = styled.div `
    display: flex;
    width: 535px;
    height: 140px;
    flex-direction: column;
    justify-content: center;
    margin-top: 80px;

    color: #172031;
    text-align: center;
    //font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: 80px; /* 200% */
    white-space: pre-line;
`;

export const contentWapper = styled.div`
    display: flex;
    width: 740px;
    height: 186px;
    flex-direction: column;
    justify-content: center;
    margin-top: 58px;

    color: #172031;
    text-align: center;
    //font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 300;
    line-height: 60px; /* 240% */

    white-space: pre-line;
`

export const SelectMemberContainer = styled.div`
    width: 1115px;
    height: 834.896px;
    margin-top: 125px;
`

export const SelectMemberTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const SelectMemeberTopText = styled.p`
    color: #172031;
    text-align: center;
    //font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

export const PsychoContentContainer = styled.div`
    width: 393px;
    height: 78px;
    flex-shrink: 0;
    aspect-ratio: 393/104;
    background-image: url(${highlighterImg});
    background-position: -839.863px -405px;
    background-size: 313.706% 625%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PsychoContentText = styled.p`
    color: #172031;
    text-align: center;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`
export const ArrowIcon = styled.div`
    width: 24px;
    height: 24px;
    background-image: url(${leftIcon});
`;

export const MembersContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const MemberCardContainer = styled.div`
    margin-top: 50px;
`

export const MemberImage = styled.img`
    width: 201.493px;
    height: 246.269px;
    border-radius: 40px;
    //border: 5px solid #843ED6;
    box-shadow: 0 4px 50px 0 rgba(0, 0, 0, 0.25);
`
export const MemberPersonalContainer = styled.div`
    margin-top: 50px ;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;

` 

export const MemeberPersonalWrapper = styled.div`
    width: 210.821px;
    height: 61.567px;
    border-radius: 45px;
    //border: 3px solid #843ED6;
    background: #F7F5FF;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #172031;
    //font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 30px;
`

export const SubmitBtnWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export const SubmitBtn = styled.div`
    width: 368.781px;
    height: 70.896px;

    border-radius: 45px;
    background: #F7F5FF;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #000;
    text-align: center;
    //font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    
`;