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
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.BookRouter = express_1.default.Router();
exports.BookRouter.post('/create-book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // 
    const data = yield book_model_1.Book.create(body);
    res.status(200).json({
        success: true,
        message: "Book created successfully",
        data
    });
}));
exports.BookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // static
    const books = yield book_model_1.Book.find();
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    });
}));
exports.BookRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield book_model_1.Book.findById({ _id: bookId });
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data
    });
}));
exports.BookRouter.get("/filtering", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // static
    // Query parameters gulo recive korechi url request theke
    const { filter, sortBy = "title", sort = "asc", limit = 10 } = req.query;
    // query empty object declare korechi jodi filter na kori tahole all data dibe r filter korle condition onujayi data dibe
    const query = {};
    if (filter) {
        query.genre = filter;
    }
    // sortOption ew empty Object declare korechi jodi sorting kori tahole condition onujayi data dibe otherwise all data dibe
    const sortOption = {};
    sortOption[sortBy] = sort === "asc" ? 1 : -1; // 1 & -1 diye ascendin r dsc bujhiyechi r sort ta jehetu title diye kortechi tai sortBy ta string
    // ekhane sob gulo query apply korechi
    const data = yield ((_b = (_a = book_model_1.Book === null || book_model_1.Book === void 0 ? void 0 : book_model_1.Book.find(query)) === null || _a === void 0 ? void 0 : _a.sort(sortOption)) === null || _b === void 0 ? void 0 : _b.limit(Number(limit)));
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data
    });
}));
// BookRouter.get("/:bookId", async (req: Request, res: Response)=>{
//     const idOfBook = req.params.bookId;
//     const book = await Book.findById(idOfBook);
//     res.status(200).json({
//         success: true,
//         message: "Book retrieved successfully",
//         data: book 
//     })
// })
exports.BookRouter.patch("/update/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const data = yield book_model_1.Book.findOneAndUpdate({ _id: bookId }, updatedBody, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Book updated failed",
            error
        });
    }
}));
exports.BookRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_model_1.Book.deleteOne({ _id: bookId });
    res.status(200).json({
        success: true,
        message: "deleted successfully",
        data: null
    });
}));
