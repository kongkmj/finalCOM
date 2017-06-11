const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Get Register
router.get('/register',function (req,res) {
  res.render('partials/login/register',{
    layout:'loginLayout'
  });
});

// Get Login
router.get('/login',function (req,res) {
  res.render('partials/login/login',{
    layout:'loginLayout'
  });
});

// Get Register
router.post('/register',function (req,res) {
  var name = req.body.name;
  var username = req.body.username;
  var password= req.body.password;
  var password2 = req.body.password2;
  var email = req.body.email;

  // Validation
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('username','id is required').notEmpty();
  req.checkBody('password','password is required').notEmpty();
  req.checkBody('password2','Password do not match').equals(req.body.password);
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();

  var errors = req.validationErrors();

  if(errors){
    res.render('register',{
      layout:'loginLayout',
      errors:errors
    });
  }else{
    var newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password
    });

    User.createUser(newUser,function (err,user) {
      if(err) throw err;
      console.log(user);
    })

    req.flash('success_msg','You are registered and can now login');

    res.redirect('/users/login');
  }
});

passport.use(new LocalStrategy(
  function (username,password,done) {
    User.getUserByUsername(username,function (err,user) {
      if(err) throw err;
      if(!user){
        return done(null,false,{message:'Unkown User'});
      }

      User.comparePassword(password,user.password,function (err,isMatch) {
        if(err) throw err;
        if(isMatch){
          return done(null,user);
        }else{
          return done(null,false,{message:'Invalid password'});
        }
      });
    });
  }));

passport.serializeUser(function (user,done) {
  done(null,user.id);
});

passport.deserializeUser(function (id,done) {
  User.getUserById(id,function (err,user) {
    done(err,user);
  });
});

router.post('/login',
  passport.authenticate('local',{successRedirect:'/dashboard',failureRedirect:'/users/login',failureFlash: true}),
  function (req,res) {
    res.redirect('/dashboard');
  });

router.get('/logout',function (req,res) {
  req.logout();

  req.flash('success_msg','You are logged out');

  res.redirect('/users/login');
})

module.exports = router;
