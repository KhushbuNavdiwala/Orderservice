const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({            //schema

        name:{type: String, required: true},
        email:{type: String, required: true, unique: true},
        password:{type: String, required: true},
        password_confirm:{type:String, required: true},
        role:{type:String, required: true ,  default: 'customer'}



},{timestamp : true})


module.exports = mongoose.model('User',userSchema)//model //two parameter will be pass 