import mongoose from 'mongoose';

// Define schema
const Schema = mongoose.Schema

const tbl_rooms = new Schema({
  description: {
    type: String
  },
  roomId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  participant: [{
    type: String
  }]
});

// Compile model from schema
const Rooms = mongoose.model("tbl_rooms", tbl_rooms);

export default Rooms;
