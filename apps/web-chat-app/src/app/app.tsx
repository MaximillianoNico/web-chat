import LayoutPage from './layout';
import { Typography, Alert, Button as AntButton, Spin, Modal, Form } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import {
  Header,
  Container,
  FormContainer,
  RoomsList,
  RoomCard,
  RoomHeader,
  RoomInfo,
  JoinButton,
  SearchInput,
  BackButton,
  Textfield
} from './styled'
import { useAction, useRooms } from './action';
import withGuard from '../hoc/withGuard';
import { useMemo, useState } from 'react';

export function App() {
  const { errors, onSubmit, onChange, credentials } = useAction();
  const { rooms, loading, error } = useRooms();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [form] = Form.useForm();

  const filteredRooms = useMemo(
    () => rooms.filter(room =>
      room.roomId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [rooms, searchTerm]
  );

  const handleJoinClick = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    if (credentials.username?.trim()) {
      await onSubmit(selectedRoomId, credentials.username);
      // Close modal and join room
      setIsModalOpen(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <LayoutPage>
      <Container>
        <Header>
          <BackButton>
            ←
          </BackButton>
          <Typography.Title level={3} style={{ margin: 0, fontWeight: 600 }}>
            Rooms
          </Typography.Title>
          <div style={{ width: 24 }} />
        </Header>

        <FormContainer>
          <SearchInput
            placeholder="Search rooms"
            prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {errors && (
            <Alert
              message={errors}
              type="error"
              showIcon
              style={{ marginBottom: '16px' }}
            />
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spin size="large" />
            </div>
          ) : error ? (
            <Alert message={error} type="error" showIcon />
          ) : (
            <RoomsList>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <RoomCard key={room._id}>
                    <RoomHeader>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: '#6b7280'
                        }}>
                          #
                        </div>
                        <div style={{ flex: 1 }}>
                          <Typography.Text strong style={{ fontSize: '16px', display: 'block' }}>
                            {room.roomId}
                          </Typography.Text>
                          <RoomInfo>
                            {room.description}
                          </RoomInfo>
                        </div>
                      </div>
                      <JoinButton
                        onClick={() => handleJoinClick(room.roomId)}
                        size="middle"
                      >
                        Join
                      </JoinButton>
                    </RoomHeader>
                  </RoomCard>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                  {searchTerm ? 'No rooms found matching your search' : 'No rooms available'}
                </div>
              )}
            </RoomsList>
          )}
        </FormContainer>

        <Modal
          title={
            <div style={{ textAlign: 'center' }}>
              <Typography.Title level={4} style={{ margin: 0 }}>
                Join Room: {selectedRoomId}
              </Typography.Title>
            </div>
          }
          open={isModalOpen}
          onCancel={handleModalCancel}
          footer={null}
          centered
          width={400}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleModalSubmit}
            style={{ marginTop: '20px' }}
          >
            <Form.Item
              label="Enter your username"
              name="username"
              rules={[
                { required: true, message: 'Please enter your username!' },
                { min: 2, message: 'Username must be at least 2 characters!' }
              ]}
            >
              <Textfield
                placeholder="Your username"
                prefix={<UserOutlined style={{ color: '#9ca3af' }} />}
                name="username"
                value={credentials.username}
                onChange={onChange}
                size="large"
                onPressEnter={handleModalSubmit}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <AntButton
                  onClick={handleModalCancel}
                  size="large"
                  style={{ borderRadius: '8px' }}
                >
                  Cancel
                </AntButton>
                <AntButton
                  type="primary"
                  onClick={handleModalSubmit}
                  size="large"
                  disabled={!credentials.username?.trim()}
                  style={{
                    borderRadius: '8px',
                    background: '#3b82f6',
                    borderColor: '#3b82f6'
                  }}
                >
                  Join Room
                </AntButton>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </LayoutPage>
  );
}

export default withGuard(App);
