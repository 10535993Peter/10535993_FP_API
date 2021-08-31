const express = require("express");
const Adverts = require("./models/adverts");
const Users = require("./models/users");
const Vendor = require("./models/vendor");
const router = express.Router();

module.exports = router;

//Adverts

router.get("/adverts", async (req, res)=>{
    const adverts = await Adverts.find();
    res.send(adverts);
});

router.get("/adverts/:id", async (req, res)=>{
    try{
        const advert = await Adverts.findOne({_id: req.params.id});
        res.send(advert);
    } catch {
        res.status(404);
        res.send({error: "The advert you're looking for doesn't exist!"});
    }
});

router.get("/myAdverts/:id", async (req, res)=>{
    try{
        const adverts = await Adverts.find({author: req.params.id});
        res.send(adverts);
    } catch {
        res.status(404);
        res.send({error: "The adverts you're looking for doesn't exist!"});
    }
});

router.post("/createAd", async(req, res)=>{
    const advert = new Adverts({
        id : req.body.id,
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        lastUpdated: req.body.lastUpdated,
        dateCreated: req.body.dateCreated,
        featuredImage: req.body.featuredImage
    });

    await advert.save();
    res.send(advert);
});

router.get("/deleteAd/:id", async (req, res) => {
	try {
		await Adverts.deleteOne({ _id: req.params.id });
		res.status(200).send({message: "The advert has been deleted"});
	} catch {
		res.status(404);
		res.send({ error: "The advert you're looking for doesn't exist!" });
	}
});



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
router.put("/vendors/:id", async (req, res, next)=>{
    Vendor.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Vendor.findOne({_id: req.params.id}).then(function(vendor){
            res.send(vendor);
        });
    });
});

//delete a vendor from the database
router.delete("/vendors/:id", async (req, res, next)=>{
    Vendor.findByIdAndRemove({_id: req.params.id}).then(function(vendor){
        res.send(vendor);
    });
});


// Users
//add a new user to the database
router.post("/register", async(req, res, next)=>{
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