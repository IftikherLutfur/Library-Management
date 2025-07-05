import express, { Application } from "express";
import { BookRouter } from "./app/controllers/book.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";
import cors from "cors"

const app: Application = express();
    
app.use(express.json());
app.use(cors({
  origin: "https://library-frontend-dusky-theta.vercel.app",
}));
app.use("/api/books", BookRouter)    
app.use("/api/borrow", borrowRouter )   

app.get("/", (req, res) => {
  res.send("Welcome to the Library Management System App");
});

export default app;