import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
export const BookRouter = express.Router();


BookRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body; 
    const data = await Book.create(body);
    res.status(200).json({
        success: true,
        message: "Book created successfully",
        data
    })
})

BookRouter.get("/", async (req: Request, res: Response) => {
    
    const { filter, sortBy = "title", sort, limit = "10" } = req.query;
    const query: any = {};
    if (filter) {
        query.genre = filter;
    }
    const sortOption: any = {};
    sortOption[sortBy as string] = sort === "asc" ? 1 : -1 // 1 & -1 diye ascendin r dsc bujhiyechi r sort ta jehetu title diye kortechi tai sortBy ta string

    const data = await Book?.find(query)?.sort(sortOption)?.limit(Number(limit))
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data
    })
})

BookRouter.get("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId) 

    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data
    });
});

BookRouter.patch("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;

        const data = await Book.findOneAndUpdate(
            { _id: bookId },
            updatedBody,
            { new: true })

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data

        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Book updated failed",
            error
        })
    }



})

BookRouter.delete("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;

    const book = await Book.findOneAndDelete({ _id: bookId })
    if(!book){
        res.status(404).json({
            success: false,
            message: "The book not found"
        })
    }
    else{

        res.status(200).json({
            success: true,
            message: "deleted successfully",
            data: null
            })
    }

    
})

