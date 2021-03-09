const Order = require('../../models/order')

function homeController(){

    return{

       async index(req, res){


            const orders = await Order.find()
           // console.log(orders)
            return res.render('home.ejs',{orders : orders})

            // Order.find().then(function(orders) {
                
            //     console.log(orders)

            //    return res.render('home.ejs',{orders : orders})
            // })

           
        }

    }
}


module.exports = homeController