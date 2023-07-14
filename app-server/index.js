/* 
const mongoose = require('mongoose')
const auth = require("./db/auth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//const dbConnectTry = require("./db/dbConnect");
const User = require("./db/userModel")
const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/Auth').then(() => {
    console.log('conn')
})


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

//dbConnectTry();

app.post("/register", (request, response) => {

    const pw = request.body.password;
    console.log(pw);
    // hash the password
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
          email: request.body.email,
          password: hashedPassword,
        });
  
        // save the new user
        user
          .save()
          // return success if the new user is added to the database successfully
          .then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch error if the new user wasn't added successfully to the database
          .catch((error) => {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        response.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
  });

  app.post('/login', (req, res) => {
    User.findOne({email : req.body.email})
    .then((user) => {
        bcrypt.compare(req.body.password, user.password)
        .then((passCheck) => {
            if(!passCheck){
                return res.status(400).send({
                    message: "password doesnt match",
                    
                })
            }

            const token = jwt.sign({
                userId : user._id,
                userEmail : user.email
            },
            "RANDOM-TOKEN",
            {expiresIn : "24h"}
            )

            res.status(200).send({
                message: "Login succesful",
                email: user.email,
                token

            })

        })
        .catch((e) => {
            res.status(400).send({
                message: "Incorrect password",
                e
            })
        })
    })
    .catch((err) => {
        res.status(404).send({
            message: "Email doesn't exist",
            err
        })
    })
  })
  
  app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
  });
  
  // authentication endpoint
  app.get("/auth-endpoint", auth,  (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });

app.listen(3001, () => {
    console.log('listening');
})

 */

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./db/userModel')
app.use(express.json())
require('dotenv').config()
const jwt = require('jsonwebtoken')

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("connected")
})


app.post('/register', (req, res) => {
    const pw = req.body.password;
    console.log(pw);
    bcrypt.hash(pw, 10)
    .then((hashedPw) => {
        const user = new User({
            email : req.body.email,
            password: hashedPw,
        })

        user.save()
        .then((user) => {
            res.status(200).send({
                message: "User creted succesfully!",
                user
            })
        })
        .catch((e) => {
            res.status(500).send({
                message: "User not created succesfully",
                e
            })
        })
    })
    .catch((e) => {
        res.status(500).send({
            message : "Password didnt hash :p",
            e

        })
    })


})

app.post('/login', (req, res) => {
    User.findOne({email : req.body.email})
   .then((user) => {
    bcrypt.compare(req.body.password, user.password)
    .then((passCheck) => {
        if(!passCheck){
            return res.status(400).send({
                message: "Password doesnt match!"
            })
        }

        const token = jwt.sign({
            userId: user._id,
            userEmail: user.email
        },
        "RANDOM-TOKEN",
        {expiresIn: "24h"}
        
        )

        res.status(200).send({
            message: "Login Succesful",
            email: user.email,
            token

        })



   })
   
   })



})

app.listen(3001, () => {
    console.log("listening!")
})