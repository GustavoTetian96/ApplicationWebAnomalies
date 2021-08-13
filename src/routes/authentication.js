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

module.exports = router;