import express from 'express';
import jwt from "jsonwebtoken";
import Rooms from '../../infrastructure/repository/mongo/Room';

const router = express.Router();
const RoomsController = () => {
  const getRooms = async (req, res) => {
    try {
      const rows = await Rooms.find().exec()

      const data = {
        uptime: process.uptime(),
        message: 'Ok',
        data: rows,
        date: new Date()
      };

      return res.status(200).send(data);
    } catch (err) {
      const errors = {
        uptime: process.uptime(),
        message: 'Error',
        err,
        date: new Date()
      };

      return res.status(400).send(errors);
    }
  }

  const createRoom = async (req, res) => {
    const id = req?.body?.roomId;
    const description = req?.body?.description;

    try {
      const newRoom = {
        roomId: id,
        description,
        participant: []
      };

      const newCreateRoom = new Rooms(newRoom);
      const rows = await newCreateRoom.save();

      const data = {
        uptime: process.uptime(),
        message: 'Ok',
        data: rows,
        date: new Date()
      };

      return res.status(200).send(data);
    } catch (err) {
      const errors = {
        uptime: process.uptime(),
        message: 'Error',
        err,
        date: new Date()
      };

      return res.status(400).send(errors);
    }

  }

  const joinRoom = async (req, res) => {
    const roomId = req?.body?.roomId;
    const username = req?.body?.username;

    try {
      if (!roomId || !username) {
        throw new Error("RoomId or Username is required");
      }

      const roomSelected = await Rooms.findOne({ roomId });
      if (roomSelected) {
        const isUsernameInRoom = roomSelected.participant.filter(
          user => user === username
        );

        if (isUsernameInRoom.length) {
          throw new Error("User already on room")
        }

        // Insert username into room
        const updatedRoom = await Rooms.findOneAndUpdate(
          { _id: roomSelected._id.toString() },
          {
            $push: {
              participant: username
            }
          },
          { new: true }
        ).exec();

        const token = jwt.sign({
          id: updatedRoom?._id,
          roomId: updatedRoom.roomId,
          createdAt: updatedRoom.createdAt
        }, process?.env?.NX_JWT_KEY ?? "vouch-key");

        const data = {
          uptime: process.uptime(),
          message: 'Ok',
          data: {
            token
          },
          date: new Date()
        };

        return res.status(200).send(data);
      }

    } catch (err) {
      const errors = {
        uptime: process.uptime(),
        message: 'Error',
        error: err?.message,
        date: new Date()
      };

      return res.status(400).send(errors);
    }
  }

  router.get('/', getRooms);
  router.post('/create', createRoom);
  router.post('/join', joinRoom);
  return router;
}

export default RoomsController;
