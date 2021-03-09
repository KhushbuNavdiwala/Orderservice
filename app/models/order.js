const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({            //schema

        name:{type: String, required: true},
        image:{type: String, required: true},
        price:{type: Number, required: true},
        size:{type: String, required: true}



})


module.exports = mongoose.model('order',orderSchema)//model //two parameter will be pass 