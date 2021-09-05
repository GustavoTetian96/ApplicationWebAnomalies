const express = require('express');
const morgan = require('morgan');
const path= require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');

const passport = require('passport');

const { database } = require('./keys');

//inicialization
const app = express();
require('./lib/passport');
//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine','.hbs');

//middlewares
app.use(session({
  secret: 'castillomysqlnodesession',
  resave: false,
  saveUninitialized: false,
  store: new mysqlstore(database)
}));

app.use(flash());

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));
 
//globaal variables
app.use((req,res,next)=>{
   app.locals.success =req.flash('success');
   app.locals.user = req.user;
   next();
});

//public
app.use(express.static(path.join(__dirname, 'public')));
//starting the server
app.listen(app.get('port'), () =>{
    console.log('server on port ', app.get('port'));
});
