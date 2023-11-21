const express = require("express");
const router = express.Router();
const fs = require("fs");
// const {v4: uuid} = require ("uuid");
const quotesJson = require("../data/quotes.json");


// Get all quotes data
router.get("/", (_req, res)=> {
    res.send(quotesJson);
});

// Get one quote using req.params
router.get("/:id", (req, res)=> {
    const {id} = req.params;
    
    const selectQuote = quotesJson.find((quote) => quote.id === id);
    if(selectQuote) {
        res.send(selectQuote);
    } else {
        res.status(400).send("Incorrect quote content");
    }
    });

    module.exports = router;