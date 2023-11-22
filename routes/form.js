const express = require("express");
const router = express.Router();
const fs = require("fs");
const {v4:uuid} = require ("uuid");
const formsJson = require("../data/forms.json");
const dayjs = require("dayjs");



// Get all form data
router.get("/", (_req, res)=> {
    res.send(formsJson);
});

// Get one video using req.params
// router.get("/:id", (req, res)=> {
//     const {id} = req.params;
    
//     const selectForm = formsJson.find((form) => form.id === id);
//     if(selectForm) {
//         res.send(selectForm);
//     } else {
//         res.status(400).send("Incorrect form content");
//     }
//     });

router.get("/:timestamp", (req, res)=> {
    const {timestamp} = req.params;
    
    const selectForm = formsJson.find((form) => form.timestamp === timestamp);
    if(selectForm) {
        res.send(selectForm);
    } else {
        // res.status(400).send("No entries for this date");
        res.status(400).json({ alert: "No entries on this date." });
    }
    });

// upload new form 
router.post("/", (req, res)=> {

    console.log("req.body:",req.body);

    const {input1, input2, input3, input4, input5, input6, meditationTime} = req.body;

    let date = Date.now();

    const newform = { 
    "id": uuid(),
    "input1": input1,
    "input2": input2,
    "input3": input3,
    "input4": input4,
    "input5": input5,
    "input6": input6,
    "meditationTime": meditationTime,
    "timestamp": dayjs(date).format("MM-DD-YYYY")
}
    
    formsJson.unshift(newform);

    const formString = JSON.stringify(formsJson);
    fs.writeFileSync("./data/forms.json", formString);
    res.send("form uploaded");
});

module.exports = router;