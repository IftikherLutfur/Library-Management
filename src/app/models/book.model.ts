import mongoose, { Schema } from "mongoose";
import { Book } from "../interfaces/book.interface";

const bookSchema = new Schema <Book> ({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true, 
    enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"] 
},
  isbn: { type: String, required: true },
  description: { type: String, required: true },
  copies: { type: Number, required: true },
  available: { type: Boolean, required: true }
})

export const BookModel = mongoose.model("BookModel", bookSchema);