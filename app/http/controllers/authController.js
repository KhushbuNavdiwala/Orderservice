const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController()
{
        return{

                    login(req, res){

                        res.render('auth/login.ejs')


                    },
                    postlogin(req, res, next){

                        passport.authenticate('local',(err, user, info)=> {

                            if(err){

                                    req.flash('error',"something wrong")
                                    return next(err)
                            }
                            if(!user) {
                                  
                                 req.flash('error',"no user found")
                                    return res.redirect('/login')
                            }
                            req.logIn(user, (err)=>{

                                if(err) {

                                    req.flash('error',info.message)
                                    return next(err)
                                }
                                return res.redirect('/')
                            })

                        })(req, res, next)




                    },

                    register(req, res){

                        res.render('auth/registration.ejs')
                    },
                             async   postregi(req, res){
                                
                                    const {username, email, password, password_confirm } = req.body
                                    console.log(req.body)
                         
                          
                            //validate req

                                     if(!username || !email || !password || !password_confirm)   {
                                              req.flash('err','All info required')
                                            return res.redirect('/registration')

                                         }
                            //check user email
                                          User.exists({email : email} , (err,result) => {
                                       
                                        if(result) {
                                                 req.flash('error','Email already used')
                                                 req.flash('username',username)
                                                 req.flash('email',email)
                                                 return res.redirect('/registration')

                                        }

                            })

                            //hash pass
                            const hashedPassword = await bcrypt.hash(password,10)

                                    //create user

                                    const user = new User({

                                        name : username,
                                        email : email,
                                        password : hashedPassword,
                                        password_confirm : password_confirm



                                    })
                                    console.dir(user)                              
                                      user.save().then((user) =>{
                                        //userstore  
                                       
                                        
                                        return res.redirect('/')
                                    }).catch(err => {

                                        req.flash('error','something went wrong ')
                               
                                        return res.redirect('/registration')


                                    })

                    }


        }



}

module.exports = authController