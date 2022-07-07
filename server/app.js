//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");


const User = require("../server/models/User");

const session = require("express-session");

const UserRoutes = require("../server/routers/User");
const LandRoutes = require("../server/routers/Land");

const Land = require("../server/models/Land");


const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.static("public"));
app.set('view engine' , 'ejs');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.use(session({
    secret: "MyNameIsOriya",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



mongoose.connect("mongodb://localhost:27017/Metacentraland" , {useNewUrlParser: true} );
const db = mongoose.connection;
db.on("error" , (error) => console.log(error));
db.once("open" , () => {
  console.log("Connect to DB");
  Land.find({} , async function(err , foundLand){
    if (foundLand.length === 0){
       var size =50;
      for (var i=0; i< size ; i++){
        for(var j=0 ; j<size ; j++){
          const type = ((i>20 && i<30 && j>20 && j<30) || //big park
          (i>5 && i<10 && j>5 && j<10) || //up and left small park
          (i>39 && i<44 && j>5 && j<10) || //up and right small park
          (i>5 && i<10 && j>39 && j<44)|| //down and left small park
          (i>39 && i<44 && j>39 && j<44) /*down and right small park*/) ? "park" : (
            (i>9 && i<40 && j>6 && j<9) || // up road
           (i>9 && i<40 && j>40 && j<43) || // down road
           (i>6 && i<9 && j>9 && j<40) || // left road
           (i>40 && i<43 && j>9 && j<40) || // right road 
           (i == 25 && ( (j>8 && j<21) || (j>29 && j<41))) || //road up to down park
           (j == 25 && ( (i>8 && i<21) || (i>29 && i<41)))) ? "road" : "NFT";
          const cost = Math.floor(Math.random()*185)+15;

          const land = new Land({
            ownerId: "O&N.Ltd",
            rowIndex: i,
            colIndex: j,
            type: type,
            cost: cost,
            game: "",
            isForSale: type==="NFT"
          })
          await land.save();
       }
      }
    }
  })

});

app.use("/users" ,UserRoutes);
app.use("/lands" ,LandRoutes);





app.get("/" ,function(req, res){
    
});

app.get("/auth/google" , 
    passport.authenticate("google" , {scope: ["profile"]})
);

// just to check
// app.get("/auth/google" , function(req, res){
//     console.log("here");
// })

// app.get("/auth/google/main", 
//   passport.authenticate("google", { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect main.
//     console.log("goooooogle");
//     res.redirect('/main');
//   });

// app.get("/login" ,function(req, res){
//     res.render("login");
// });

app.get("/register" ,function(req, res){
    
});

app.get("/main" ,function(req, res){
    console.log("in get main ");
    
});

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
        return next(err); 
    }
    res.redirect('/');
  });
});


// app.post("/register" , function(req , res){

//     console.log("hahahahahahahahha");
//     User.register({username: req.body.username} , req.body.password , function(err , user){
//         if (err) {
//             console.log("erririrri");
//             console.log(err);
//             res.redirect("/register");
//         }else{
                
//             passport.authenticate("local")(req , res , function(){

//                 res.redirect("/login");
//             });
//         }
//     })
// });

// app.post("/login" , function(req , res){
   
//     const user = new User({
//         username: req.body.username,
//         password: req.body.password
//     });

//     req.login(user , function(err){
//         if (err){
//             console.log(err);
//             res.redirect("/login");
//         }else{
//             passport.authenticate("local")(req , res , function(){
//                 console.log("in post login");
//                 res.redirect("/main");
//             });
//         }
//     });


// });

// app.post("/api/google-login" , async (req , res) => {
//     const {token} = req.body;
//     const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID
//     });
//     const { name , email} = ticket.getPayload();
//     res.json({name, email});
// });



app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});





app.listen(4000 , function(){
    console.log("Server started on port 4000");
})