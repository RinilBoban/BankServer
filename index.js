// Server Creation

// 1. import express
const express = require('express')

// import dataservices
const dataservices = require('./services/data.service')

// import cors
const cors = require('cors')

// import jwt
const jwt = require('jsonwebtoken')

// 2. create an application using th express
const app = express()

// give command to share data via cors
app.use(cors({
    origin:['http://localhost:4200','http://192.168.42.205:8080','http://127.0.0.1:8080']
}))

// To parse JSON from request body
app.use(express.json())

//3. create a port number
app.listen(3000,() => {
    console.log('listening on port 3000');
})

// Application specific middleware
const appMiddleware = (req,res,next) => {
    console.log('Application specific middleware');
    next();
}

app.use(appMiddleware)

// Router specific middleware
const jwtMiddleware = (req,res,next)=>{
    try{
    console.log('Router specific middleware');
    const token = req.headers['x-access-token'];
    const data = jwt.verify(token,'superkey2022')
    console.log(data);
    next();
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'Please login first'
        })
    }
}

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
    dataservices.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
    // const result = dataservices.register(req.body.acno,req.body.username,req.body.password)
    // res.status(result.statusCode).json(result);
    // if(result){
    // res.send('Register Success')
    // }
    // else{
    //     res.send('User already registered')
    // }
})

// login request
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataservices.login(req.body.acno,req.body.password)
    .then(result=>{
    res.status(result.statusCode).json(result);
    })
})

// deposit request
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})

// withdraw request
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})

// transaction requst
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})


// delete request
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataservices.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})
