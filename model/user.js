import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const User = new Schema({
    username: String,
    password: String,
    email: String
})


export const UserModel = model('User', User)