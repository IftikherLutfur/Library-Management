import mongoose, { Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchenma = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true }
},
{
    timestamps: true,
    versionKey: false
})



export const Borrow = mongoose.model("Borrow", borrowSchenma)