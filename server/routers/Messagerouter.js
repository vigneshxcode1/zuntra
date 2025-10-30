import express from 'express'
import { auth } from '../Auth.js'
import { Getmessage, NewMessage } from '../controllers/MessageController.js';

const Messagerouter = express.Router();

Messagerouter.use(auth);

Messagerouter.get('/getmessage',Getmessage);

Messagerouter.post('/newMessage',NewMessage);

export default Messagerouter;
