import { IAuthor } from './interfaces/models.interfaces';
import mongoose, { Schema } from 'mongoose';

// create schema for Author model
const AuthorSchema:Schema = new Schema({
    firstName: {
        type: String, 
        required: true
    }, 
    lastName: {
        type: String, 
        required: true
    }
});

// export the model according to the new schema based on the interface
module.exports = mongoose.model<IAuthor>('Author', AuthorSchema);