const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
const { SchemeDetails} = require('./database/schemeDetails')
const  { Schemes } = require('./database/schemes');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://amitlpatil282006:azaDXBYoOz7ryKwI@cluster1.h8gyl.mongodb.net/')


app.get('/schemes', async (req, res) => {

    try {
        const allSchemes = await Schemes.find();
        res.json(allSchemes);  // Send JSON response
    } catch (error) {
        console.error("Error fetching schemes:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/schemes/:id', async (req, res) => {
    try {
        const id = String(req.params.id);
        const allSchemes = await  SchemeDetails.find({id});
        console.log(allSchemes);
        res.json(allSchemes);  // Send JSON response
    } catch (error) {
        console.error("Error fetching schemes:", error);
        res.status(500).send("Internal Server Error");
    }
})



app.post('/schemes', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})