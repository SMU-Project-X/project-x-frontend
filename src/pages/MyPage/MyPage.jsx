// MyPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { selectedCharactersState } from '@/recoil/characterAtom';
import { characters } from '@/assets/data/characters';
import { traits } from '@/assets/data/traits';
import { mbtiOptions } from '@/assets/data/mbtiOptions';
import * as S from './styled/MyPage.styled';

const TRAIT_SLOTS = 2;

const ensureTraits = (list = []) => {
  const next = [...list];
  while (next.length < 3) next.push(null);
  return next.slice(0, 3);
};

const ensureSlotShape = (slot = {}) => ({
  img: slot?.img ?? null,
  name: slot?.name ?? null,
  traits: ensureTraits(slot?.traits ?? []),
  mbti: slot?.mbti ?? null,
});

function MyPage({ initialTab = 'info' }) {
  const navigate = useNavigate();
  
  // 상태 관리
  const [selectedCharacters, setSelectedCharacters] = useRecoilState(selectedCharactersState);
  const [dialog, setDialog] = useState({ slotIndex: null, mode: null, traitIndex: null });

  const normalizedSlots = useMemo(() => selectedCharacters.map(ensureSlotShape), [selectedCharacters]);

  const characterUsage = useMemo(
    () =>
      normalizedSlots
        .map((slot, idx) => (slot?.name ? { name: slot.name, index: idx } : null))
        .filter(Boolean),
    [normalizedSlots]
  );

  const traitUsage = useMemo(() => {
    const usage = [];
    normalizedSlots.forEach((slot, slotIdx) => {
      ensureTraits(slot?.traits).forEach((traitName, traitIdx) => {
        if (traitName) usage.push({ traitName, slotIdx, traitIdx });
      });
    });
    return usage;
  }, [normalizedSlots]);

  const openCharacterModal = (slotIndex) => setDialog({ slotIndex, mode: 'character', traitIndex: null });
  const openTraitModal = (slotIndex, traitIndex) => setDialog({ slotIndex, mode: 'trait', traitIndex });
  const openMbtiModal = (slotIndex) => setDialog({ slotIndex, mode: 'mbti', traitIndex: null });
  const closeDialog = () => setDialog({ slotIndex: null, mode: null, traitIndex: null });

  const handleSave = () => {
    setSelectedCharacters(normalizedSlots.map(ensureSlotShape));
    closeDialog();
    navigate('/home');
  };

  const handleCharacterSelect = (character) => {
    if (dialog.slotIndex === null) return;
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== dialog.slotIndex) return slot;
        const base = ensureSlotShape(slot);
        const preservedTail = base.traits.slice(TRAIT_SLOTS);
        const resetTraits = [...Array(TRAIT_SLOTS).fill(null), ...preservedTail];
        return {
          ...base,
          ...character,
          img: character.img ?? null,
          name: character.name ?? null,
          traits: resetTraits,
          mbti: null,
        };
      })
    );
    closeDialog();
  };

  const handleClearSlot = (slotIndex) => {
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => (idx === slotIndex ? ensureSlotShape({}) : slot))
    );
  };

  const handleTraitSelect = (traitName) => {
    if (dialog.slotIndex === null || dialog.traitIndex === null) return;
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== dialog.slotIndex) return slot;
        const base = ensureSlotShape(slot);
        const nextTraits = [...base.traits];
        nextTraits[dialog.traitIndex] = traitName;
        return { ...base, traits: nextTraits };
      })
    );
    closeDialog();
  };

  const handleTraitClear = (slotIndex, traitIndex) => {
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== slotIndex) return slot;
        const base = ensureSlotShape(slot);
        const nextTraits = [...base.traits];
        nextTraits[traitIndex] = null;
        return { ...base, traits: nextTraits };
      })
    );
  };

  const handleMbtiSelect = (mbti) => {
    if (dialog.slotIndex === null) return;
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== dialog.slotIndex) return slot;
        const base = ensureSlotShape(slot);
        return { ...base, mbti };
      })
    );
    closeDialog();
  };

  const handleMbtiClear = (slotIndex) => {
    setSelectedCharacters((prev) =>
      prev.map((slot, idx) => {
        if (idx !== slotIndex) return slot;
        const base = ensureSlotShape(slot);
        return { ...base, mbti: null };
      })
    );
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  
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
        email: serverUserData?.email || `${localUserId}@example.com`,
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
          멤버 선택
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
          <S.MainMyPageContainer>
            <S.PageHeader>
              <S.PageTitle>멤버 선택 수정</S.PageTitle>
            </S.PageHeader>

            <S.SlotsGrid>
              {normalizedSlots.map((slot, idx) => {
                const traitsForSlot = ensureTraits(slot?.traits).slice(0, TRAIT_SLOTS);
                const slotLabel = `슬롯 ${idx + 1}`;
                return (
                  <S.SlotCard key={idx}>
                    <S.SlotHeader>
                      <div>
                        <S.SlotTitle>{slotLabel}</S.SlotTitle>
                        <S.SlotSubtitle>{slot?.name || '선택된 멤버 없음'}</S.SlotSubtitle>
                      </div>
                      {slot?.img ? (
                        <S.Avatar src={slot.img} alt={slot?.name || '선택된 멤버'} />
                      ) : (
                        <S.EmptyAvatar>?</S.EmptyAvatar>
                      )}
                    </S.SlotHeader>

                    <S.CardSection>
                      <S.SectionTitle>멤버</S.SectionTitle>
                      <S.ButtonRow>
                        <S.PrimaryButton type="button" onClick={() => openCharacterModal(idx)}>
                          멤버 선택
                        </S.PrimaryButton>
                        <S.SecondaryButton type="button" onClick={() => handleClearSlot(idx)}>
                          초기화
                        </S.SecondaryButton>
                      </S.ButtonRow>
                    </S.CardSection>

                    <S.CardSection>
                      <S.SectionTitle>성격</S.SectionTitle>
                      <S.TagGrid>
                        {traitsForSlot.map((traitName, traitIdx) => (
                          <S.TagSlot key={traitIdx}>
                            <S.TagLabel>성격 {traitIdx + 1}</S.TagLabel>
                            <S.TraitButton type="button" onClick={() => openTraitModal(idx, traitIdx)}>
                              {traitName || '태그 선택'}
                            </S.TraitButton>
                            {traitName && (
                              <S.ClearTagButton type="button" onClick={() => handleTraitClear(idx, traitIdx)}>
                                제거
                              </S.ClearTagButton>
                            )}
                          </S.TagSlot>
                        ))}
                      </S.TagGrid>
                    </S.CardSection>

                    <S.CardSection>
                      <S.SectionTitle>MBTI</S.SectionTitle>
                      <S.TagGrid>
                        <S.TagSlot>
                          <S.TagLabel>MBTI</S.TagLabel>
                          <S.TraitButton type="button" onClick={() => openMbtiModal(idx)}>
                            {slot?.mbti || 'MBTI 선택'}
                          </S.TraitButton>
                          {slot?.mbti && (
                            <S.ClearTagButton type="button" onClick={() => handleMbtiClear(idx)}>
                              제거
                            </S.ClearTagButton>
                          )}
                        </S.TagSlot>
                      </S.TagGrid>
                    </S.CardSection>
                  </S.SlotCard>
                );
              })}
            </S.SlotsGrid>

            <S.PageFooter>
              <S.SaveButton type="button" onClick={handleSave}>
                저장
              </S.SaveButton>
            </S.PageFooter>

          <CharacterModal
              open={dialog.mode === 'character'}
              onClose={closeDialog}
              onSelect={handleCharacterSelect}
              slotIndex={dialog.slotIndex}
              characterUsage={characterUsage}
              currentName={dialog.slotIndex !== null ? normalizedSlots[dialog.slotIndex]?.name || null : null}
            />

            <MbtiModal
              open={dialog.mode === 'mbti'}
              onClose={closeDialog}
              onSelect={handleMbtiSelect}
              currentMbti={
                dialog.slotIndex !== null ? normalizedSlots[dialog.slotIndex]?.mbti ?? null : null
              }
            />

            <TraitModal
              open={dialog.mode === 'trait'}
              onClose={closeDialog}
              onSelect={handleTraitSelect}
              slotIndex={dialog.slotIndex}
              traitIndex={dialog.traitIndex}
              traitUsage={traitUsage}
              currentTrait={
                dialog.slotIndex !== null && dialog.traitIndex !== null
                  ? ensureTraits(normalizedSlots[dialog.slotIndex]?.traits)[dialog.traitIndex]
                  : null
              }
            />
          </S.MainMyPageContainer>
        </S.ContentSection>
      )}
    </S.Container>
  );
}

