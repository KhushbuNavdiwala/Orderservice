const mongoose = require('mongoose')
const Schema = mongoose.Schema

const createorderSchema = new Schema({            //schema

       
//        customerId : {
//                type: mongoose.Schema.Types.ObjectId,
//                ref : 'User',
//                required : true


//        },
      items : {type : Object, required:true },
       phone: {type : String, required:true },
       address: {type : String, required:true },
       paymentType: {type : String, default : 'COD' },
       status : {type : String, default : 'Order placed' },



},{timestamps : true})


module.exports = mongoose.model('Createorder',createorderSchema)//model //two parameter will be pass 