const express = require('express');
const router = express.Router();
//const passport = require('../lib/passport');
const passport = require('passport');
const {isLoggedIn} = require('../lib/validauth');
router.get('/signup', (req,res) =>{
    res.render('auth/signup');
});

router.post('/signup',
    //console.log(req.body);
    passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failtureFlash: true

        }
    )
    //res.send('ingresado');
);

router.get('/signin',(req, res)=>{
    res.render('auth/signin');
});

router.post('/signin',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile',isLoggedIn,(req,res)=>{
    //res.send('este es tu perfil');
    res.render('profile'); //renderizo
});
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;