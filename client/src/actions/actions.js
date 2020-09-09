import axios from 'axios';
import { isNull } from 'util';

/* GET ALL AUTHORS */
export const getAllAuthors = async () => {
    let authors = await axios.get('/api/authors');
    return authors.status === 200 && !isNull(authors.data) ? authors.data : "Could not retrieve list of authors";
}

/* GET ALL BOOKS */
export const getAllBooks = async () => {
    let books = await axios.get('/api/books');
    return books.status === 200 && !isNull(books.data) ? books.data : "Could not retrieve list of book";
}

/* GET AN AUTHOR USING THEIR ID */
export const getAuthorById = async (id) => {
    let author = await axios.get(`/api/author/${id}`);
    return author.status === 200 && !isNull(author.data) ? author.data : "Could not retrieve author";
}

/* GET A BOOK USING ITS ID */
export const getBookById = async (id) => {
    let book = await axios.get(`/api/book/${id}`);
    return book.status === 200 && !isNull(book.data) ? book.data : "Could not retrieve book";
}

/* CREATE A NEW AUTHOR */
export const createAuthor = async (data) => {
    let author = await axios.post(`/api/author`, data);
    return author.status === 200 && !isNull(author.data) ? true : false;
}

/* CREATE A NEW BOOK */
export const createBook = async (data) => {
    let book = await axios.post(`/api/book`, data);
    return book.status === 200 && !isNull(book.data) ? true : false;
}

/* UPDATE AN AUTHOR */
export const updateAuthorById = async (id, data) => {
    let author = await axios.put(`/api/author/${id}`, data);
    return author.status === 200 && !isNull(author.data) ? true : false;
}

/* UPDATE A BOOK */
export const updateBookById = async (id, data) => {
    let book = await axios.put(`/api/book/${id}`, data);
    return book.status === 200 && !isNull(book.data) ? true : false;
}

