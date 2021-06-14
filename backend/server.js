//jshint esversion:6
require('dotenv').config()
const express =require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const app=express();
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

//----------------------- Database ----------------------
const dbName='mysecuritydb';

//mongoDbAtlas connection
const url = process.env.URL;

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
        required: [true, "Password required"],
        trim:true
    },   
},{timestamps : true});



//userSchema.plugin(encrypt , {secret : process.env.SECRET,encryptedFeilds : ['password']});

const user = new mongoose.model("user", userSchema);

//Notes schema

const noteSchema = new mongoose.Schema({
    username: {
        type :String,
        required :[true]
    },
    title:{
        type : String
    },
    content :{
        type : String
    }
},{timestamps : true});

const note = new mongoose.model("note", noteSchema);

//Notes route

app.route("/notes")
.get(function(req,res){
    //console.log(req.cookies.accesstoken);
    note.find({username : req.body.username},function(err,found){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(found);
            res.send(found);
        }
    });
})
.post(function(req,res){
    console.log(req.body.username);
    console.log(req.body.title);
    console.log(req.body.content);

    const newnote=new note({
        username:req.body.username,
        title:req.body.title,
        content:req.body.content
    });

    newnote.save(function(err){
        if(!err){
            res.send("successfully added your note");
            console.log("successfully added your notes");
        }
        else{
            res.send(err);
        }
    });

})
.put(function(req,res){
   
   note.updateOne(
       {username : req.body.username},
       {title:req.body.title , content:req.body.content},
       function(err){
           if(!err){
               console.log("note updated");
               res.send("note updated");
           }
           else{
            console.log("note cannot be updated");
               res.send("Cannot find the note which has to be updated");
           }
       }
    );
})
.delete(function(req,res){
    
    note.deleteOne(
        {username:req.body.username},
        {title:req.body.title , content:req.body.content},
        function(err){
            if(!err){
                console.log("note deleted");
                res.send("note deleted");
            }
            else{
             console.log("note cannot be deleted");
                res.send("Cannot find the note which has to be deleted");
            }
        }
     );

});


//authentication

const authenticate =(req,res,next)=>{
    try{
        
        var token = req.cookies.accesstoken;
        //this authorization.split is not working
        //token = req.headers.authorization.split(' ')[1];
        
        if(token == null) return res.sendStatus(401);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.sendStatus(403);
            else{
                console.log("verified account");
                req.user=user;
                next();
            }
           
        });
           
     
    }

    catch(e){
        console.log(e);
        res.send("Authentication failed");
    }
};


//REST API
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
.get(authenticate,function(req,res){
    
    user.findOne({username:req.params.Username},function(err,founduser){
        if(founduser){
            res.send(founduser);
        }
        else{
            res.send(err);
        }
    });

})
.post(authenticate,function(req,res){
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


app.get('/',function(req,res,next){
    res.send("Hello from backend!!");
})

//routes
app.get("/secrets",authenticate,function(req,res){
   
    console.log("this is the response :",res.data);
    res.status(200).send(res.user);
});

app.get("/logout",function(req,res){
    console.log("removing all cookies and logging out");
    res.clearCookie("accesstoken").sendStatus(200);
});
app.post("/signup",function(req,res){

    console.log(req.body.username);
    console.log(req.body.password);

    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.send(err);
        }

        const newuser=new user({
            username:req.body.username,
            password:hashedPass
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
  
    

});


app.post("/login",function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);
    
    user.findOne({username:req.body.username},function(err,found){
        if(err){
            console.log(err);
        }
        else{
            
            if(found){
                bcrypt.compare(req.body.password,found.password,function(err,result){
                    if(err){
                        console.log(err);
                        res.send(err);
                    }
                    if(result){

                        const username = req.body.username;
                        const user={name:username};
                        let token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1hr'});
                        res.status(200).cookie('accesstoken',token,{/*sameSite:'strict',path :'http://localhost:3000/',domain:'http://localhost:3000/secrets' ,*/httpOnly:true}).send(token);
                        console.log("login successful");
                        
                    }
                    else{
                        res.send("Password does not matched");
                    }
                })
            }
        }
        
    });


});