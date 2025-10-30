import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
    
     },
  userName: { 
    type: String, 
    required: true 
},
  message: { 
    type: String,
     required: true 
    },
  timestamp: { type: Date, default: Date.now }
});

export default  mongoose.model('zuntraMessageuser', messageSchema);
