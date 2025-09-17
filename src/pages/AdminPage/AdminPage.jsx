// pages/AdminPage/AdminPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// 🎨 스타일 컴포넌트들 (문법 오류 수정)
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
  flex-wrap: wrap;
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
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
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
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

// 📊 차트 컴포넌트들 (문법 오류 수정)
const SimpleBarChart = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-around;
  height: 250px;
  border-bottom: 2px solid #e9ecef;
  padding: 0 20px;
  overflow-x: auto;
`;

const ChartBar = styled.div`
  min-width: 60px;
  background: linear-gradient(to top, ${props => props.$color || '#667eea'}, ${props => props.$color || '#764ba2'});
  border-radius: 4px 4px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 11px;
  font-weight: 600;
  position: relative;
  height: ${props => props.$height || '50%'};
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 5px;
  
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
  
  &::after {
    content: '${props => props.$label || ''}';
    position: absolute;
    bottom: -25px;
    color: #666;
    font-size: 10px;
    white-space: nowrap;
    transform: rotate(-45deg);
    transform-origin: center;
  }
`;

const ChartValue = styled.div`
  margin-top: 8px;
  font-size: 11px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

const SimpleDonutChart = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: ${props => {
    if (!props.$data || props.$data.length === 0) {
      return 'conic-gradient(#e9ecef 0deg 360deg)';
    }
    
    let accumulatedPercentage = 0;
    const gradientStops = props.$data.map((item, index) => {
      const colors = ['#667eea', '#fd79a8', '#74b9ff', '#00b894', '#fdcb6e'];
      const startDegree = accumulatedPercentage * 3.6;
      accumulatedPercentage += item.percentage;
      const endDegree = accumulatedPercentage * 3.6;
      return `${colors[index % colors.length]} ${startDegree}deg ${endDegree}deg`;
    }).join(', ');
    
    return `conic-gradient(${gradientStops})`;
  }};
  margin: 0 auto 20px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: white;
    border-radius: 50%;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
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
  font-size: 13px;
  padding: 5px;
  border-radius: 5px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
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
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const TableRow = styled.tr`
  transition: background 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #e9ecef;
  font-size: 13px;
`;

const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #172031;
  font-size: 13px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px;
  color: white;
  font-size: 18px;
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #e74c3c 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
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

const RefreshButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0,184,148,0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1) rotate(180deg);
  }
