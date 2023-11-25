import mongoose from 'mongoose';

// Define schema
const Schema = mongoose.Schema

const tbl_messages = new Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "tbl_rooms"
  },
  roomIdName: {
    type: String,
    require: true
  },
  username: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String
  },
  isDelete: {
    type: Boolean
  }
});

// Compile model from schema
const Messages = mongoose.model("tbl_messages", tbl_messages);

export default Messages;
