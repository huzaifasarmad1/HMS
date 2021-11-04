const express = require('express')
const app = express()
const port = 3000
var appointments = require('./appointments_schema')
var login = require('./login')
var signup = require('./signup_schema.js')
var moment = require('moment')
var bodyparser = require('body-parser')
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const saltRounds = 10;
const bcrypt = require('bcrypt');
var cors = require('cors');
app.use(bodyparser())
app.use(cors());
mongoose.connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Error In Mongo Connection')
        console.log(err)
    }
    else {
        console.log("Connection with MongoDB successfull")
    }
})

app.post("/signup", (req, res) => {
    console.log("check");
    bcrypt.genSalt(saltRounds, function (err, salt) {
        console.log(req.body.role)
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            console.log('in hash')
            var obj1 = { first_name: req.body.first_name, second_name: req.body.second_name, email: req.body.email, role: req.body.role,activeaccount:true, password: hash }
            signup.create(obj1, function (err, db) {
                if (!err) {
                    console.log('no error in creation')
                   
                    signup.findOne({ email: req.body.email }, function (err, db) {
                      
                        if (!err) {
                            if (db != null) {
                                const payload = obj1;
                                jwt.sign(payload, 'superSecret', function (err, token) {
                                    var obj3 = { token: token, id: db.user_id }
                                    login.create(obj3, function (err, db) {
                                        if (!err) {
                                            res.status(200).send("signup successful")
                                        }
                                        else {
                                            console.log('signup unsuccessfull')
                                            console.log(err)
                                            res.status(500).send("signup unsuccessful")
                                        }
                                    },
                                    )
                                })
                            }
                            else {
                                res.status(500).send('db is null')
                            }
                        }
                    })
                }
                else {
                    res.status(500).send('err')
                    console.log(err)
                }
            })
        })
    });

});

