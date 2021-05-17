const mongoose= require("mongoose");
const registerSchema= new mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    confirmpassword:{
        type:String,
        required:true

    }
})
// create a collection
const Register =new mongoose.model("Register",registerSchema);
 
module.exports =Register;