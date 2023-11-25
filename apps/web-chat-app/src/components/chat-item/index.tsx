import { Card, Wrapper, Sender } from "./styled";
import { Typography } from "antd";

interface IChatItem {
  isOwnChat?: boolean
}

const ChatItem = (props: IChatItem) => {
  if (props?.isOwnChat) {
    return (
      <Card $isOwnChat>
        <Typography.Text>
          Card content
        </Typography.Text>
      </Card>
    )
  }

  return (
    <Wrapper>
      <Sender>sender_name</Sender>
      <Card>
        <Typography.Text>
          Card content
        </Typography.Text>
      </Card>
    </Wrapper>
  )
}

export default ChatItem;
