const express = require('express');
const router = express.Router();
//const passport = require('../lib/passport');
const passport = require('passport');
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

router.get('/profile',(req,res)=>{
    res.send('este es tu perfil');
});

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
module.exports = router;