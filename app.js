const express = require("express");
const cors = require('cors');
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");

console.log(process.argv);

//for mongoose connect you can pass in the variable fromt he realease pipeline after npm start//
//passa rguement for database connection//
mongoose.connect("mongodb://localhost:27017/ca-db", {useNewUrlParser: true}).then(()=>{
    const app = express();
    app.use(session({
        secret : "caAPISecret",
        saveUninitialized: false,
        resave: false
    }));

//origin: 'http://localhost:4200'//
    app.use(express.json());
//
    app.use(cors({credentials: true, origin:process.argv[2]}));
    app.use("/api", routes);
//pass arguement to whitelist the post of the frontend//
    app.listen(3000, ()=>{
        console.log("CA API started on port 3000, test using http://localhost:3000");
    });
});

