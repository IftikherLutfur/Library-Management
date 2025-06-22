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
exports.BookRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield book_model_1.Book.create(body);
    res.status(200).json({
        success: true,
        message: "Book created successfully",
        data
    });
}));
exports.BookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { filter, sortBy = "title", sort, limit } = req.query;
    const query = {};
    if (filter) {
        query.genre = filter;
    }
    const sortOption = {};
    sortOption[sortBy] = sort === "asc" ? 1 : -1; // 1 & -1 diye ascendin r dsc bujhiyechi r sort ta jehetu title diye kortechi tai sortBy ta string
    const data = yield ((_b = (_a = book_model_1.Book === null || book_model_1.Book === void 0 ? void 0 : book_model_1.Book.find(query)) === null || _a === void 0 ? void 0 : _a.sort(sortOption)) === null || _b === void 0 ? void 0 : _b.limit(Number(limit)));
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data
    });
}));
exports.BookRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield book_model_1.Book.findById(bookId);
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data
    });
}));
exports.BookRouter.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const book = yield book_model_1.Book.findOneAndDelete({ _id: bookId });
    if (!book) {
        res.status(404).json({
            success: false,
            message: "The book not found"
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: "deleted successfully",
            data: null
        });
    }
}));
