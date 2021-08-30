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

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // variables for filepaths to users and vax-details routes files.


// // variable for MongoDB Connection URL taken from process.argv passed as command line arguments when running API
// var mongoUrl = process.argv[4]; // 'mongodb://fyp-mongodb-cluster-service-loadbalancer-local/database' 'mongodb://localhost:27017/fyp-db'

// // open's connection to supplied MongoDB URL
// mongoose.connect(mongoUrl, {useNewUrlParser: true}); 
// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // used to whitelist requests originating from the specified array of frontend server domains and ports taken from process.argv passed as command line arguments when running API
// app.use(cors({origin: [process.argv[2],process.argv[3]]})); //"http://localhost:4200","http://localhost:80","http://localhost"


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;