function CharacterModal({ open, onClose, onSelect, slotIndex, characterUsage, currentName }) {
  if (!open) return null;

  const isUsedElsewhere = (name) => characterUsage.some((entry) => entry.name === name && entry.index !== slotIndex);

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>멤버 선택</S.ModalTitle>
          <S.CloseButton type="button" onClick={onClose}>
            닫기
          </S.CloseButton>
        </S.ModalHeader>
        <S.ModalList>
          {characters.map((character) => {
            const disabled = isUsedElsewhere(character.name);
            const isActive = currentName === character.name;
            return (
              <S.ModalListItem key={character.name}>
                <S.CharacterButton
                  type="button"
                  disabled={disabled}
                  $active={isActive}
                  onClick={() => onSelect(character)}
                >
                  <S.CharacterInfo>
                    <S.CharacterName>{character.name}</S.CharacterName>
                    {character.original && <S.CharacterMeta>{character.original}</S.CharacterMeta>}
                  </S.CharacterInfo>
                  <S.CharacterThumb>
                    {character.img ? <img src={character.img} alt={character.name} /> : <span>이미지 없음</span>}
                  </S.CharacterThumb>
                </S.CharacterButton>
                {disabled && <S.HelperText>이미 사용 중인 멤버입니다.</S.HelperText>}
              </S.ModalListItem>
            );
          })}
        </S.ModalList>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

function MbtiModal({ open, onClose, onSelect, currentMbti }) {
  if (!open) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>MBTI 선택</S.ModalTitle>
          <S.CloseButton type="button" onClick={onClose}>
            닫기
          </S.CloseButton>
        </S.ModalHeader>
        <S.ModalList>
          {mbtiOptions.map((option) => (
            <S.ModalListItem key={option}>
              <S.ModalButton
                type="button"
                $active={currentMbti === option}
                onClick={() => onSelect(option)}
              >
                {option}
              </S.ModalButton>
            </S.ModalListItem>
          ))}
        </S.ModalList>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

function TraitModal({ open, onClose, onSelect, slotIndex, traitIndex, traitUsage, currentTrait }) {
  if (!open || slotIndex === null || traitIndex === null) return null;

  const isUsedElsewhere = (name) =>
    traitUsage.some((entry) => entry.traitName === name && !(entry.slotIdx === slotIndex && entry.traitIdx === traitIndex));

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>태그 선택</S.ModalTitle>
          <S.CloseButton type="button" onClick={onClose}>
            닫기
          </S.CloseButton>
        </S.ModalHeader>
        <S.ModalList>
          {traits.map((traitName) => {
            const disabled = isUsedElsewhere(traitName);
            const isActive = currentTrait === traitName;
            return (
              <S.ModalListItem key={traitName}>
                <S.ModalButton
                  type="button"
                  disabled={disabled}
                  $active={isActive}
                  onClick={() => onSelect(traitName)}
                >
                  {traitName}
                </S.ModalButton>
                {disabled && <S.HelperText>이미 다른 슬롯에서 사용 중입니다.</S.HelperText>}
              </S.ModalListItem>
            );
          })}
        </S.ModalList>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}



export default MyPage;
