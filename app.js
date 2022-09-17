//* required packages
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

//* create the express server
const app = express();

//* server port number
const PORT = process.env.PORT || 3000;

//* set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//* needed to parse html data for POST request
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {});

//* start the server
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
