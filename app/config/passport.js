const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt =require('bcrypt')

function init (passport){

        passport.use(new LocalStrategy({usernameField : 'email'}, async (email, password, done) => {

                //login and check user exits or not 
               const user= await User.findOne({email: email})
                if(!user){

                    return done(null, false, {message : ' No user found'})
                }

                bcrypt.compare(password,user.password).then(match => {
                    if(match){

                              return done(null, user, {message : 'Logging successfully'})
                    }
                             return done(null, false, {message : 'Wrong username'})
                }).catch(err =>{

                             return done(null, false, {message : 'Something went wrong'})
                })
               
            
        }))

        passport.serializeUser((user, done) => {

            done(null,user._id)

        })
        passport.deserializeUser((id, done) => {

            User.findById(id, (err,user) => {

                    done(err,user)


            } )
            
        })

//req.user
}

module.exports = init
