const express = require("express");
const cors = require('cors');
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");

console.log(process.argv);

//for mongoose connect you can pass in the variable from the realease pipeline after npm start//
//pass an arguement for database connection//
////remove --- mongodb://localhost:27017/ca-db
//URL may need to change to mongodb://mongo-service/database
mongoose.connect("http://20.54.33.229/", {useNewUrlParser: true}).then(()=>{
    const app = express();
    app.use(session({
        secret : "caAPISecret",
        saveUninitialized: false,
        resave: false
    }));

//origin: 'http://localhost:4200'//
    app.use(express.json());
// update below with app.use(cors({credentials: true, origin:process.argv[2], process.argv[3]}));
    app.use(cors({credentials: true, origin:process.argv[2],}));
    app.use("/api", routes);
//pass arguement to whitelist the port of the frontend//
//removed http://localhost:3000//
    app.listen(3000, ()=>{
        console.log("CA API started on port 3000, test using http://40.67.253.31/");
    });
});

