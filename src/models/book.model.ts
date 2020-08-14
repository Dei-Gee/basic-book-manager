import { IBook } from './interfaces/models.interfaces';
import mongoose, { Schema } from 'mongoose';

// create the schema for the model
const BookSchema:Schema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    isbn: {
        type: String, 
        required: true
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Author', 
        required: true
    }
})

// export the model according to the schema based on the interface
module.exports = mongoose.model<IBook>('Book', BookSchema);