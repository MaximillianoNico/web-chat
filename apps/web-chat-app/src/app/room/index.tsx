import { Typography, Avatar } from "antd";
import { ArrowUp, Users } from "@phosphor-icons/react";

import LayoutPage from "../layout";
import { Header, Exit, Title, ChatContainer, ChatBox, ArrowWrapper, Textfield, ChatBoxContainer, ChatTextfield, UserCount } from "./styled";
import ChatItem from "../../components/chat-item";
import { useAction } from "./action";
import withGuard from "../../hoc/withGuard";
import { useRef } from "react";

const Page = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const {
    onExit,
    currentMessage,
    message,
    isConnected,
    isOwnChat,
    onSend,
    onChange,
    roomId
  } = useAction({
    onRetrieve: () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // Get unique participants count
  const participants = new Set(message.map(msg => msg.username)).size;

  return (
    <LayoutPage>
      <Header>
        <Exit onClick={onExit}>
          ←
        </Exit>
        <Title>
          <Typography.Title level={4} style={{ margin: 0, fontWeight: 600 }}>
            {roomId || 'Chat Room'}
          </Typography.Title>
        </Title>
        <UserCount>
          <Users size={20} color="#6b7280" />
        </UserCount>
      </Header>

      <ChatContainer>
        {isConnected && !!message.length && message.map(
          ({ text, username }, key) => (
            <ChatItem
              key={key}
              text={text}
              sender={username}
              isOwnChat={isOwnChat(username)}
            />
          )
        )}
        <div ref={bottomRef} />
      </ChatContainer>

      <ChatBoxContainer>
        <ChatBox>
          <ChatTextfield>
            <Textfield
              autoSize
              value={currentMessage}
              onChange={onChange}
              placeholder="Message here..."
              onPressEnter={onSend}
            />
            <ArrowWrapper onClick={onSend}>
              <ArrowUp size={20} color="white" />
            </ArrowWrapper>
          </ChatTextfield>
        </ChatBox>
      </ChatBoxContainer>
    </LayoutPage>
  )
}

export default withGuard(Page);
