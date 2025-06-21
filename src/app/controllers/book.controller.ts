import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
export const BookRouter = express.Router();


BookRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    // 
    const data = await Book.create(body);


    res.status(200).json({
        success: true,
        message: "Book created successfully",
        data
    })
})

BookRouter.get("/", async (req: Request, res: Response) => {
    // static
    // Query parameters gulo recive korechi url request theke
    const { filter, sortBy = "title", sort, limit } = req.query;

    // query empty object declare korechi jodi filter na kori tahole all data dibe r filter korle condition onujayi data dibe
    const query: any = {};
    if (filter) {
        query.genre = filter;
    }

    // sortOption ew empty Object declare korechi jodi sorting kori tahole condition onujayi data dibe otherwise all data dibe
    const sortOption: any = {};
    sortOption[sortBy as string] = sort === "asc" ? 1 : -1 // 1 & -1 diye ascendin r dsc bujhiyechi r sort ta jehetu title diye kortechi tai sortBy ta string

    // ekhane sob gulo query apply korechi
    const data = await Book?.find(query)?.sort(sortOption)?.limit(Number(limit))
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data
    })
})

BookRouter.get("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const data = await Book.findById({_id: bookId})

    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data
    });
});

BookRouter.patch("/update/:bookId", async (req: Request, res: Response) => {
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

    const book = await Book.deleteOne({ _id: bookId })
    res.status(200).json({
        success: true,
        message: "deleted successfully",
        data: null

    })
})