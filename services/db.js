// Server-MongoDB Integration

// 1. Import Mongoose
const mongoose= require('mongoose');

// 2. state connetion string via mongoose
// mongodb://localhost:27017

mongoose.connect('mongodb://0.0.0.0:27017/BankServer',
{
    useNewUrlParser:true    // to avoid unwanted warnings
});

// Define bank db model

const User = mongoose.model('User',             // User is the name
{
    // schema creation                          like heading
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]                                // array
});

//export collection

module.exports={
    User
}