import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const Book = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    authors: { type: String, default: "" },
    // favorite: { type: String, default: "" },
    //fileCover: { type: Object, required: true },
    // fileName: { type: String, required: true },
    // fileBook: { type: Object, reqired: true },
});

export const BookModel = model('Book', Book);