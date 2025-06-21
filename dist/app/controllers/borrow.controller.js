"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowRouter = express_1.default.Router();
// borrowRouter.post("/", async (req: Request, res: Response)=>{
//     const body = req.body;
//     const borrows = await Borrow.find().populate("book")
//        const borrowCopies = borrows.map((borrow) => {
//       const book = borrow.book as any;
//       console.log(`Book Title: ${book.title}, Copies: ${book.copies}`); // 👈 Console logging
//       return book.copies;
//     });
//     const data = await Borrow.create(body);
//     res.status(200).json({
//         success: true,
//         message: "Book borrowed successfully",
//         data
//     })
// })
exports.borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        if (book.copies < quantity) {
            if (book.copies === 0 && book.available !== false) {
                book.available = false;
                yield book.save();
            }
            return res.status(400).json({
                succes: true,
                message: "Not enough copies available"
            });
        }
        book.copies = book.copies - quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        yield book.save();
        const data = yield borrow_model_1.Borrow.create({
            book: bookId,
            quantity,
            dueDate
        });
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}));
exports.borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const borrows = yield borrow_model_1.Borrow.find().populate("book");
    res.status(200).json({
        success: true,
        message: "Successfully get",
        borrows
    });
}));
