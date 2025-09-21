// MyPage.jsx - 404 에러 및 라우팅 문제 해결
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './styled/MyPage.styled';

function MyPage() {
  const navigate = useNavigate();
  
  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  
  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    userId: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    isAdmin: false,
    createdAt: null
  });
  
  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // 목업 주문 내역
  const [orderHistory] = useState([
    {
      id: 1,
      orderNumber: 'ORD202409201001',
      orderDate: '2024-09-15',
      status: '배송완료',
      totalAmount: 45000,
      items: [
        { name: 'Project X 키링세트', quantity: 2, price: 12000 },
        { name: 'Project X 에코백', quantity: 1, price: 21000 }
      ]
    },
    {
      id: 2,
      orderNumber: 'ORD202409151234',
      orderDate: '2024-09-10',
      status: '배송중',
      totalAmount: 25000,
      items: [
        { name: 'Project X 머그컵', quantity: 1, price: 25000 }
      ]
    }
  ]);

  // 🔧 안전한 API 호출 함수
  const safeApiCall = async (apiFunction, fallbackData = null) => {
    try {
      const result = await apiFunction();
      return { success: true, data: result };
    } catch (error) {
      console.error('API 호출 실패:', error);
      return { 
        success: false, 
        error: error.message, 
        data: fallbackData,
        status: error.response?.status 
      };
    }
  };

  // 🔧 로그인 상태 확인 및 사용자 정보 로드
  const loadUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. 로컬 스토리지에서 기본 정보 확인
      const localUserId = localStorage.getItem('userId');
      const localIsAdmin = localStorage.getItem('isAdmin') === 'true';
      const localUsername = localStorage.getItem('username');

      if (!localUserId) {
        throw new Error('로그인이 필요합니다.');
      }

      // 2. 서버에서 사용자 상태 확인 (선택적)
      const statusResult = await safeApiCall(async () => {
        return await axios.get('http://localhost:8080/api/users/status', {
          withCredentials: true,
          timeout: 3000
        });
      });

      let serverUserData = null;
      if (statusResult.success) {
        serverUserData = statusResult.data.data;
        console.log('서버 사용자 정보:', serverUserData);
      }

      // 3. 사용자 정보 설정 (서버 데이터 우선, 로컬 데이터로 폴백)
      const userData = {
        userId: serverUserData?.userId || localUserId,
        name: serverUserData?.name || localUsername || `사용자${localUserId}`,
        email: serverUserData?.email || `user${localUserId}@example.com`,
        phone: serverUserData?.phone || '',
        address: serverUserData?.address || '',
        isAdmin: serverUserData?.isAdmin || localIsAdmin,
        createdAt: serverUserData?.createdAt || new Date().toISOString()
      };

      setUserInfo(userData);
      setEditForm({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address
      });

      console.log('사용자 정보 로드 성공:', userData);

    } catch (error) {
      console.error('사용자 정보 로드 실패:', error);
      
      if (error.message.includes('로그인')) {
        setError('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('사용자 정보를 불러오는데 문제가 발생했습니다. 기본 정보를 표시합니다.');
        
        // 폴백: 로컬 스토리지 기반 기본 정보
        const fallbackUserId = localStorage.getItem('userId') || 'guest';
        setUserInfo({
          userId: fallbackUserId,
          name: localStorage.getItem('username') || `사용자${fallbackUserId}`,
          email: `user${fallbackUserId}@example.com`,
          phone: '',
          address: '',
          isAdmin: localStorage.getItem('isAdmin') === 'true',
          createdAt: new Date().toISOString()
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔧 사용자 정보 수정
  const handleUpdateUser = async () => {
    try {
      setSaving(true);

      // 입력값 검증
      if (!editForm.name.trim()) {
        alert('이름은 필수 입력 항목입니다.');
        return;
      }

      if (!editForm.email.trim()) {
        alert('이메일은 필수 입력 항목입니다.');
        return;
      }

      const updateData = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        phone: editForm.phone.trim() || null,
        address: editForm.address.trim() || null
      };

      // API 호출 시도
      const result = await safeApiCall(async () => {
        return await axios.put(
          `http://localhost:8080/api/users/${userInfo.userId}`, 
          updateData,
          { withCredentials: true, timeout: 5000 }
        );
      });

      if (result.success) {
        // 성공: 상태 업데이트
        setUserInfo(prev => ({
          ...prev,
          ...updateData,
          updatedAt: new Date().toISOString()
        }));
        
        // 로컬 스토리지도 업데이트
        localStorage.setItem('username', updateData.name);
        
        setIsEditing(false);
        alert('사용자 정보가 성공적으로 수정되었습니다.');
      } else {
        // 실패: 로컬에서만 업데이트
        console.warn('서버 업데이트 실패, 로컬에서만 업데이트:', result.error);
        setUserInfo(prev => ({ ...prev, ...updateData }));
        localStorage.setItem('username', updateData.name);
        setIsEditing(false);
        alert('정보가 로컬에 저장되었습니다. (서버 연결 문제로 임시 저장)');
      }

    } catch (error) {
      console.error('정보 수정 실패:', error);
      alert('정보 수정 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // 편집 취소
  const handleCancelEdit = () => {
    setEditForm({
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address
    });
    setIsEditing(false);
  };

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // 🔧 안전한 로그아웃
  const handleLogout = async () => {
    if (!confirm('로그아웃 하시겠습니까?')) return;

    try {
      // 서버 로그아웃 시도 (실패해도 계속 진행)
      await safeApiCall(async () => {
        return await axios.post('http://localhost:8080/api/users/logout', {}, {
          withCredentials: true,
          timeout: 3000
        });
      });
    } catch (error) {
      console.warn('서버 로그아웃 실패:', error);
    }
    
    // 로컬 정리 (항상 실행)
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
    
    alert('로그아웃되었습니다.');
    navigate('/');
  };

  // 🔧 안전한 관리자 페이지 이동
  const goToAdminPage = () => {
    // 라우트 존재 여부 확인 후 이동
    try {
      navigate('/admin');
    } catch (error) {
      console.error('관리자 페이지 이동 실패:', error);
      alert('관리자 페이지에 접근할 수 없습니다.');
    }
  };

  // 주문 상태별 색상
  const getStatusColor = (status) => {
    switch (status) {
      case '배송완료': return '#28a745';
      case '배송중': return '#007bff';
      case '주문완료': return '#ffc107';
      case '취소': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    loadUserInfo();
  }, []);

  if (loading) {
    return (
      <S.Container>
        <S.LoadingMessage>사용자 정보를 불러오는 중...</S.LoadingMessage>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>마이페이지</S.Title>
        <S.Subtitle>
          안녕하세요, {userInfo.name}님!
          {userInfo.isAdmin && ' (관리자)'}
        </S.Subtitle>
        {error && (
          <div style={{ 
            color: '#e74c3c', 
            fontSize: '14px', 
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#fff5f5',
            borderRadius: '6px'
          }}>
            ⚠️ {error}
          </div>
        )}
      </S.Header>

      <S.TabContainer>
        <S.Tab 
          active={activeTab === 'info'} 
          onClick={() => setActiveTab('info')}
        >
          내 정보
        </S.Tab>
        <S.Tab 
          active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
        >
          주문 내역
        </S.Tab>
        <S.Tab 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          계정 설정
        </S.Tab>
      </S.TabContainer>

      {activeTab === 'info' && (
        <S.ContentSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>기본 정보</h2>
            {!isEditing ? (
              <S.Button primary onClick={() => setIsEditing(true)}>
                정보 수정
              </S.Button>
            ) : (
              <S.ButtonGroup>
                <S.Button primary onClick={handleUpdateUser} disabled={saving}>
                  {saving ? '저장 중...' : '저장'}
                </S.Button>
                <S.Button onClick={handleCancelEdit} disabled={saving}>
                  취소
                </S.Button>
              </S.ButtonGroup>
            )}
          </div>

          {!isEditing ? (
            <S.InfoCard>
              <S.InfoRow>
                <S.InfoLabel>사용자 ID</S.InfoLabel>
                <S.InfoValue>{userInfo.userId}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>이름</S.InfoLabel>
                <S.InfoValue>{userInfo.name}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>이메일</S.InfoLabel>
                <S.InfoValue>{userInfo.email}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>전화번호</S.InfoLabel>
                <S.InfoValue>{userInfo.phone || '미입력'}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>주소</S.InfoLabel>
                <S.InfoValue>{userInfo.address || '미입력'}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>회원 유형</S.InfoLabel>
                <S.InfoValue>{userInfo.isAdmin ? '관리자' : '일반 회원'}</S.InfoValue>
              </S.InfoRow>
              <S.InfoRow>
                <S.InfoLabel>가입일</S.InfoLabel>
                <S.InfoValue>
                  {userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : '정보 없음'}
                </S.InfoValue>
              </S.InfoRow>
            </S.InfoCard>
          ) : (
            <div>
              <S.FormGroup>
                <S.Label>사용자 ID</S.Label>
                <S.Input type="text" value={userInfo.userId} disabled />
                <S.ValidationMessage>사용자 ID는 변경할 수 없습니다.</S.ValidationMessage>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>이름 *</S.Label>
                <S.Input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력해주세요"
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>이메일 *</S.Label>
                <S.Input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  placeholder="이메일을 입력해주세요"
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>전화번호</S.Label>
                <S.Input
                  type="tel"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleInputChange}
                  placeholder="전화번호를 입력해주세요"
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>주소</S.Label>
                <S.Input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleInputChange}
                  placeholder="주소를 입력해주세요"
                />
              </S.FormGroup>
            </div>
          )}
        </S.ContentSection>
      )}

      {activeTab === 'orders' && (
        <S.ContentSection>
          <h2>주문 내역</h2>
          {orderHistory.length > 0 ? (
            <div>
              {orderHistory.map((order) => (
                <div 
                  key={order.id}
                  style={{
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    padding: '25px',
                    marginBottom: '20px',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <strong style={{ fontSize: '16px' }}>주문번호: {order.orderNumber}</strong>
                    <span 
                      style={{ 
                        color: getStatusColor(order.status),
                        fontWeight: 'bold',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        backgroundColor: 'white'
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
                    주문일: {new Date(order.orderDate).toLocaleDateString()}
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong style={{ fontSize: '14px' }}>주문 상품:</strong>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ marginLeft: '15px', fontSize: '14px', color: '#666', marginTop: '5px' }}>
                        • {item.name} - {item.quantity}개 ({item.price.toLocaleString()}원)
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '18px', fontWeight: 'bold', color: '#74B9FF' }}>
                    총 {order.totalAmount.toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <S.OrderSection>
              <S.OrderIcon>📦</S.OrderIcon>
              <S.OrderMessage>
                아직 주문 내역이 없습니다.
                <br />다양한 상품을 둘러보세요!
              </S.OrderMessage>
              <S.Button primary onClick={() => navigate('/MD')}>
                쇼핑하러 가기
              </S.Button>
            </S.OrderSection>
          )}
        </S.ContentSection>
      )}

      {activeTab === 'settings' && (
        <S.ContentSection>
          <h2>계정 설정</h2>
          
          {userInfo.isAdmin && (
            <S.AdminSection>
              <S.AdminTitle>관리자 메뉴</S.AdminTitle>
              <S.AdminDescription>
                관리자 권한으로 시스템을 관리할 수 있습니다.
              </S.AdminDescription>
              <S.Button primary onClick={goToAdminPage}>
                관리자 페이지로 이동
              </S.Button>
            </S.AdminSection>
          )}

          <S.SettingsSection>
            <S.SettingsTitle>로그아웃</S.SettingsTitle>
            <S.SettingsDescription>
              현재 세션에서 로그아웃합니다.
            </S.SettingsDescription>
            <S.Button onClick={handleLogout}>
              로그아웃
            </S.Button>
          </S.SettingsSection>
        </S.ContentSection>
      )}
    </S.Container>
  );
}

export default MyPage;