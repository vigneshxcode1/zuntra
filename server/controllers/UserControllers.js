import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usermodel from '../model/Usermodel.js';



export const register=async(req,res)=>{
 const { name, email, password } = req.body;
  try {
    const exists = await Usermodel.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await Usermodel.create({ name, email, password: hash });

    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, "zunter", { expiresIn: '7d' });
    res.json({ 
        token, user: { 
              id: user._id,
              name: user.name,
              email: user.email }
     });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const login = async(req,res)=>{
 const { email, password } = req.body;
  try {
    const user = await Usermodel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invaild password' });

    const token = jwt.sign({
       userId: user._id, name: user.name, email: user.email },"zuntra",
       { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}