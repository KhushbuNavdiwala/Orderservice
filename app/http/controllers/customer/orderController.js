const Createorder = require('../../../models/createorder')
const moment = require('moment')

function orderController(){

        return {

             store(req, res){

                console.log(req.body)
                const {phone,address} = req.body
                        console.log(req.body)
                        if(!phone || !address){
                            req.flash('error','ALL fields are required')
                            return res.redirect('/cart')
                        }
                        
                        const createorder = new Createorder({


                           // customerId: req.session.user.id,
                            items :  req.session.cart.items,
                            phone,
                            address
                            

                        })
                            createorder.save().then(result => {

                                req.flash('success','Order placed successfully')
                                delete req.session.cart
                                return res.redirect('/customers/orders')

                            }).catch(err => {

                                req.flash('error','Something wend wrong')
                                return res.redirect('/cart')
                            })
                        },
                   async index(req, res)  {

                                Createorder.find({},function(err, result){

                                    if(err)
                                    {
                                        res.send(err)
                                    }
                                    else{

                                      
                                        res.render('customers/orders',{result, moment})
                                    }
                                 
                                })

                   },
                   //for traking order
                   async show(req, res){

                    const createorder  = await Createorder.findById(req.params.id)
                    //authorisied user condition here 

                    res.render('customers/singleorder' , {createorder})


              }

               
          }


}
module.exports = orderController