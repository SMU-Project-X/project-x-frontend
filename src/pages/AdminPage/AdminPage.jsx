// pages/AdminPage/AdminPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// 스타일 컴포넌트
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #172031;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const AdminBadge = styled.div`
  background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
  border-left: 5px solid ${props => props.$color || '#667eea'};
`;

const StatNumber = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: ${props => props.$color || '#667eea'};
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const StatChange = styled.div`
  font-size: 12px;
  color: ${props => props.$positive ? '#00b894' : '#d63031'};
  margin-top: 5px;
  font-weight: 600;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const ChartCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const ChartTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChartIcon = styled.span`
  font-size: 24px;
`;

// 간단한 차트 컴포넌트 (실제로는 Chart.js나 Recharts 사용 권장)
const SimpleBarChart = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-around;
  height: 200px;
  border-bottom: 2px solid #e9ecef;
  padding: 0 20px;
`;

const ChartBar = styled.div`
  width: 40px;
  background: linear-gradient(to top, ${props => props.$color || '#667eea'}, ${props => props.$color || '#764ba2'});
  border-radius: 4px 4px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  position: relative;
  height: ${props => props.$height || '50%'};
  
  &::after {
    content: '${props => props.$label || ''}';
    position: absolute;
    bottom: -25px;
    color: #666;
    font-size: 11px;
  }
`;

const ChartValue = styled.div`
  margin-top: 5px;
  font-size: 11px;
`;

const SimpleDonutChart = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    #667eea 0deg ${props => props.$data[0] * 3.6}deg,
    #fd79a8 ${props => props.$data[0] * 3.6}deg ${props => (props.$data[0] + props.$data[1]) * 3.6}deg,
    #74b9ff ${props => (props.$data[0] + props.$data[1]) * 3.6}deg ${props => (props.$data[0] + props.$data[1] + props.$data[2]) * 3.6}deg,
    #00b894 ${props => (props.$data[0] + props.$data[1] + props.$data[2]) * 3.6}deg 360deg
  );
  margin: 0 auto 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: white;
    border-radius: 50%;
  }
`;

const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${props => props.$color};
`;

const TableCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #f8f9fa;
`;

const TableRow = styled.tr`
  &:hover {
    background: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  font-size: 14px;
`;

const TableHeaderCell = styled.th`
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #172031;
  font-size: 14px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  background: ${props => 
    props.$type === 'view' ? '#74b9ff' :
    props.$type === 'edit' ? '#00b894' :
    props.$type === 'delete' ? '#d63031' : '#667eea'
  };
  color: white;
  margin-right: 5px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.$primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
  ` : `
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
    
    &:hover {
      background: #667eea;
      color: white;
    }
  `}
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: white;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  background: #ffe6e6;
  color: #d63031;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
