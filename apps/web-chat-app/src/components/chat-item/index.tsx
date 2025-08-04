import { Typography, Avatar } from 'antd';
import styled from 'styled-components';

interface ChatItemProps {
  text: string;
  sender: string;
  isOwnChat: boolean;
}

const ChatItemContainer = styled.div<{ isOwn: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
  margin-bottom: 16px;
  width: 100%;
`;

const MessageContainer = styled.div<{ isOwn: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: 80%;
  flex-direction: ${props => props.isOwn ? 'row-reverse' : 'row'};
`;

const MessageBubble = styled.div<{ isOwn: boolean }>`
  background: ${props => props.isOwn ? '#5DB075' : '#f3f4f6'};
  color: ${props => props.isOwn ? 'white' : '#374151'};
  padding: 12px 16px;
  border-radius: 16px;
  border-top-left-radius: ${props => props.isOwn ? '16px' : '4px'};
  border-top-right-radius: ${props => props.isOwn ? '4px' : '16px'};
  word-wrap: break-word;
  line-height: 1.4;
  min-width: 40px;
`;

const SenderName = styled(Typography.Text)<{ isOwn: boolean }>`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  margin-left: ${props => props.isOwn ? '0' : '4px'};
  margin-right: ${props => props.isOwn ? '4px' : '0'};
  text-align: ${props => props.isOwn ? 'right' : 'left'};
`;

const AvatarContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  flex-shrink: 0;
`;

const ChatItem: React.FC<ChatItemProps> = ({ text, sender, isOwnChat }) => {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <ChatItemContainer isOwn={isOwnChat}>
      <SenderName isOwn={isOwnChat}>{sender}</SenderName>
      <MessageContainer isOwn={isOwnChat}>
        <AvatarContainer>
          {getInitials(sender)}
        </AvatarContainer>
        <MessageBubble isOwn={isOwnChat}>
          {text}
        </MessageBubble>
      </MessageContainer>
    </ChatItemContainer>
  );
};

export default ChatItem;
