import express from 'express';
import Messages from '../../infrastructure/repository/mongo/Messages';
import Rooms from '../../infrastructure/repository/mongo/Room';

const router = express.Router();
const MessagesController = () => {
  const sendMessage = async (req, res) => {
    const roomId = req?.body?.roomId;
    const message = req?.body?.message;
    const username = req?.body?.username;

    try {
      const isExistsRoomId = await Rooms.findOne({
        roomId
      }).exec();

      if (!isExistsRoomId) {
        throw new Error("Room is not exists")
      }

      const isUsernameInRoom = isExistsRoomId?.participant.filter(
        itm => itm === username
      );

      if (!isUsernameInRoom.length) {
        throw new Error("User not in the room")
      };

      const newMessage = new Messages({
        roomId: isExistsRoomId._id,
        roomIdName: roomId,
        username,
        text: message
      })

      const data = await newMessage.save();
      const response = {
        uptime: process.uptime(),
        message: 'Ok',
        data,
        date: new Date()
      };

      return res.status(400).send(response);
    } catch (err) {
      const data = {
        uptime: process.uptime(),
        message: 'Error',
        error: err?.message,
        date: new Date()
      };

      return res.status(400).send(data);
    }
  }

  router.post('/send', sendMessage);

  return router;
}

export default MessagesController;
