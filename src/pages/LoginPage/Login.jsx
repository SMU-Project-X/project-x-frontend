// pages/LoginPage/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// 스타일 컴포넌트
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #172031;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 14px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #172031;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  background: #ffe6e6;
  color: #d63031;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #d63031;
`;

const SuccessMessage = styled.div`
  background: #e6ffe6;
  color: #00b894;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #00b894;
`;

const LinkSection = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
`;

const Link = styled.button`
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  margin: 0 10px;
  
  &:hover {
    color: #764ba2;
  }
`;

const TestAccountsInfo = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
`;

const TestTitle = styled.div`
  font-weight: 600;
  color: #172031;
  margin-bottom: 10px;
  font-size: 14px;
`;

const TestAccount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;
  color: #666;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

const QuickLoginButton = styled.button`
  background: #74b9ff;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  
  &:hover {
    background: #0984e3;
  }
`;

function Login() {
  const navigate = useNavigate();
  
  // 폼 상태
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  // UI 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 입력 핸들러
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // 입력시 에러 메시지 제거
  };

  // 로그인 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('사용자명과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        username: formData.username,
        password: formData.password
      }, {
        withCredentials: true // 세션 쿠키 포함
      });

      if (response.data.success) {
        setSuccess('로그인 성공! 페이지를 이동합니다...');
        
        // 사용자 정보를 localStorage에 저장 (선택사항)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', response.data.user.userId);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('isAdmin', response.data.user.isAdmin);
        
        // 1.5초 후 메인 페이지로 이동
        setTimeout(() => {
          navigate('/MD');
        }, 1500);
      } else {
        setError(response.data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('로그인 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 빠른 로그인 (테스트용)
  const handleQuickLogin = (username, password) => {
    setFormData({ username, password });
    // 폼 데이터 설정 후 자동 로그인
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 100);
  };

  return (
    <Container>
      <LoginCard>
        <Title>로그인</Title>
        <Subtitle>Project X에 오신 것을 환영합니다</Subtitle>
        
        {/* 테스트 계정 안내 */}
        <TestAccountsInfo>
          <TestTitle>💡 테스트 계정</TestTitle>
          <TestAccount>
            <span>관리자: admin / admin123</span>
            <QuickLoginButton onClick={() => handleQuickLogin('admin', 'admin123')}>
              빠른 로그인
            </QuickLoginButton>
          </TestAccount>
          <TestAccount>
            <span>일반회원: user1 / user123</span>
            <QuickLoginButton onClick={() => handleQuickLogin('user1', 'user123')}>
              빠른 로그인
            </QuickLoginButton>
          </TestAccount>
        </TestAccountsInfo>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>사용자명 또는 이메일</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="사용자명 또는 이메일을 입력하세요"
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              disabled={loading}
            />
          </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </Form>

        <LinkSection>
          <Link onClick={() => navigate('/MD')}>
            ← 메인으로 돌아가기
          </Link>
          {/* <Link onClick={() => navigate('/register')}>
            회원가입
          </Link> */}
        </LinkSection>
      </LoginCard>
    </Container>
  );
}

export default Login;