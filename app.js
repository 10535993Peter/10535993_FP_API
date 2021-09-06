const express = require("express");
const cors = require('cors');
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

app.set("view engine", "ejs");

console.log(process.argv);
var mongo = process.argv[4];

//connect to mongodb:
mongoose.connect(mongo, {useNewUrlParser: true}).then(()=>{  
    app.use(session({
        secret : "apisecret",
        saveUninitialized: false,
        resave: false
    }));
mongoose.Promise = global.Promise;

// launch api locally by passing in all arguements: node app.js http://localhost:4200 http://localhost:3000 mongodb://localhost:27017/ca-db
    app.use(express.json());
    app.use(cors({credentials: true, origin:[process.argv[2], process.argv[3]]}));

//initialize routes
    app.use("/api", routes);

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err.message});
});

//listen for requests:
    app.listen(3000, ()=>{
        console.log("CA API started on port 3000, test using http://localhost:3000/");
    });
});