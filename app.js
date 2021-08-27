const express = require("express");
const cors = require('cors');
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");

console.log(process.argv);
var mongo = process.argv[5];
// launch api locally by passing in all arguements: node app.js http://localhost:4200 http://localhost:3000 mongodb://localhost:27017/ca-db

mongoose.connect(mongo, {useNewUrlParser: true}).then(()=>{
    const app = express();
    app.use(session({
        secret : "apisecret",
        saveUninitialized: false,
        resave: false
    }));

////origin: 'http://localhost:4200'//
    app.use(express.json());
    app.use(cors({credentials: true, origin:[process.argv[2], process.argv[3], process.argv[4]]}));
    app.use("/api", routes);
    app.listen(3000, ()=>{
        console.log("CA API started on port 3000, test using http://localhost:3000/");
    });
});

