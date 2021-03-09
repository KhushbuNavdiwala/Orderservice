const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customer/cartController")
const homeController = require("../app/http/controllers/homeController")
const orderController = require("../app/http/controllers/customer/orderController")

//const AdminOrderController = require("../app/http/controllers/admin/orderController")
// require("../app/http/controllers/homeController")
// require("../app/http/controllers/authController")
// require("../app/http/controllers/customer/cartController")


function initRoutes (app,bodyParser){

            app.get('/', homeController().index)

            app.get('/cart', cartController().cart)
            app.post('/update-cart', cartController().update)

            app.get('/registration', authController().register)
            app.post('/registration', authController().postregi)
            app.get('/login', authController().login)
            app.post('/login', authController().postlogin)

            //Customers routes
            app.post('/orders', orderController().store)
           app.get('/customers/orders', orderController().index)
           app.get('/customers/orders/:id', orderController().show)


           //admin routes
           //app.get('/admin/orders', AdminOrderController().index)



               
    
    
}


module.exports = initRoutes