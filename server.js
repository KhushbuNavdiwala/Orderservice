require ('dotenv').config()
const express = require ('express')
const app = express()
const ejs =require('ejs')
const expressLayout =require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const passport = require('passport')

//
//database connect code
const url= 'mongodb://localhost/Online_shop';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true,
useFindAndModify: true  });

const connection = mongoose.connection;
connection.once('open',() => {

	console.log('Database is connected');

}).catch(err =>{

	console.log('~connection is failed');
});

//passport config

const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


// //session store 
let mongoStore = new MongoDbStore({
                         mongooseConnection : connection,
                         collection: 'sessions'
                    })






// //session config(work as middleware)
app.use(session({

    secret: process.env.COOKIE_SECRET,
    resave: false,
    store : mongoStore,//to store session in your database 
    saveUninitialized: false,
    cookie : {maxAge : 1000 * 60 * 60 *24} //24 hours
   // cookie : {maxAge : 1000 * 15} //24 hours
}))

// //use as middleware 
app.use(flash())



// //assert
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())


//gobal midd ware 
app.use((req, res, next)=> {
    res.locals.session = req.session
    next()
})


// //set templet engine
app.use(expressLayout)
app.set('view engine','ejs')

// //routes
require("./routes/web")(app,bodyParser)





app.listen(PORT , () => {

    console.log("4000 works now")
})

