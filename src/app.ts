import express, { Application } from "express";

const app: Application = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to the Library Management System App");
});

export default app;