app.post('/login', (req, res) => {
    console.log('inside login')
    signup.findOne({ email: req.body.email }, function (err, db) {
        if (!err) {
            if (db != null) {
                console.log("EMAIL FOUND")
                if(db.activeaccount==true){
                bcrypt.compare(req.body.password, db.password, function (err, password_response) {
                    {
                       if (password_response == true) {
                            const payload = {
                                first_name: db.first_name,
                                second_name: db.second_name,
                                user_id:db.user_id,
                                role:db.role
                            };

                            jwt.sign(payload, 'superSecret', function (err, token) {
                                signup.findOne({ email: req.body.email }, function (err, db) {
                                    if (!err) {
                                       if (db != null) {
                                           var obj3 = { token: token, id: db.user_id }
                                            login.create(obj3, function (err, db) {

                                                if (!err) {
                                                    var obj4 = {token:token, message: "Login successful" }
                                                    console.log(obj4)
                                                    res.status(200).send(obj4)
                                                }
                                                else {
                                                    console.log(err)
                                                    res.status(500).send("Error Somewhere")
                                                }
                                            },
                                            )
                                        }
                                    }
                                }
                                )
                            })
                        } else {
                            console.log('Incorrect Password')
                            res.status(503).send("INCORRECT PASSWORD")
                        }

                    }
                })
            }
            else{
                res.status(503).send("Account Deactivated")
            }
            }
            else {
                console.log("Email not found")
                res.status(500).send("INCORRECT EMAIL")
            }

        }
    })
})
app.get('/getbookedappointments', function (req, res) {
    // var doctor=req.body.doctor
    appointments.find({user_id:req.body.user_id,active:true}, function (err, db) {
        if (!err) {
            if (db != null) {
                console.log("Appointments Found")
                res.send(db)
            }
            else {
                res.send("No appointments Found")
            }
        }
        else {

            console.log("Error Somewhere")
            console.log(err)
        }
    })
})
app.get('/pastappointments', function (req, res) {
    // var doctor=req.body.doctor
    appointments.find({user_id:req.body.user_id,active:false}, function (err, db) {
        if (!err) {
            if (db != null) {
                console.log("Appointments Found")
                res.send(db)
            }
            else {
                res.send("No appointments Found")
            }
        }
        else {

            console.log("Error Somewhere")
            console.log(err)
        }
    })
})
app.put('/bookappointment', function (req, res) {
    appointments.updateOne({ user_id: req.body.user_id, doctor: req.body.doctor, time: req.body.time },
        { active: req.body.active }
        , function (err, db) {
            if (!err) {
                appointments.findOne({ doctor: req.body.doctor, time: req.body.time }, function (err, db) {
                    if(db!=null){
                    console.log(db)
                    if (db.active == true) {
                        console.log("Already Booked")
                        res.status(200).send({message:'Already Booked'})
                    }
                    else {
                        signup.find({user_id:req.body.user_id}, function (err, db) {
                            if (!err) {
                                if (db != null) {
                                    // console.log(db)
                                    console.log("Appointments Found")
                                    appointments.updateOne({user_id: req.body.user_id},{patient:db.first_name+''+db.second_name},
                                        function(err,db){
                                            if(err){
                                                console.log(err+'error')
                                            }
                                            else{
                                            res.send("updated item Successfull")
                                            }
                                        })
                               }
                                else {
                                    res.send("No appointments Found")
                                }
                            }
                            else {
                     console.log("Error Somewhere")
                                console.log(err)
                            }
                        })
                       
                    }
             }
                else{
                    res.status(400).send('No Time Available')
                    console.log('Db is null')
                }
                })
            }
            else {
                res.status(500).send('unsuccessfull')
            }
        })
})
app.post('/doctors-data', function (req, res) {
    signup.find({user_id:req.body.user_id}, function (err, db) {
        if (!err) {
            if (db != null) {
                // console.log(db)
                console.log("Appointments Found")
                appointments.find({doctor:db.doctor}, function (err, db) {
                    console.log(db)
res.send(db)
                })
           }
            else {
                res.send("No appointments Found")
            }
        }
        else {
 console.log("Error Somewhere")
            console.log(err)
        }
    })
});
app.post('/add-data', function (req, res) {
    var doctor = req.body.doctor
    var time = req.body.time
    var active = req.body.active
    var obj1 = { doctor: doctor, time: time, active: active }
    appointments.create(obj1, function (err, db) {
        if (!err) {
            console.log("new appointment added")
            res.status(200).send()
        }
        else {
            console.log(err)
            console.log("error caused")
            res.status(500).send('error')
        }
    })
});
app.get('/read-data', function (req, res) {
    appointments.find({}, function (err, db) {
        if (!err) {
            if (db != null) {
                console.log("Appointments Found")
                console.log(db)
                res.send(db)
            }
            else {
                res.send("No appointments Found")
            }
        }
        else {

 
            console.log("Error Somewhere")
            console.log(err)
        }
    })
});
app.put('/update-data/:id', function (req, res) {
    var doctor = req.body.doctor
    var time = req.body.time
    var obj1 = { doctor: doctor, time: time }
    appointments.create(obj1, function (err, db) {
        if (!err) {
            appointments.create(obj1, function (err, db) {
                if (!err) {
                }
                else {
                    console.log("error caused")
                    res.status(500).send('error')
                }
            })
            console.log("new appointment added")
            res.status(200).send()
        }
        else {
            console.log("error caused")
            res.status(500).send('error')
        }
    })
});
app.post('/delete-data', function (req, res) {
    appointments.findOne({ doctor:req.body.doctor,time:req.body.time }, function (err, db) {
                if (!err) {
                    console.log("NO ERROR")
                    if (db == null) {
                        res.send({ message: "Already no appointment at this time"})
                    }
                    else {
                        appointments.deleteOne({ doctor:req.body.doctor,time:req.body.time }, function (err, db) {
                            if (!err) {
                                console.log("delete successfuL")
                                res.send({ message: "delete successful"})
                            }
                            else {
                                res.send({ message: "delete unsuccessful"})
                                console.log(" unsucessful ")
                                console.log(err)
                            }
                        })
                    }
                } else {
                    console.log(err)
                }
            })
});

app.get('/doctorsdashboard',function(req,res){
    appointments.find({user_id:req.body.user_id,active:true}, function (err, db) {
        if (!err) {
            if (db != null) {
                console.log("Appointments Found")
                res.send(db)
            }
            else {
                res.send("No appointments Found")
            }
        }
        else {

            console.log("Error Somewhere")
            console.log(err)
        }
    })

})
app.put('/activate',function(req,res){
    signup.findOne({ user_id: req.body.user_id},
         function (err, db) {
            if (!err) {
                console.log(db)
              if(db.activeaccount==true){
                  res.send("Already Activated Account")
              }  
              else{
                signup.updateOne({user_id: req.body.user_id},{activeaccount:req.body.activeaccount},
                    function(err,db){
                        if(err){
                            console.log(err+'error')
                        }
                        else{
                        res.send("Activated Account Successfully")
                        }
                    })
                  
              }
            }
        })
})
app.put('/deactivate',function(req,res){
    signup.findOne({ user_id: req.body.user_id},
        function (err, db) {
           if (!err) {
               console.log(db)
             if(db.activeaccount==false){
                 res.send("Already Dectivated Account")
             }  
             else{
                signup.updateOne({user_id: req.body.user_id},{activeaccount:req.body.activeaccount},
                    function(err,db){
                        if(err){
                            console.log(err+'error')
                        }
                        else{
                        res.send("DeActivated Account Successfully")
                        }
                    })
             }
           }
       })
    
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:3000`)
})