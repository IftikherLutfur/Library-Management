import mongoose, { Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";


const bookSchema = new Schema <IBook> ({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true, uppercase: true,
    enum: {
      values:["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
      
    } 
},
  isbn: { type: String, required: true },
  description: { type: String, required: true },
  copies: { type: Number, required: true },
  available: { type: Boolean, required: true }
},
{
  timestamps: true,
 versionKey: false }

)

bookSchema.pre("save", async function(next){
  this.title = await this.title.trim()
  this.author = await this.author.trim()
  this.genre = await this.genre.toUpperCase().trim()
  next()
})


bookSchema.pre("findOneAndUpdate", function(next){
   this.set({updatedAt: new Date()})
   next()
})


bookSchema.post("findOneAndDelete", function(doc){
  console.log(`${doc._id} has been deleted`)
})

export const Book = mongoose.model<IBook>("Book", bookSchema);