`;

function AdminPage() {
  const navigate = useNavigate();
  
  // 🔄 상태 관리
  const [adminUser, setAdminUser] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  // 🚀 API 호출 함수들
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // 1. 사용자 상태 확인
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

      // 2. 관리자 정보
      const userResponse = await axios.get(
        `http://localhost:8080/api/users/${statusResponse.data.userId}`, 
        { withCredentials: true }
      );
      setAdminUser(userResponse.data);

      // 3. 병렬로 통계 데이터 로드
      const [dashboardRes, categoryRes, userStatsRes, usersRes] = await Promise.all([
        axios.get('http://localhost:8080/api/admin/stats', { withCredentials: true }),
        axios.get('http://localhost:8080/api/admin/categories/stats', { withCredentials: true }),
        axios.get('http://localhost:8080/api/admin/users/stats', { withCredentials: true }),
        axios.get('http://localhost:8080/api/admin/users/list?page=0&size=15', { withCredentials: true })
      ]);

      setDashboardStats(dashboardRes.data);
      setCategoryStats(categoryRes.data);
      setUserStats(userStatsRes.data);
      setUsers(usersRes.data.users || []);
      setLastUpdated(new Date());

      console.log('✅ 실제 DB 데이터 로드 성공!', {
        dashboardStats: dashboardRes.data,
        categoryStats: categoryRes.data,
        userStats: userStatsRes.data,
        usersCount: usersRes.data.users?.length
      });

    } catch (error) {
      console.error('❌ 관리자 데이터 로드 실패:', error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('관리자 권한이 필요합니다.');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }
      
      // 🎯 개발용: API 실패 시 목업 데이터로 대체
      console.log('🔄 목업 데이터로 대체 중...');
      setAdminUser({ username: 'admin', name: '관리자', email: 'admin@projectx.com' });
      
      setDashboardStats({
        totalUsers: 156, 
        adminUsers: 4, 
        normalUsers: 152,
        totalProducts: 324, 
        totalCategories: 24,
        recentUsers: 23, 
        lowStockProducts: 12,
        averageRating: 4.2, 
        userGrowthRate: 15.3
      });
      
      setCategoryStats({
        categoryProductCount: [
          { categoryName: 'photobook', productCount: 45 },
          { categoryName: 'goods', productCount: 38 },
          { categoryName: 'sticker', productCount: 32 },
          { categoryName: 'bag', productCount: 28 },
          { categoryName: 'keyring', productCount: 25 },
          { categoryName: 'cup', productCount: 22 },
          { categoryName: 'pouch', productCount: 19 },
          { categoryName: 'note', productCount: 15 }
        ]
      });
      
      setUserStats({
        totalUsers: 156, 
        adminUsers: 4, 
        normalUsers: 152,
        adminPercentage: 2.6, 
        normalPercentage: 97.4,
        ageDistribution: {
          '10대': 12, '20대': 68, '30대': 45, '40대': 23, '50대+': 8
        }
      });
      
      setUsers([
        { userId: 1, username: 'admin', name: '관리자', email: 'admin@projectx.com', isAdmin: true, createdAt: '2024-01-01T00:00:00' },
        { userId: 2, username: 'user1', name: '홍길동', email: 'user1@example.com', isAdmin: false, createdAt: '2024-01-15T00:00:00' },
        { userId: 3, username: 'user2', name: '김철수', email: 'user2@example.com', isAdmin: false, createdAt: '2024-01-20T00:00:00' },
        { userId: 4, username: 'testuser', name: '테스트유저', email: 'test@test.com', isAdmin: false, createdAt: '2024-01-25T00:00:00' }
      ]);
      
      setError('🔌 API 연결 실패. 목업 데이터를 표시합니다. (백엔드 서버를 확인하세요)');
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  // 🎯 초기 데이터 로드
  useEffect(() => {
    fetchDashboardData();
  }, [navigate]);

  // 🎨 차트 데이터 변환 함수들
  const getCategoryChartData = () => {
    if (!categoryStats?.categoryProductCount) return [];
    
    const data = categoryStats.categoryProductCount.slice(0, 8); // 상위 8개만
    const maxCount = Math.max(...data.map(item => item.productCount));
    
    return data.map((item, index) => ({
      category: item.categoryName,
      count: item.productCount,
      height: maxCount > 0 ? `${(item.productCount / maxCount) * 85 + 15}%` : '15%',
      color: [
        '#667eea', '#fd79a8', '#74b9ff', '#00b894', 
        '#fdcb6e', '#e17055', '#a29bfe', '#fd79a8'
      ][index % 8]
    }));
  };

  const getUserTypeChartData = () => {
    if (!userStats) return [];
    
    return [
      { 
        label: `일반회원 (${userStats.normalPercentage}%)`, 
        percentage: userStats.normalPercentage, 
        count: userStats.normalUsers 
      },
      { 
        label: `관리자 (${userStats.adminPercentage}%)`, 
        percentage: userStats.adminPercentage, 
        count: userStats.adminUsers 
      }
    ];
  };

  // 🚪 로그아웃 처리
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
          <LoadingMessage>
            🔄 관리자 대시보드 데이터를 불러오는 중...
            <br />
            <small style={{ marginTop: '10px', display: 'block' }}>
              실제 Oracle DB에서 통계를 계산하고 있습니다
            </small>
          </LoadingMessage>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        {/* 🎯 헤더 */}
        <Header>
          <Title>🚀 실시간 관리자 대시보드</Title>
          <Subtitle>Project X 운영 현황 - 실제 DB 기반 통계 분석</Subtitle>
          
          <AdminInfo>
            <AdminBadge>🔐 ADMIN</AdminBadge>
            <span>환영합니다, {adminUser?.name || adminUser?.username}님</span>
            {lastUpdated && (
              <small style={{ color: '#666', fontSize: '12px' }}>
                마지막 업데이트: {lastUpdated.toLocaleTimeString()}
              </small>
            )}
          </AdminInfo>
        </Header>

        {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}

        {/* 📊 핵심 통계 카드들 */}
        <StatsGrid>
          <StatCard $color="#667eea">
            <StatNumber $color="#667eea">
              {dashboardStats?.totalUsers?.toLocaleString() || 0}
            </StatNumber>
            <StatLabel>전체 사용자</StatLabel>
            <StatChange $positive={dashboardStats?.userGrowthRate >= 0}>
              {dashboardStats?.userGrowthRate >= 0 ? '+' : ''}{dashboardStats?.userGrowthRate || 0}% (최근 30일)
            </StatChange>
          </StatCard>
          
          <StatCard $color="#00b894">
            <StatNumber $color="#00b894">
              {dashboardStats?.totalProducts?.toLocaleString() || 0}
            </StatNumber>
            <StatLabel>등록된 상품</StatLabel>
            <StatChange $positive>
              {dashboardStats?.totalCategories || 0}개 카테고리
            </StatChange>
          </StatCard>
          
          <StatCard $color="#fd79a8">
            <StatNumber $color="#fd79a8">
              {dashboardStats?.recentUsers?.toLocaleString() || 0}
            </StatNumber>
            <StatLabel>최근 30일 신규 가입</StatLabel>
            <StatChange $positive>📈 활발한 성장세</StatChange>
          </StatCard>
          
          <StatCard $color="#e17055">
            <StatNumber $color="#e17055">
              {dashboardStats?.lowStockProducts?.toLocaleString() || 0}
            </StatNumber>
            <StatLabel>재고 부족 상품</StatLabel>
            <StatChange $positive={false}>⚠️ 재고 관리 필요</StatChange>
          </StatCard>
          
          <StatCard $color="#74b9ff">
            <StatNumber $color="#74b9ff">
              ⭐{dashboardStats?.averageRating || 0}
            </StatNumber>
            <StatLabel>평균 상품 평점</StatLabel>
            <StatChange $positive>✨ 고객 만족도 우수</StatChange>
          </StatCard>
        </StatsGrid>

        {/* 📈 실시간 차트 섹션 */}
        <ChartsGrid>
          <ChartCard>
            <ChartTitle>
              <ChartIcon>📊</ChartIcon>
              카테고리별 상품 수 (실제 DB)
            </ChartTitle>
            <SimpleBarChart>
              {getCategoryChartData().map((item, index) => (
                <ChartBar 
                  key={index}
                  $height={item.height}
                  $color={item.color}
                  $label={item.category}
                  title={`${item.category}: ${item.count}개 상품`}
                >
                  <ChartValue>{item.count}</ChartValue>
                </ChartBar>
              ))}
            </SimpleBarChart>
            <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#666' }}>
              📈 실시간 DB 데이터 기반 통계
            </div>
          </ChartCard>

          <ChartCard>
            <ChartTitle>
              <ChartIcon>👥</ChartIcon>
              사용자 유형별 분포 (실시간)
            </ChartTitle>
            <SimpleDonutChart $data={getUserTypeChartData()} />
            <LegendGrid>
              {getUserTypeChartData().map((item, index) => (
                <LegendItem key={index}>
                  <LegendColor $color={['#667eea', '#fd79a8'][index]} />
                  {item.label} ({item.count}명)
                </LegendItem>
              ))}
            </LegendGrid>
          </ChartCard>
        </ChartsGrid>

        {/* 👤 실제 사용자 관리 테이블 */}
        <TableCard>
          <ChartTitle style={{ padding: '30px 30px 0' }}>
            <ChartIcon>👤</ChartIcon>
            실제 사용자 목록 ({users.length}명)
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
              </TableRow>
            </TableHeader>
            <tbody>
              {users.map(user => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.name || '-'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span style={{
                      background: user.isAdmin ? 
                        'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)' : 
                        'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {user.isAdmin ? '🔐 관리자' : '👤 일반'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableCard>

        {/* 🎮 액션 버튼들 */}
        <ButtonGroup>
          <Button $primary onClick={() => navigate('/MD')}>
            🛍️ 쇼핑몰 바로가기
          </Button>
          <Button onClick={() => navigate('/mypage')}>
            👤 내 프로필
          </Button>
          <Button onClick={handleLogout}>
            🚪 안전하게 로그아웃
          </Button>
        </ButtonGroup>

        {/* 🔄 실시간 새로고침 버튼 */}
        <RefreshButton 
          onClick={fetchDashboardData} 
          title="실시간 통계 새로고침"
        >
          🔄
        </RefreshButton>
      </ContentWrapper>
    </Container>
  );
}

export default AdminPage;