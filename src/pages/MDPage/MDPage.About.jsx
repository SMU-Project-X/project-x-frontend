// MDPage.About.jsx - 상품 수 동적 로딩 수정
import { useState, useEffect } from 'react';
import { productAPI } from '../../services/productApi'; // productApi import 추가
import * as S from './styled/MDPage.About.styled';

function About() {
  // FAQ 열림/닫힘 상태
  const [openFaq, setOpenFaq] = useState(null);
  
  // 상품 수 상태 추가
  const [productCount, setProductCount] = useState(50); // 기본값 50으로 설정
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  // 전체 상품 수 로드 함수
  const loadProductCount = async () => {
    try {
      setIsLoadingCount(true);
      // 첫 페이지만 가져와서 전체 개수 확인 (성능 최적화)
      const response = await productAPI.getAllProducts(0, 1);
      if (response.success && response.totalElements !== undefined) {
        setProductCount(response.totalElements);
      }
    } catch (error) {
      console.error('상품 수 로딩 실패:', error);
      // 에러 발생시 기본값 유지
    } finally {
      setIsLoadingCount(false);
    }
  };

  // 컴포넌트 마운트시 상품 수 로드
  useEffect(() => {
    loadProductCount();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQ 데이터 (기존과 동일)
  const faqData = [
    {
      question: "주문 후 배송까지 얼마나 걸리나요?",
      answer: "주문 확인 후 1-3일 내에 배송이 시작되며, 택배사에 따라 1-2일 추가 소요됩니다. 5만원 이상 주문시 무료배송입니다."
    },
    {
      question: "교환 및 환불이 가능한가요?",
      answer: "상품 수령 후 7일 이내에 교환 및 환불이 가능합니다. 단, 개봉하지 않은 상태여야 하며, 고객 변심에 의한 교환/환불시 배송비는 고객 부담입니다."
    },
    {
      question: "재입고 알림을 받을 수 있나요?",
      answer: "품절된 상품의 상세페이지에서 '재입고 알림'을 신청하시면 재입고시 SMS와 이메일로 알림을 드립니다."
    },
    {
      question: "회원가입 혜택이 있나요?",
      answer: "신규 회원가입시 10% 할인 쿠폰을 드리며, 구매 금액에 따라 적립금이 쌓입니다. VIP 회원에게는 추가 혜택을 제공합니다."
    },
    {
      question: "대량 주문이 가능한가요?",
      answer: "100개 이상 대량 주문시 별도 할인가를 제공합니다. 고객센터로 문의해주시면 상담을 도와드립니다."
    }
  ];

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Title>Project-X</S.Title>
        <S.Subtitle>
          창의적이고 혁신적인 고객을 통해<br/>
          특별한 경험과 가치를 전달하는 프로젝트입니다.
        </S.Subtitle>

        {/* 회사 소개 */}
        <S.Section>
          <S.SectionTitle>🏢 회사 소개</S.SectionTitle>
          <S.SectionContent>
            <p><strong>PIX</strong>는 2025년에 설립된 혁신적인 마케팅 기업입니다.</p>
            <p>
              우리는 단순한 상품이 아닌, 고객의 라이프스타일과 가치관을 반영하는 특별한 경험을 제공합니다. 
              각 상품마다 독특한 스토리와 의미를 담아 고객에게 감동과 만족을 선사하고 있습니다.
            </p>
            <p>
              <strong>우리의 미션:</strong> 창의성과 혁신을 통해 일상에 특별함을 더하는 것<br/>
              <strong>우리의 비전:</strong> 아이돌을 성장시켜 세계인의 사랑받는 브랜드가 되는 것
            </p>
          </S.SectionContent>

          {/* 프로젝트 통계 - 상품 수 동적으로 변경 */}
          <S.ProjectStats>
            <S.StatCard>
              <S.StatNumber>
                {isLoadingCount ? (
                  <span style={{ fontSize: '16px' }}>로딩중...</span>
                ) : (
                  `${productCount}+`
                )}
              </S.StatNumber>
              <S.StatLabel>상품 라인업</S.StatLabel>
            </S.StatCard>
            <S.StatCard>
              <S.StatNumber>10,000+</S.StatNumber>
              <S.StatLabel>만족한 고객</S.StatLabel>
            </S.StatCard>
            <S.StatCard>
              <S.StatNumber>100%</S.StatNumber>
              <S.StatLabel>고객 만족도</S.StatLabel>
            </S.StatCard>
            <S.StatCard>
              <S.StatNumber>24/7</S.StatNumber>
              <S.StatLabel>고객 지원</S.StatLabel>
            </S.StatCard>
          </S.ProjectStats>
        </S.Section>

        {/* 나머지 코드는 기존과 동일... */}
        {/* 팀 소개 */}
        <S.Section>
          <S.SectionTitle>👥 팀 소개</S.SectionTitle>
          <S.SectionContent>
            <p> pix팀이 모여 Project-X를 만들어가고 있습니다.</p>
          </S.SectionContent>
          
          <S.TeamGrid>
            <S.TeamMember>
              <S.MemberImage>팀장</S.MemberImage>
              <S.MemberName>박하나</S.MemberName>
              <S.MemberRole>랜딩/회원</S.MemberRole>
            </S.TeamMember>
            <S.TeamMember>
              <S.MemberImage>팀원</S.MemberImage>
              <S.MemberName>박준형</S.MemberName>
              <S.MemberRole>심리/커스텀</S.MemberRole>
            </S.TeamMember>
            <S.TeamMember>
              <S.MemberImage>팀원</S.MemberImage>
              <S.MemberName>천유준</S.MemberName>
              <S.MemberRole>챗봇</S.MemberRole>
            </S.TeamMember>
            <S.TeamMember>
              <S.MemberImage>팀원</S.MemberImage>
              <S.MemberName>유재은</S.MemberName>
              <S.MemberRole>촬영/프레임</S.MemberRole>
            </S.TeamMember>
              <S.TeamMember>
              <S.MemberImage>팀원</S.MemberImage>
              <S.MemberName>김민진</S.MemberName>
              <S.MemberRole>커뮤니티</S.MemberRole>
            </S.TeamMember>
              <S.TeamMember>
              <S.MemberImage>팀원</S.MemberImage>
              <S.MemberName>김민</S.MemberName>
              <S.MemberRole>MD</S.MemberRole>
            </S.TeamMember>
          </S.TeamGrid>
        </S.Section>

        {/* 구분선 */}
        <S.Divider />

        {/* FAQ */}
        <S.Section>
          <S.SectionTitle>❓ 자주 묻는 질문 (FAQ)</S.SectionTitle>
          <S.SectionContent>
            <p>고객님들이 자주 문의하시는 내용들을 정리했습니다.</p>
          </S.SectionContent>

          <S.FaqList>
            {faqData.map((faq, index) => (
              <S.FaqItem key={index}>
                <S.FaqQuestion 
                  isOpen={openFaq === index}
                  onClick={() => toggleFaq(index)}
                >
                  <span>Q. {faq.question}</span>
                  <S.FaqIcon isOpen={openFaq === index}>▼</S.FaqIcon>
                </S.FaqQuestion>
                <S.FaqAnswer isOpen={openFaq === index}>
                  <div>A. {faq.answer}</div>
                </S.FaqAnswer>
              </S.FaqItem>
            ))}
          </S.FaqList>
        </S.Section>

        {/* 고객센터 */}
        <S.Section>
          <S.SectionTitle>📞 고객센터</S.SectionTitle>
          <S.SectionContent>
            <p>궁금한 점이나 문의사항이 있으시면 언제든지 연락해주세요.</p>
          </S.SectionContent>

          <S.ContactGrid>
            <S.ContactCard>
              <S.ContactIcon>📞</S.ContactIcon>
              <S.ContactTitle>전화 문의</S.ContactTitle>
              <S.ContactInfo>
                1588-1234<br/>
                평일 09:00 - 18:00<br/>
                (점심시간 12:00-13:00 제외)
              </S.ContactInfo>
            </S.ContactCard>

            <S.ContactCard>
              <S.ContactIcon>✉️</S.ContactIcon>
              <S.ContactTitle>이메일 문의</S.ContactTitle>
              <S.ContactInfo>
                support@project-x.co.kr<br/>
                24시간 접수 가능<br/>
                평균 2시간 내 답변
              </S.ContactInfo>
            </S.ContactCard>

            <S.ContactCard>
              <S.ContactIcon>💬</S.ContactIcon>
              <S.ContactTitle>채팅 상담</S.ContactTitle>
              <S.ContactInfo>
                실시간 채팅 상담<br/>
                평일 09:00 - 18:00<br/>
                즉시 답변 가능
              </S.ContactInfo>
              <S.LinkButton>준비중</S.LinkButton>
            </S.ContactCard>

            <S.ContactCard>
              <S.ContactIcon>📍</S.ContactIcon>
              <S.ContactTitle>오프라인 매장</S.ContactTitle>
              <S.ContactInfo>
                서울 금천구 가산디지털2로 101<br/>
                서울 금천구 가산동 549-1<br/>
                
              </S.ContactInfo>
            </S.ContactCard>
          </S.ContactGrid>
        </S.Section>

        {/* 이용약관 및 정책 */}
        <S.Section>
          <S.SectionTitle>📋 이용약관 및 정책</S.SectionTitle>
          <S.SectionContent>
            <p>
              <S.LinkButton>이용약관</S.LinkButton>{' '}
              <S.LinkButton>개인정보처리방침</S.LinkButton>{' '}
              <S.LinkButton>환불정책</S.LinkButton>
            </p>
            <p style={{marginTop: '20px', fontSize: '14px', color: '#666'}}>
              © 2025 Project-X. All rights reserved.<br/>
              사업자등록번호: 123-45-67890 | 대표: 박하나 | 통신판매업신고: 2025-가산디지털2로-1234
            </p>
          </S.SectionContent>
        </S.Section>
      </S.ContentWrapper>
    </S.Container>
  );
}

export default About;