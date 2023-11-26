import { Typography } from "antd";
import { ArrowUp } from "@phosphor-icons/react";

import LayoutPage from "../layout";
import { Header, Exit, Title, ChatContainer, ChatBox, ArrowWrapper, Textfield, ChatBoxContainer, ChatTextfield } from "./styled";
import ChatItem from "../../components/chat-item";
import { useAction } from "./action";
import withGuard from "../../hoc/withGuard";

const Page = () => {
  const { onExit } = useAction();

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
        <ChatItem />
        <ChatItem isOwnChat />

        <ChatItem />
        <ChatItem isOwnChat />

        <ChatItem />
        <ChatItem isOwnChat />

        <ChatItem />
        <ChatItem isOwnChat />
      </ChatContainer>
      <ChatBoxContainer>
        <ChatBox>
          <ChatTextfield>
            <Textfield
              autoSize
              placeholder="Message here..."
            />
            <ArrowWrapper>
              <ArrowUp size={20} color="white" />
            </ArrowWrapper>
          </ChatTextfield>
        </ChatBox>
      </ChatBoxContainer>
    </LayoutPage>
  )
}

export default withGuard(Page);
