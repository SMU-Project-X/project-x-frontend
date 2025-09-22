import styled, { css } from 'styled-components';

export const AdminPageContainer = styled.div`
    min-height: 100vh;
    padding: 60px 40px 80px;
    background: linear-gradient(to bottom, #fdfcfb 0%, #eef3fb 40%, #d9e3f2 100%);
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

export const PageHeader = styled.header`
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const PageTitle = styled.h1`
    margin: 0;
    font-size: 42px;
    font-weight: 700;
    color: #172031;
`;

export const PageSubtitle = styled.p`
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: #4b5563;
`;

export const SlotsGrid = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

export const SlotCard = styled.section`
    background: #fafaf7;
    border-radius: 24px;
    border: 1px solid #d0d7e2;
    box-shadow: 0 14px 40px rgba(23, 32, 49, 0.1);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const SlotHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`;

export const SlotTitle = styled.h2`
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #172031;
`;

export const SlotSubtitle = styled.p`
    margin: 4px 0 0;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
`;

export const Avatar = styled.img`
    width: 72px;
    height: 72px;
    border-radius: 18px;
    object-fit: cover;
    border: 2px solid #a259ff;
`;

export const EmptyAvatar = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 18px;
    background: #e2e7f1;
    color: #667085;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 700;
`;

export const CardSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const SectionTitle = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #172031;
`;

export const ButtonRow = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
    min-width: 160px;
    padding: 12px 18px;
    border-radius: 12px;
    border: none;
    background: #a259ff;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: #8b3ef3;
    }

    &:active {
        background: #7a2ce6;
    }

    &:disabled {
        background: #c9b6ff;
        cursor: not-allowed;
    }
`;

export const SecondaryButton = styled.button`
    min-width: 120px;
    padding: 12px 18px;
    border-radius: 12px;
    border: 1px solid #a259ff;
    background: transparent;
    color: #a259ff;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
        background: rgba(162, 89, 255, 0.12);
    }

    &:active {
        background: rgba(162, 89, 255, 0.2);
        color: #4b2e83;
    }
`;

export const TagGrid = styled.div`
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

export const TagSlot = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
    border: 1px dashed #d0d7e2;
    background: #ffffff;
`;

export const TagLabel = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const TraitButton = styled.button`
    padding: 10px 14px;
    border-radius: 10px;
    border: none;
    background: #f1ecff;
    color: #3a2d5f;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: #e7deff;
    }
`;

export const ClearTagButton = styled.button`
    align-self: flex-start;
    padding: 6px 12px;
    border-radius: 999px;
    border: none;
    background: #fef2f2;
    color: #b91c1c;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #fee2e2;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(23, 32, 49, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    z-index: 1200;
`;

export const ModalContent = styled.div`
    width: min(680px, 100%);
    max-height: 100%;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(23, 32, 49, 0.25);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`;

export const ModalTitle = styled.h2`
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: #172031;
`;

export const CloseButton = styled.button`
    padding: 8px 12px;
    border-radius: 999px;
    border: none;
    background: transparent;
    color: #6b7280;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
        background: #f1f5f9;
        color: #172031;
    }
`;

export const ModalList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 360px;
    overflow-y: auto;
    padding-right: 8px;
`;

export const ModalListItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const ModalButton = styled.button`
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: #f4f6fb;
    color: #172031;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease, border 0.2s ease, color 0.2s ease;

    &:hover {
        background: #e4e9f6;
    }

    &:disabled {
        background: #f9fafc;
        color: #98a2b3;
        border-color: #e2e6ef;
        cursor: not-allowed;
    }

    ${(props) =>
        props.$active &&
        css`
            border-color: #a259ff;
            background: #efe5ff;
            color: #4b2e83;
        `}
`;

export const CharacterButton = styled(ModalButton)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`;

export const CharacterInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const CharacterName = styled.span`
    font-size: 18px;
    font-weight: 700;
    color: #172031;
`;

export const CharacterMeta = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #667085;
`;

export const CharacterThumb = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 16px;
    overflow: hidden;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const HelperText = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: #b91c1c;
`;


export const PageFooter = styled.div`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
`;

export const SaveButton = styled(PrimaryButton)`
    min-width: 180px;
    padding: 14px 24px;
    font-size: 16px;
`;