`;

function AdminPage() {
  const navigate = useNavigate();
  
  // 상태 관리
  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 하드코딩된 통계 데이터 (실제로는 백엔드 API에서 가져옴)
  const [chartData] = useState({
    salesByCategory: [
      { category: 'BTS', value: 45, height: '90%', color: '#667eea' },
      { category: 'BP', value: 38, height: '76%', color: '#fd79a8' },
      { category: 'IVE', value: 32, height: '64%', color: '#74b9ff' },
      { category: 'NJ', value: 28, height: '56%', color: '#00b894' },
      { category: 'etc', value: 15, height: '30%', color: '#fdcb6e' }
    ],
    userTypes: [65, 20, 10, 5] // 일반회원, VIP, 프리미엄, 관리자 비율
  });

  // 관리자 인증 및 데이터 로드
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        // 세션 확인
        const statusResponse = await axios.get('http://localhost:8080/api/users/status', {
          withCredentials: true
        });

        if (!statusResponse.data.isLoggedIn) {
          navigate('/login');
          return;
        }

        if (!statusResponse.data.isAdmin) {
          navigate('/mypage');
          return;
        }

        // 관리자 정보 로드
        const userResponse = await axios.get(
          `http://localhost:8080/api/users/${statusResponse.data.userId}`, 
          { withCredentials: true }
        );

        setAdminUser(userResponse.data);

        // 사용자 통계 로드
        const statsResponse = await axios.get('/api/users/admin/stats', {
          withCredentials: true
        });

        setStats(statsResponse.data);

        // 전체 사용자 목록 로드
        const usersResponse = await axios.get('/api/users/admin/all', {
          withCredentials: true
        });

        setUsers(usersResponse.data);

      } catch (error) {
        console.error('관리자 데이터 로드 실패:', error);
        
        // 임시 데이터로 대체 (백엔드 연결 안될 때)
        setAdminUser({
          username: 'admin',
          name: '관리자',
          email: 'admin@projectx.com'
        });
        
        setStats({
          totalUsers: 156,
          normalUsers: 142,
          adminUsers: 4
        });

        setUsers([
          { userId: 1, username: 'admin', name: '관리자', email: 'admin@projectx.com', isAdmin: true, createdAt: '2024-01-01' },
          { userId: 2, username: 'user1', name: '홍길동', email: 'user1@example.com', isAdmin: false, createdAt: '2024-01-15' },
          { userId: 3, username: 'user2', name: '김철수', email: 'user2@example.com', isAdmin: false, createdAt: '2024-01-20' }
        ]);
        
        if (error.response?.status === 401 || error.response?.status === 403) {
          setError('관리자 권한이 필요합니다.');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [navigate]);

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/users/logout', {}, {
        withCredentials: true
      });
      
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      localStorage.clear();
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <LoadingMessage>관리자 데이터를 불러오는 중...</LoadingMessage>
        </ContentWrapper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ContentWrapper>
          <ErrorMessage>{error}</ErrorMessage>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        {/* 헤더 */}
        <Header>
          <Title>관리자 대시보드</Title>
          <Subtitle>Project X 운영 현황을 관리하세요</Subtitle>
          
          <AdminInfo>
            <AdminBadge>🔐 ADMIN</AdminBadge>
            <span>환영합니다, {adminUser?.name || adminUser?.username}님</span>
          </AdminInfo>
        </Header>

        {/* 통계 카드 */}
        <StatsGrid>
          <StatCard $color="#667eea">
            <StatNumber $color="#667eea">{stats?.totalUsers || 156}</StatNumber>
            <StatLabel>전체 사용자</StatLabel>
            <StatChange $positive>+12% (이번 달)</StatChange>
          </StatCard>
          
          <StatCard $color="#00b894">
            <StatNumber $color="#00b894">₩2,847,000</StatNumber>
            <StatLabel>이번 달 매출</StatLabel>
            <StatChange $positive>+8.3% (전월 대비)</StatChange>
          </StatCard>
          
          <StatCard $color="#fd79a8">
            <StatNumber $color="#fd79a8">1,248</StatNumber>
            <StatLabel>이번 달 주문</StatLabel>
            <StatChange $positive>+15.2% (전월 대비)</StatChange>
          </StatCard>
          
          <StatCard $color="#74b9ff">
            <StatNumber $color="#74b9ff">324</StatNumber>
            <StatLabel>등록된 상품</StatLabel>
            <StatChange $positive>+6 (이번 주)</StatChange>
          </StatCard>
        </StatsGrid>

        {/* 차트 */}
        <ChartsGrid>
          <ChartCard>
            <ChartTitle>
              <ChartIcon>📊</ChartIcon>
              카테고리별 매출
            </ChartTitle>
            <SimpleBarChart>
              {chartData.salesByCategory.map((item, index) => (
                <ChartBar 
                  key={index}
                  $height={item.height}
                  $color={item.color}
                  $label={item.category}
                >
                  <ChartValue>{item.value}%</ChartValue>
                </ChartBar>
              ))}
            </SimpleBarChart>
          </ChartCard>

          <ChartCard>
            <ChartTitle>
              <ChartIcon>👥</ChartIcon>
              사용자 유형별 분포
            </ChartTitle>
            <SimpleDonutChart $data={chartData.userTypes} />
            <LegendGrid>
              <LegendItem>
                <LegendColor $color="#667eea" />
                일반회원 (65%)
              </LegendItem>
              <LegendItem>
                <LegendColor $color="#fd79a8" />
                VIP회원 (20%)
              </LegendItem>
              <LegendItem>
                <LegendColor $color="#74b9ff" />
                프리미엄 (10%)
              </LegendItem>
              <LegendItem>
                <LegendColor $color="#00b894" />
                관리자 (5%)
              </LegendItem>
            </LegendGrid>
          </ChartCard>
        </ChartsGrid>

        {/* 사용자 관리 테이블 */}
        <TableCard>
          <ChartTitle style={{ padding: '30px 30px 0' }}>
            <ChartIcon>👤</ChartIcon>
            사용자 관리
          </ChartTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>사용자명</TableHeaderCell>
                <TableHeaderCell>이름</TableHeaderCell>
                <TableHeaderCell>이메일</TableHeaderCell>
                <TableHeaderCell>권한</TableHeaderCell>
                <TableHeaderCell>가입일</TableHeaderCell>
                <TableHeaderCell>액션</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {users.slice(0, 10).map(user => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.name || '-'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span style={{
                      background: user.isAdmin ? '#fd79a8' : '#74b9ff',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {user.isAdmin ? '관리자' : '일반'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <ActionButton $type="view">보기</ActionButton>
                    <ActionButton $type="edit">수정</ActionButton>
                    {!user.isAdmin && <ActionButton $type="delete">삭제</ActionButton>}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableCard>

        {/* 버튼 그룹 */}
        <ButtonGroup>
          <Button $primary onClick={() => navigate('/MD')}>
            🛍️ 쇼핑몰 보기
          </Button>
          <Button onClick={() => navigate('/mypage')}>
            👤 내 정보
          </Button>
          <Button onClick={handleLogout}>
            🚪 로그아웃
          </Button>
        </ButtonGroup>
      </ContentWrapper>
    </Container>
  );
}

export default AdminPage;