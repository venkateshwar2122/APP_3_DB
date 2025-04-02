let mongoose = require("mongoose");
let express = require("express");

let schobj = new mongoose.Schema({
    "_id": Number,
    "name": String,
    "age": Number,
    "place": String,
    "gen": String
});

let dm = mongoose.model("users", schobj); 

mongoose.connect("mongodb://localhost:27017/hfs3db")
    .then(() => {
        console.log("connection okay");
    })
    .catch((err) => {  
        console.log("error in db connection", err.message);
    });

let app = express();
app.use(express.json());

app.post("/add", (req, res) => {
    let data = new dm(req.body);
    data.save()
        .then(() => {
            res.send("data added");
        })
        .catch((err) => { 
            res.send("error in storing data: " + err);
        });
});

app.get("/", (req, res) => {
    dm.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.send("error in getting data");
        });
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000/");
});
