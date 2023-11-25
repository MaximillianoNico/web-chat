import LayoutPage from './layout';
import { Typography } from 'antd';

import { Header, Container, Textfield, Fixed, Button } from './styled'
import { useAction } from './action';

export function App() {
  const { onSubmit, onChange, credentials } = useAction();

  return (
    <LayoutPage>
      <Header>
        <Typography.Title>
          Join Chatroom
        </Typography.Title>
      </Header>
      <Container>
        <Textfield
          value={credentials.username}
          name="username"
          placeholder='Username'
          type="text"
          onChange={onChange}
        />
        <Textfield
          value={credentials.roomId}
          name="roomId"
          onChange={onChange}
          placeholder='Password'
          type="text"
        />
      </Container>
      <Fixed>
        <Button onClick={onSubmit} type="primary" shape="round" size={"large"}>
          JOIN
        </Button>
      </Fixed>
    </LayoutPage>
  );
}

export default App;
