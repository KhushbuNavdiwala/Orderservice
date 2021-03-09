
const Order = require('../../../models/createorder')
function orderController(){


    return {

        index(req, res){

            order.find({status : { $ne : 'completed'}}, null,{sort:{'createdAt' : -1}}).
            popolate('phone','address').exec((err,result) => {

                if(req.xhr){

                    return res.json(result)
                }
                else{

                    res.render('admin/orders')
                }

                       
            })

        }
    }

}

module.exports = orderController