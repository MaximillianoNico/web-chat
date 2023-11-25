import express from 'express';
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

  router.get('/', getRooms);
  router.post('/create', createRoom);
  return router;
}

export default RoomsController;
