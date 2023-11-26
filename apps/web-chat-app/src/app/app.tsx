import LayoutPage from './layout';
import { Typography, Alert } from 'antd';

import { Header, Container, Textfield, Fixed, Button, Footer } from './styled'
import { useAction } from './action';
import withGuard from '../hoc/withGuard';

export function App() {
  const { errors, onSubmit, onChange, credentials } = useAction();

  return (
    <LayoutPage>
      <Header>
        <Typography.Title>
          Join Chatroom
        </Typography.Title>
      </Header>
      <Container>
        {errors && <Alert message={errors} type="error" />}
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
          placeholder='Room Id'
          type="text"
        />
      </Container>
      <Fixed>
        <Footer>
          <Button
            onClick={onSubmit}
            type="primary"
            shape="round"
            size={"large"}>
            JOIN
          </Button>
        </Footer>
      </Fixed>
    </LayoutPage>
  );
}

export default withGuard(App);
