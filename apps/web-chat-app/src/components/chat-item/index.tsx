import { Card, Wrapper, Sender } from "./styled";
import { Typography } from "antd";

interface IChatItem {
  isOwnChat?: boolean
  text?: string
  sender?: string
}

const ChatItem = (props: IChatItem) => {
  if (props?.isOwnChat) {
    return (
      <Card $isOwnChat>
        <Typography.Text>
          {props?.text}
        </Typography.Text>
      </Card>
    )
  }

  return (
    <Wrapper>
      <Sender>{props?.sender}</Sender>
      <Card>
        <Typography.Text>
          {props?.text}
        </Typography.Text>
      </Card>
    </Wrapper>
  )
}

export default ChatItem;
