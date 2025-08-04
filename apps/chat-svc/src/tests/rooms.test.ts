import sinon from 'sinon';
import { getRooms } from '../app/interface/controllers/rooms';
import Rooms from '../app/infrastructure/repository/mongo/Room';

describe('getRooms Controller', () => {
  let req: any;
  let res: any;
  let roomsStub: sinon.SinonStub;

  beforeEach(() => {
    // Setup mock request and response
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
    // Given - mock data
    const mockRooms = [
      {
        _id: '123',
        roomId: 'ABC',
        description: 'Test Room',
        participant: ['User1'],
        createdAt: '2025-08-04T07:45:30.215Z'
      }
    ];

    // Given - stub the database call
    roomsStub = sinon.stub(Rooms, 'find').returns({
      exec: sinon.stub().resolves(mockRooms)
    } as any);

    // When - call the controller
    await getRooms(req, res);

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
    roomsStub = sinon.stub(Rooms, 'find').returns({
      exec: sinon.stub().resolves([])
    } as any);

    // When - call the controller
    await getRooms(req, res);

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
