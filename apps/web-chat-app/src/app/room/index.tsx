import { Typography } from "antd";
import { ArrowUp } from "@phosphor-icons/react";

import LayoutPage from "../layout";
import { Header, Exit, Title, ChatContainer, ChatBox, ArrowWrapper, Textfield, ChatBoxContainer, ChatTextfield } from "./styled";
import ChatItem from "../../components/chat-item";
import { useAction } from "./action";
import withGuard from "../../hoc/withGuard";
import { useRef } from "react";

const Page = () => {
  const bottomRef = useRef<HTMLDivElement>();
  const {
    onExit,
    currentMessage,
    message,
    isConnected,
    isOwnChat,
    onSend,
    onChange
  } = useAction({
    onRetrieve: () => {
      if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <LayoutPage>
      <Header>
        <Exit>
          <Typography.Title onClick={onExit} style={{ color: '#5DB075'}} level={5}>
            Exit
          </Typography.Title>
        </Exit>
        <Title>
          <Typography.Title level={2}>
            Room ID
          </Typography.Title>
        </Title>
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
            />
            <ArrowWrapper>
              <ArrowUp onClick={onSend} size={20} color="white" />
            </ArrowWrapper>
          </ChatTextfield>
        </ChatBox>
      </ChatBoxContainer>
    </LayoutPage>
  )
}

export default withGuard(Page);
