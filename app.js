const express = require("express");
const cors = require('cors');
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");

console.log(process.argv);

//for mongoose connect you can pass in the variable from the release pipeline after npm start//
//pass an arguement for database connection//

mongoose.connect(process.argv[4], {useNewUrlParser: true}).then(()=>{
    const app = express();
    app.use(session({
        secret : "caAPISecret",
        saveUninitialized: false,
        resave: false
    }));

//origin: 'http://localhost:4200'//
    app.use(express.json());
    app.use(cors({credentials: true, origin:process.argv[2], origin:process.argv[3]}));
    app.use("/api", routes);

    app.listen(3000, ()=>{
        console.log("CA API started on port 3000, test using http://localhost:3000/");
    });
});

