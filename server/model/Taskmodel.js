import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
    },
  title: { 
    type: String,
     required: true
     },
  isCompleted: {
     type: Boolean, 
     default: false 
    },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ZuntraTask', taskSchema);
