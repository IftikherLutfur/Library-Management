import express , { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;

        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }

        if (book.copies < quantity) {
            if (book.copies === 0 && book.available !== false) {
                book.available = false;
                await book.save();
            }
            return res.status(400).json({
                succes: false,
                message: "Not enough copies available"
            })
        }

        book.copies = book.copies - quantity;

        if (book.copies === 0) {
            book.available = false;
        }
        await book.save()

        const data = await Borrow.create({
            book: bookId,
            quantity,
            dueDate
        })

        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})


borrowRouter.get("/", async (req: Request, res: Response) => {

    // const data = await Borrow.find().populate("book", "title isbn")

    //

    const data = await Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" }
            }
        },

        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookInfo"
            }
        },

        { $unwind: "$bookInfo" },

        {
            $project: {
                _id: 0,
                book: {
                    title: "$bookInfo.title",
                    isbn: "$bookInfo.isbn"
                },
                totalQuantity: 1
            }
        }
    ])
    res.status(200).json({
        success: true,
        message: "Successfully get",
        data
    })



})
