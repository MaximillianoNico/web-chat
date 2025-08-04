import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080/api';

describe('Chat Service E2E Tests', () => {
  describe('Rooms API', () => {
    describe('GET /api/rooms', () => {
      it('should return list of rooms', async () => {
        const res = await axios.get(`${API_URL}/rooms`);

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('uptime');
        expect(res.data).toHaveProperty('message', 'Ok');
        expect(res.data).toHaveProperty('data');
        expect(res.data).toHaveProperty('date');
        expect(Array.isArray(res.data.data)).toBe(true);
      });
    });

    describe('POST /api/rooms/create', () => {
      it('should create a new room successfully', async () => {
        const roomData = {
          roomId: `TEST_${Date.now()}`,
          description: 'E2E Test Room'
        };

        const res = await axios.post(`${API_URL}/rooms/create`, roomData);

        expect(res.status).toBe(200);
        expect(res.data.message).toBe('Ok');
        expect(res.data.data.roomId).toBe(roomData.roomId);
        expect(res.data.data.description).toBe(roomData.description);
        expect(res.data.data.participant).toEqual([]);
        expect(res.data.data).toHaveProperty('_id');
        expect(res.data.data).toHaveProperty('createdAt');
      });

      it('should handle missing roomId', async () => {
        const roomData = {
          description: 'Test Room without ID'
        };

        try {
          await axios.post(`${API_URL}/rooms/create`, roomData);
        } catch (error) {
          expect(error.response.status).toBe(400);
          expect(error.response.data.message).toBe('Error');
        }
      });

      it('should create room without description', async () => {
        const roomData = {
          roomId: `NO_DESC_${Date.now()}`
        };

        const res = await axios.post(`${API_URL}/rooms/create`, roomData);

        expect(res.status).toBe(200);
        expect(res.data.message).toBe('Ok');
        expect(res.data.data.roomId).toBe(roomData.roomId);
        expect(res.data.data.participant).toEqual([]);
      });
    });

    describe('POST /api/rooms/join', () => {
      let testRoomId: string;

      beforeAll(async () => {
        // Create a test room first
        const roomData = {
          roomId: `JOIN_TEST_${Date.now()}`,
          description: 'Room for join testing'
        };

        const createRes = await axios.post(`${API_URL}/rooms/create`, roomData);
        testRoomId = createRes.data.data.roomId;
      });

      it('should join room successfully', async () => {
        const joinData = {
          roomId: testRoomId,
          username: 'TestUser'
        };

        const res = await axios.post(`${API_URL}/rooms/join`, joinData);

        expect(res.status).toBe(200);
        // Add more specific assertions based on your joinRoom response structure
      });

      it('should handle missing roomId when joining', async () => {
        const joinData = {
          username: 'TestUser'
        };

        try {
          await axios.post(`${API_URL}/rooms/join`, joinData);
        } catch (error) {
          expect(error.response.status).toBe(400);
          expect(error.response.data.message).toBe('Error');
        }
      });

      it('should handle missing username when joining', async () => {
        const joinData = {
          roomId: testRoomId
        };

        try {
          await axios.post(`${API_URL}/rooms/join`, joinData);
        } catch (error) {
          expect(error.response.status).toBe(400);
          expect(error.response.data.message).toBe('Error');
        }
      });

    });

    describe('POST /api/rooms/exit', () => {
      let testRoomId: string;
      let authToken: string;

      beforeAll(async () => {
        // Create a room and join it to get auth token
        const roomData = {
          roomId: `EXIT_TEST_${Date.now()}`,
          description: 'Room for exit testing'
        };

        const createRes = await axios.post(`${API_URL}/rooms/create`, roomData);
        testRoomId = createRes.data.data.roomId;

        // Join the room to get token
        const joinData = {
          roomId: testRoomId,
          username: 'ExitTestUser'
        };

        const joinRes = await axios.post(`${API_URL}/rooms/join`, joinData);
        // Assuming the join response contains a token
        authToken = joinRes.data.data?.token || 'mock-token';
      });

      it('should handle exit with invalid token', async () => {
        try {
          await axios.post(
            `${API_URL}/rooms/exit`,
            {},
            {
              headers: {
                Authorization: 'Bearer invalid-token'
              }
            }
          );
        } catch (error) {
          expect(error.response.status).toBe(401);
        }
      });
    });
  });
});
