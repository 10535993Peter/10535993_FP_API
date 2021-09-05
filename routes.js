const express = require("express");
const Adverts = require("./models/adverts");
const Users = require("./models/users");
const Vendor = require("./models/vendor");
const userController = require('../controllers/userController');
const router = express.Router();


module.exports = router;

// Login
router.post("/login", async(req, res, next)=>{
    var session = req.session;
    console.log(req.body);
    const user = await Users.findOne({email: req.body.email, password: req.body.password}, (err, result)=>{
        if(err){
            res.send({error: err});
        }
    });

    if(user){
        user.lastLogin = new Date();
        await user.save();
        session.user = user;
        session.logged_in = "true";
        res.send({status: "success", "user": user});
    } else {
        res.status(200);
        res.send({ error: "Couldn't log you in, please check your credentials and retry" });
    }
    
});

router.get("/isLoggedIn", async(req, res, next)=>{
    var session = req.session;
    console.log(session);
    if(session != undefined && session.logged_in != undefined && session.logged_in == 'true'){
        res.send("Logged In");
    } else {
        res.send("Logged Out");
    }
});

router.get("/loggedInUser", async(req, res, next)=>{
    var session = req.session;
    if(session != undefined && session.logged_in != undefined && session.logged_in == 'true'){
        res.send(session.user);
    } else {
        res.send("Logged Out");
    }
});

router.get("/logout", async(req, res, next)=>{
    var session = req.session;
    session.user = null;
    session.logged_in = "false";
    res.status(200);
    res.send("Logged Out");
});


//Vendors:
// add a new vendor to the database
router.post("/vendors", async(req, res, next)=>{
     const vendor = new Vendor({
        company: req.body.company,
        companyContactName: req.body.companyContactName,
        companyEmail: req.body.companyEmail,
        address: req.body.address,
        internalContact: req.body.internalContact,
        sector: req.body.sector,
        lastUpdated: new Date,
        dateCreated: new Date(),
        lastLogin: null
        });

    await vendor.save();
    res.send({status: "success", "vendor": vendor});
});

//get a full list of vendors from the database
router.get("/vendors", async (req, res, next)=>{
    const vendor = await Vendor.find();
    res.send(vendor);
});

//get a list of vendors that match the company name 
router.get("/vendors/:company", async (req, res, next)=>{   
        try {
            Vendor.find({company: req.params.company}).then(function(vendor){
            res.send(vendor);
        });
        } catch {
        res.status(404);
        res.send({error: "The vendor you're looking for doesn't exist!"});
    }
});

//change a vendor in the database
// router.put("/vendors/_id", async (req, res, next)=>{
//     Vendor.findByIdAndUpdate({_id: req.params._id}, req.body).then(function(){
//         Vendor.findOne({_id: req.params._id}).then(function(vendor){
//             res.send(vendor);
//         });
//     });
// });
// router.put('/vendors/:id', (req, res) => {
//     const vendor = getUser(req.params.id)
   
//     if (!user) return res.status(404).json({})
//     this.currentVendor.company: req.body.company;
//     companyContactName: req.body.companyContactName;
//     companyEmail: req.body.companyEmail;
//     address: req.body.address;
//     internalContact: req.body.internalContact;
//     sector: req.body.sector;
//     lastUpdated: new Date;
//     res.json(vendor)
//    })

//delete a vendor from the database
router.delete("/vendors/:id", async (req, res, next)=>{
    Vendor.findByIdAndRemove({_id: req.params.id}).then(function(vendor){
        res.send(vendor);
    });
});

// router.delete("/vendors/:id", async (req, res) => {
// 	try {
// 		await Vendor.deleteOne({ _id: req.params.id });
// 		res.status(200).send({message: "The vednor has been deleted"});
// 	} catch {
// 		res.status(404);
// 		res.send({ error: "The vendor you're looking for doesn't exist!" });
// 	}
// });


// Users
//add a new user to the database
router.post("/users", async(req, res, next)=>{
    const user = new Users({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        company: req.body.company,
        lastUpdated: new Date,
        dateCreated: new Date(),
        lastLogin: null
    });

    await user.save();
    res.send({status: "success", "user": user});
});

//get a list of users from the database
router.get("/users", async (req, res, next)=>{
    const users = await Users.find();
    res.send(users);
});


//change a user in the database
router.put("/users/:id", async (req, res, next)=>{
    const users = await Vendor.find();
    res.send(users);
});

//delete a user from the database
router.delete("/users/:id", async (req, res, next)=>{
    const users = await Vendor.find();
    res.send(users);
});

router.get("/users/:email", async (req, res, next)=>{   
    try {
        Vendor.find({email: req.params.email}).then(function(user){
        res.send(user);
    });
    } catch {
    res.status(404);
    res.send({error: "The email you're looking for doesn't exist!"});
}
});

// router.route('/userCount').get(function(req,res){
//     users.count( {}, function(err, result){
//         if(err){
//             res.send(err)
//         }
//         else{
//             res.json(result)
//         }
//    })
// })

router.get('/userCount', function(req, res) {
    if(req.user) {
        db.users.count(function(err, count){
            res.render('index', {
                count: count,
                user: req.user
            })
        })
    } else {
        res.send('index');
    }
});