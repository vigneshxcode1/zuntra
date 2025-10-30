
import Message from "../model/Message.js";

export const Getmessage = async(req,res)=>{
  try {
    const messages = await Message.find().sort({ timestamp: 1 }).limit(50);
    res.status(200).json(
        {  
             success:"true",
              messages
        }
     );
  } catch (err) { 
    res.status(500).json(
    { message: err.message}
); 
}
}

export const NewMessage = async(req,res)=>{
try {
    const msg = await Message.create({
      userName: req.user.name,
      message: req.body.message
    });
    res.json({
      success:true,
      msg
    });
  } catch (err) { 
    res.status(500).json({
         message: err.message 
     }); }
}
