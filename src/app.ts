import express, { Application } from "express";
import { BookRouter } from "./app/controllers/book.controller";

const app: Application = express();
app.use(express.json());
app.use("/api/books", BookRouter)    

app.get("/", (req, res) => {
  res.send("Welcome to the Library Management System App");
});

export default app;