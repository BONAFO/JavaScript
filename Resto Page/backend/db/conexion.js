import mongoose, { Schema } from 'mongoose';
import userSchema from '../models/user.model.js';


const mogoUrl = "mongodb+srv://bonafo:gZmpmaNMW8ZMWPuw@naomi-resto.xwhzhih.mongodb.net/";



export const userModel = mongoose.model('user', new Schema(userSchema));




// mongoose.connect(mogoUrl)
//     .then(() => console.log('Db online!!'));


 