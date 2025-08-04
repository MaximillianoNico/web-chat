import Messages from "@infrastructure/repository/mongo/Messages";
import Rooms from "@infrastructure/repository/mongo/Room";

export const sendMessage = async (req, res) => {
  const roomId = req?.user?.roomId;
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

    await req?.client?.emit(`send-message:${roomId}`, data)

    return res.status(200).send(response);
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

export const getMessageByID = async (req, res) => {
  const roomId = req?.query?.roomId;

  try {
    const rows = await Messages.find({ roomIdName: roomId });

    const response = {
      uptime: process.uptime(),
      message: 'Ok',
      data: rows,
      date: new Date()
    };

    return res.status(200).send(response);
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
