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
try {
    const { filter, sortBy = "title", sort = "asc", limit = "10", page = "1" } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const limitNum = limit === "all" ? 0 : parseInt(limit as string);
    const pageNum = parseInt(page as string);
    const skip = (pageNum - 1) * limitNum;

    const sortOption: any = {};
    sortOption[sortBy as string] = sort === "asc" ? 1 : -1;

    const data = await Book.find(query).sort(sortOption).skip(skip).limit(limitNum);
    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

BookRouter.get("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId)

    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data
    });
});



// BookRouter.patch("/edit-book/:bookId", async (req: Request, res: Response) => {
//   try {
//     const bookId = req.params.bookId;
//     const updatedData = req.body;

//     // Business logic: If copies === 0, mark as unavailable
//     if (updatedData.copies === 0) {
//       updatedData.available = false;
//     }

//     // Update the book
//     const data = await Book.findByIdAndUpdate(
//       bookId, // ✅ only ID
//       updatedData,
//       { new: true }
//     );

//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "Book not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Book updated successfully",
//       data
//     });

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Book update failed",
//       error
//     });
//   }
// });



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
    if (!book) {
        res.status(404).json({
            success: false,
            message: "The book not found"
        })
    }
    else {

        res.status(200).json({
            success: true,
            message: "deleted successfully",
            data: null
        })
    }


})

