import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// 스타일 컴포넌트
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Pretendard', sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #172031;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 30px;
`;

const Tab = styled.button`
  padding: 15px 30px;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  color: ${props => props.active ? '#007bff' : '#666'};
  border-bottom-color: ${props => props.active ? '#007bff' : 'transparent'};
  
  &:hover {
    color: #007bff;
  }
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 16px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 16px;
  color: #dc3545;
  background: #f8d7da;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    color: #6c757d;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;
  
  ${props => props.primary ? `
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  ` : `
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #545b62;
    }
  `}
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const InfoCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #333;
  min-width: 120px;
`;

const InfoValue = styled.span`
  color: #666;
  flex: 1;
  text-align: right;
`;

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
    username: '',
    email: '',
    name: '',
    nickname: '',
    age: '',
    address: '',
    isAdmin: false,
    createdAt: null,
    updatedAt: null
  });
  
  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    nickname: '',
    age: '',
    address: '',
    email: ''
  });

  // 🔥 로그인 상태 확인 및 사용자 정보 로드
  const loadUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. 로그인 상태 확인
      const statusResponse = await axios.get('http://localhost:8080/api/users/status', {
        withCredentials: true
      });

      if (!statusResponse.data.isLoggedIn) {
        throw new Error('로그인이 필요합니다.');
      }

      const { userId } = statusResponse.data;

      // 2. 사용자 상세 정보 조회
      const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}`, {
        withCredentials: true
      });

      if (userResponse.data) {
        const userData = userResponse.data;
        setUserInfo(userData);
        
        // 편집 폼 초기화
        setEditForm({
          name: userData.name || '',
          nickname: userData.nickname || '',
          age: userData.age || '',
          address: userData.address || '',
          email: userData.email || ''
        });
        
        console.log('사용자 정보 로드 성공:', userData);
      } else {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

    } catch (error) {
      console.error('사용자 정보 로드 실패:', error);
      
      if (error.response?.status === 401 || error.message.includes('로그인')) {
        setError('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else if (error.response?.status === 403) {
        setError('접근 권한이 없습니다.');
      } else if (error.response?.status === 404) {
        setError('사용자 정보를 찾을 수 없습니다.');
      } else {
        setError(`사용자 정보를 불러오는데 실패했습니다: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 사용자 정보 수정
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

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editForm.email)) {
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
      }

      // 나이 검증 (선택사항이지만 입력했다면 유효해야 함)
      if (editForm.age && (isNaN(editForm.age) || editForm.age < 1 || editForm.age > 150)) {
        alert('올바른 나이를 입력해주세요.');
        return;
      }

      const updateData = {
        name: editForm.name.trim(),
        nickname: editForm.nickname.trim() || null,
        age: editForm.age ? parseInt(editForm.age) : null,
        address: editForm.address.trim() || null,
        email: editForm.email.trim()
      };

      console.log('사용자 정보 수정 요청:', updateData);

      const response = await axios.put(
        `http://localhost:8080/api/users/${userInfo.userId}`, 
        updateData,
        { withCredentials: true }
      );

      if (response.data) {
        setUserInfo(response.data);
        setIsEditing(false);
        alert('사용자 정보가 성공적으로 수정되었습니다.');
        console.log('사용자 정보 수정 성공:', response.data);
      }

    } catch (error) {
      console.error('사용자 정보 수정 실패:', error);
      
      if (error.response?.status === 400) {
        alert(`입력값 오류: ${error.response.data.message || '잘못된 입력값입니다.'}`);
      } else if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else if (error.response?.status === 403) {
        alert('수정 권한이 없습니다.');
      } else {
        alert(`정보 수정 중 오류가 발생했습니다: ${error.message}`);
      }
    } finally {
      setSaving(false);
    }
  };

  // 편집 취소
  const handleCancelEdit = () => {
    setEditForm({
      name: userInfo.name || '',
      nickname: userInfo.nickname || '',
      age: userInfo.age || '',
      address: userInfo.address || '',
      email: userInfo.email || ''
    });
    setIsEditing(false);
  };

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    if (!confirm('로그아웃 하시겠습니까?')) return;

    try {
      await axios.post('http://localhost:8080/api/users/logout', {}, {
        withCredentials: true
      });
      
      // 로컬 스토리지 정리
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('isAdmin');
      
      alert('로그아웃되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  // 회원탈퇴 처리 (관리자는 탈퇴 불가)
  const handleDeleteAccount = async () => {
    if (userInfo.isAdmin) {
      alert('관리자 계정은 탈퇴할 수 없습니다.');
      return;
    }

    const confirmMessage = '정말로 회원탈퇴를 하시겠습니까?\n탈퇴 후에는 모든 데이터가 삭제되며 복구할 수 없습니다.';
    if (!confirm(confirmMessage)) return;

    const finalConfirm = '마지막 확인입니다. 정말로 탈퇴하시겠습니까?';
    if (!confirm(finalConfirm)) return;

    try {
      await axios.delete(`http://localhost:8080/api/users/${userInfo.userId}`, {
        withCredentials: true
      });
      
      // 로컬 스토리지 정리
      localStorage.clear();
      
      alert('회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.');
      navigate('/');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      alert('회원탈퇴 처리 중 오류가 발생했습니다.');
    }
  };

  // 관리자 페이지로 이동
  const goToAdminPage = () => {
    navigate('/admin');
  };

  // 컴포넌트 마운트 시 사용자 정보 로드
  useEffect(() => {
    loadUserInfo();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingMessage>사용자 정보를 불러오는 중...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>마이페이지</Title>
        <Subtitle>
          안녕하세요, {userInfo.name || userInfo.username}님!
          {userInfo.isAdmin && ' (관리자)'}
        </Subtitle>
      </Header>

      <TabContainer>
        <Tab 
          active={activeTab === 'info'} 
          onClick={() => setActiveTab('info')}
        >
          내 정보
        </Tab>
        <Tab 
          active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
        >
          주문 내역
        </Tab>
        <Tab 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          계정 설정
        </Tab>
      </TabContainer>

      {activeTab === 'info' && (
        <ContentSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>기본 정보</h2>
            {!isEditing ? (
              <Button primary onClick={() => setIsEditing(true)}>
                정보 수정
              </Button>
            ) : (
              <div>
                <Button primary onClick={handleUpdateUser} disabled={saving}>
                  {saving ? '저장 중...' : '저장'}
                </Button>
                <Button onClick={handleCancelEdit} disabled={saving}>
                  취소
                </Button>
              </div>
            )}
          </div>

          {!isEditing ? (
            <InfoCard>
              <InfoRow>
                <InfoLabel>아이디</InfoLabel>
                <InfoValue>{userInfo.username}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>이름</InfoLabel>
                <InfoValue>{userInfo.name || '미입력'}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>닉네임</InfoLabel>
                <InfoValue>{userInfo.nickname || '미입력'}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>이메일</InfoLabel>
                <InfoValue>{userInfo.email || '미입력'}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>나이</InfoLabel>
                <InfoValue>{userInfo.age ? `${userInfo.age}세` : '미입력'}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>주소</InfoLabel>
                <InfoValue>{userInfo.address || '미입력'}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>회원 유형</InfoLabel>
                <InfoValue>{userInfo.isAdmin ? '관리자' : '일반 회원'}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>가입일</InfoLabel>
                <InfoValue>
                  {userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : '정보 없음'}
                </InfoValue>
              </InfoRow>
            </InfoCard>
          ) : (
            <div>
              <FormGroup>
                <Label>아이디</Label>
                <Input 
                  type="text" 
                  value={userInfo.username} 
                  disabled 
                  style={{ backgroundColor: '#f8f9fa' }}
                />
                <small style={{ color: '#666' }}>아이디는 변경할 수 없습니다.</small>
              </FormGroup>

              <FormGroup>
                <Label>이름 *</Label>
                <Input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력해주세요"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>닉네임</Label>
                <Input
                  type="text"
                  name="nickname"
                  value={editForm.nickname}
                  onChange={handleInputChange}
                  placeholder="닉네임을 입력해주세요"
                />
              </FormGroup>

              <FormGroup>
                <Label>이메일 *</Label>
                <Input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  placeholder="이메일을 입력해주세요"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>나이</Label>
                <Input
                  type="number"
                  name="age"
                  value={editForm.age}
                  onChange={handleInputChange}
                  placeholder="나이를 입력해주세요"
                  min="1"
                  max="150"
                />
              </FormGroup>

              <FormGroup>
                <Label>주소</Label>
                <Input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleInputChange}
                  placeholder="주소를 입력해주세요"
                />
              </FormGroup>
            </div>
          )}
        </ContentSection>
      )}

      {activeTab === 'orders' && (
        <ContentSection>
          <h2>주문 내역</h2>
          <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
            주문 내역 기능은 준비 중입니다.
            <br />
            실제 환경에서는 사용자의 주문 내역을 표시합니다.
          </div>
        </ContentSection>
      )}

      {activeTab === 'settings' && (
        <ContentSection>
          <h2>계정 설정</h2>
          
          {userInfo.isAdmin && (
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '10px', color: '#0056b3' }}>관리자 메뉴</h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                관리자 권한으로 시스템을 관리할 수 있습니다.
              </p>
              <Button primary onClick={goToAdminPage}>
                관리자 페이지로 이동
              </Button>
            </div>
          )}

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>로그아웃</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              현재 세션에서 로그아웃합니다.
            </p>
            <Button onClick={handleLogout}>
              로그아웃
            </Button>
          </div>

          {!userInfo.isAdmin && (
            <div style={{ 
              marginBottom: '30px', 
              padding: '20px', 
              backgroundColor: '#fff5f5', 
              borderRadius: '8px',
              border: '1px solid #fed7d7'
            }}>
              <h3 style={{ marginBottom: '15px', color: '#c53030' }}>회원탈퇴</h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                회원탈퇴 시 모든 개인정보와 서비스 이용 기록이 삭제됩니다.
                <br />
                삭제된 데이터는 복구할 수 없으니 신중하게 결정해주세요.
              </p>
              <Button 
                style={{ backgroundColor: '#dc3545' }}
                onClick={handleDeleteAccount}
              >
                회원탈퇴
              </Button>
            </div>
          )}
        </ContentSection>
      )}
    </Container>
  );
}

export default MyPage;