const express = require('express');
const path = require("path")
const mongoose = require('mongoose');
const db = require("./models");

const PORT = process.env.PORT || 3000;


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}

    ).then(data => {
        res.json(data)
        console.log(data)
    })
});

app.get("/api/workouts/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});