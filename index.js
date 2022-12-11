// Server Creation

// 1. import express
const express = require('express')

// import dataservices
const dataservices = require('./services/data.service')

// 2. create an application using th express
const app = express()

// To parse JSON from request body
app.use(express.json())

//3. create a port number
app.listen(3000,() => {
    console.log('listening on port 3000');
})

// 4. Resolving HTTP request
//    get,post,put,patch,delete

//    Resolving get request
// app.get('/',(req,res) => {
//     res.send('Get request')
// })

// //    Resolving post request
// app.post('/',(req,res) => {
//     res.send('Post request')
// })

// //    Resolving put request
// app.put('/',(req,res) => {
//     res.send('Put request')
// })

// //    Resolving patch request
// app.patch('/',(req,res) => {
//     res.send('Patch request')
// })

// //    Resolving delete request
// app.delete('/',(req,res) => {
//     res.send('Delete request')
// })



// API request
//============
// registration request
app.post('/register',(req,res)=>{
    console.log(req.body);
    const result = dataservices.register(req.body.acno,req.body.username,req.body.password)
    res.json(result);
    // if(result){
    // res.send('Register Success')
    // }
    // else{
    //     res.send('User already registered')
    // }
})

// login request
// deposit request
// withdraw request
// delete request