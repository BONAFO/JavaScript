
import 'dotenv/config'
import mongoose, { Schema } from 'mongoose';
import userSchema from '../models/user.model.js';
import colors from "colors";


const mogoUrl = process.env.MONGO_URL;



export const userModel = mongoose.model('user', new Schema(userSchema));




mongoose.connect(mogoUrl)
    .then(() => console.log(colors.green('Db online!!')));


 