const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const formRoutes = require("./routes/form");
const quoteRoutes = require("./routes/quotes");

//Middleware
const PORT = process.env.PORT;

app.use(express.json());
// app.use(express.static("public"));
app.use(cors());

app.use("/forms", formRoutes);
app.use("/quotes", quoteRoutes);

app.get("/", (_req, res)=> {
    res.send("Welcome to the server");
});

app.listen(PORT, ()=> {
    console.log(`Express server is running at ${PORT}`);
})