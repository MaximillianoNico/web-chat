import sinon from 'sinon';
import { Request, Response } from 'express';
import { getRooms } from '../app/interface/controllers/rooms';
import Rooms from '../app/infrastructure/repository/mongo/Room';

// Define proper types for the test
interface MockRoom {
  _id: string;
  roomId: string;
  description: string;
  participant: string[];
  createdAt: string;
}

interface MockResponse extends Partial<Response> {
  status: sinon.SinonStub;
  send: sinon.SinonStub;
}

interface MockMongooseQuery {
  exec: sinon.SinonStub;
}

describe('getRooms Controller', () => {
  let req: Partial<Request>;
  let res: MockResponse;

  beforeEach(() => {
    // Setup mock request and response with proper typing
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub()
    };
  });

  afterEach(() => {
    // Clean up all stubs
    sinon.restore();
  });

  it('should return rooms successfully', async () => {
    // Given - mock data with proper interface
    const mockRooms: MockRoom[] = [
      {
        _id: '123',
        roomId: 'ABC',
        description: 'Test Room',
        participant: ['User1'],
        createdAt: '2025-08-04T07:45:30.215Z'
      }
    ];

    // Given - stub the database call with proper typing
    const mockQuery: MockMongooseQuery = {
      exec: sinon.stub().resolves(mockRooms)
    };

    sinon.stub(Rooms, 'find').returns(mockQuery as never);

    // When - call the controller
    await getRooms(req as Request, res as Response);

    // Then - verify response
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledOnce(res.send);

    const responseData = res.send.firstCall.args[0];
    expect(responseData.message).toBe('Ok');
    expect(responseData.data).toEqual(mockRooms);
    expect(responseData.uptime).toBeGreaterThan(0);
    expect(responseData.date).toBeInstanceOf(Date);
  });

  it('should return empty array when no rooms exist', async () => {
    // Given - empty database result
    const mockQuery: MockMongooseQuery = {
      exec: sinon.stub().resolves([])
    };

    sinon.stub(Rooms, 'find').returns(mockQuery as never);

    // When - call the controller
    await getRooms(req as Request, res as Response);

    // Then - verify empty response
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledOnce(res.send);

    const responseData = res.send.firstCall.args[0];
    expect(responseData.message).toBe('Ok');
    expect(responseData.data).toEqual([]);
    expect(responseData.uptime).toBeGreaterThan(0);
    expect(responseData.date).toBeInstanceOf(Date);
  });
});
