// MDPage.About.styled.js
import styled from 'styled-components';

// 컨테이너 스타일
export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
`;

export const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 80px);
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #172031;
  margin-bottom: 20px;
  font-family: 'Pretendard', sans-serif;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 50px;
  line-height: 1.6;
`;

// 섹션 스타일
export const Section = styled.section`
  margin-bottom: 60px;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 16px;
  border: 1px solid #e9ecef;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 30px;
  font-family: 'Pretendard', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SectionContent = styled.div`
  line-height: 1.8;
  color: #172031;
`;

// 팀 소개
export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

export const TeamMember = styled.div`
  text-align: center;
  padding: 30px 20px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

export const MemberImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e9ecef;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
`;

export const MemberName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 5px;
`;

export const MemberRole = styled.p`
  font-size: 14px;
  color: #74B9FF;
  font-weight: 500;
`;

// FAQ 스타일
export const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FaqItem = styled.div`
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  overflow: hidden;
`;

export const FaqQuestion = styled.div`
  padding: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #172031;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.isOpen ? '#f8f9fa' : 'white'};
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const FaqAnswer = styled.div`
  padding: ${props => props.isOpen ? '0 20px 20px 20px' : '0'};
  max-height: ${props => props.isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  font-size: 14px;
  line-height: 1.6;
  color: #666;
`;

export const FaqIcon = styled.span`
  font-size: 18px;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

// 연락처 정보
export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

export const ContactCard = styled.div`
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  text-align: center;
`;

export const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #74B9FF;
  color: white;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

export const ContactTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 10px;
`;

export const ContactInfo = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

// 프로젝트 정보
export const ProjectStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  background-color: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

export const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #74B9FF;
  margin-bottom: 10px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

// 링크
export const LinkButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #74B9FF;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #5DADE2;
  }
`;

// 구분선
export const Divider = styled.hr`
  border: none;
  height: 2px;
  background-color: #e9ecef;
  margin: 50px 0;
`;