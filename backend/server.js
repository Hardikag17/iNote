//jshint esversion:6
require('dotenv').config()
const express =require("express");
const mongoose=require("mongoose");
const cors = require("cors");
var uniqueValidator = require('mongoose-unique-validator');
var encrypt = require('mongoose-encryption');
const app=express();
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//----------------------- Database ----------------------
const dbName='mysecuritydb';

//mongoDbAtlas connection
const url = "mongodb+srv://hardik:safe12@cluster0.7ruau.mongodb.net/mysecuritydb?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
};

const db = mongoose.connection;
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

//Making a collection schema
const userSchema= new mongoose.Schema({
    username :{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    password :{
        type: String,
        trime: true,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
            },
            message: "Password must be of atleast length 8 including one uppercase letter and a number"
        },
        required: [true, "Password is required"]
    }    
});



userSchema.plugin(encrypt , {secret : process.env.SECRET,encryptedFeilds : ['password']});

const user = new mongoose.model("user", userSchema);



//express routing
app.route("/users")
.get(function(req,res){
    user.find(function(err,foundusers){
        if(!err){
            res.send(foundusers);
        }
        else{
            res.send(err);
        } 
    });
})
.post(function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);


    const newuser=new user({
        username:req.body.username,
        password:req.body.password
    });

    newuser.save(function(err){
        if(!err){
            res.send("successfully added your account");
            console.log("successfully added your account");
        }
        else{
            res.send(err);
        }
    });
    
})
.delete()

//targetting a single entry

app.route("/users/:Username")
.get(function(req,res){
    
    user.findOne({username:req.params.Username},function(err,founduser){
        if(founduser){
            res.send(founduser);
        }
        else{
            res.send(err);
        }
    })

})
.post(function(req,res){
    user.findOne({username:req.params.Username},function(err,found){
        if(err){
            console.log(err);
        }
        else{
            
            if(found){
                if(found.password === password){
                    console.log("password match");
                    res.send(found);
                    
                }
                else{
                    
                    console.log("password wrong");
                    res.send(err);
                }
            }
        }
    });
}).delete();

app.listen(9000,function(){
    console.log("Server is running");
});


/*
if(user.findOne({username:username})){

        user.findOne({username:username},function(err,found){
            if(err){
                console.log(err);
            }
            else{
                
                if(found){
                    if(found.password === password){
                        console.log("password match");
                        
                        
                    }
                    else{
                        
                        console.log("password wrong");
                        
                    }
                }
            }
        });
    }
    else{
    // else statement is not working !!
        const newuser=new user({
            username:req.body.username,
            password:req.body.password
        });

        newuser.save(function(err){
            if(!err){
                res.send("successfully added your account");
                console.log("successfully added your account");
            }
            else{
                res.send(err);
            }
        });
    }
*/