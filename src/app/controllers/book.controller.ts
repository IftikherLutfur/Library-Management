import express, { Request, Response } from "express"
import { BookModel } from "../models/book.model";
export const BookRouter =  express.Router();


BookRouter.post('/create-book', async(req: Request, res: Response)=>{
    const body = req.body;
    const createBook = new BookModel(body);
    await createBook.save();

    res.status(200).json({
        success: true,
        message: "Book created successfully",
        data: createBook
    })
})