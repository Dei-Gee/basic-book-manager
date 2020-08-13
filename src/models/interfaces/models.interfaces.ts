import { Document } from "mongoose";

export interface IAuthor extends Document {
    firstName: String, 
    lastName: String
}

export interface IBook extends Document {
    name: String, 
    isbn: String, 
    author: IAuthor['_id']
}