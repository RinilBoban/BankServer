// import JWT
const jwt = require('jsonwebtoken');

// import db
const db=require('./db')

// database
userDetails={
    1000:{acno:1000, username:"Amal",password:123,balance:0,transaction:[]},
    1001:{acno:1001, username:"Anu",password:123,balance:0,transaction:[]},
    1002:{acno:1002, username:"Arun",password:123,balance:0,transaction:[]},
    1003:{acno:1003, username:"Mega",password:123,balance:0,transaction:[]},
  }

  const register=(acno,username,password)=>{
    // if(acno in userDetails){
      return db.User.findOne({acno})
      .then(user=>{
        if(user){
          return {
            status: 'false',
            statusCode: '400',
            message: 'User already registered'
          }
        }
      // })
      // return {
      //   status: 'false',
      //   statusCode: '400',
      //   message: 'User already registered'
      // }
    // }
    else{
      const newUser=new db.User({
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
      })
      newUser.save();     // save data in MongoDB
    // }
      // userDetails[acno]={acno,username,password,balance:0,transaction:[]}
      return {
        status: 'true',
        statusCode: '200',
        message: 'Register Success'
      }
    }
  })}

  const login=(acno,pswd)=>{
    return db.User.findOne({acno,pswd})   //data
    .then(user=>{
      if(user){
        currentUser=user.username
        currentAcno=acno
        const token = jwt.sign({currentAcno:acno},'superkey2022')
        return {
          status:true,
          statusCode:200,
          message:'Login Successful',
          token:token,
          currentUser:currentUser,
          currentAcno:currentAcno
        }
      }
      else{
        return{
          status:false,
          statusCode:400,
          message:'Invalid userdetails'
        }
      }
    })
  }
    


    // if(acno in userDetails){
    //   if(psw==userDetails[acno]['password']){
    //     currectuser=userDetails[acno]['username']
    //     currentacno=acno
    //     const token = jwt.sign({  // to generate token
    //       currentacno:acno},
    //       'superkey2022'          // it will generate a number and it is assigned to the token
    //     )

    //     return {
    //       status: 'true',
    //       statusCode: '200',
    //       message: 'Login Success',
    //       token:token
    //     }
    //   }
    //   else{
    //     // alert('Incorrect Password')
    //     return {
    //       status: 'false',
    //       statusCode: '400',
    //       message: 'Password Incorrect'
    //     }
    //   }
    // }
    // else{
    //   // alert('User not registered')
    //   return {
    //     status: 'false',
    //     statusCode: '400',
    //     message: 'Invalid User details'
    //   }
    // }
    // alert("login clicked")
  // }
  const deposit=(acno,psw,amnt)=>{
    var amount=parseInt(amnt)   // to convert amount data type from string to int
    return db.User.findOne({acno,psw})
    .then(user=>{
      if(user){
        user.balance += amount;
        user.transaction.push({
          Type:'Credit',
          Amount:amount
        })
        user.save();
          return {
          status: 'true',
          statusCode: '200',
          message: `${amount} is credited and balance is ${user.balance}`
        }
      }
      else{
        return {
        status: 'false',
        statusCode: '400',
        message: 'Invalid User details'
      }
      }
     } )}

    
    
  //   if(acno in userDetails){
  //     if(psw==userDetails[acno]['password']){
  //       userDetails[acno]['balance']+=amount

  //       //add deposit details in transaction array
  //       userDetails[acno]['transaction'].push({type:'Credit',amount})

  //       return {
  //         status: 'true',
  //         statusCode: '200',
  //         message: `${amount} is credited and balance is ${userDetails[acno]['balance']}`
  //       }

  //       // return userDetails[acno]['balance']
  //     }
  //     else{
  //       // alert('Incorrect Password')
  //       return {
  //         status: 'false',
  //         statusCode: '400',
  //         message: 'Password Incorrect'
  //       }
  //     }
  //   }
  //   else{
  //     // alert('Incorrect Username')
  //     return {
  //       status: 'false',
  //       statusCode: '400',
  //       message: 'Invalid User details'
  //     }
  //   }
  // }

  const withdraw=(acno,psw,amnt)=>{
    var amount=parseInt(amnt)
    return db.User.findOne({acno,psw})
    .then(user=>{
      if(user){
        if(user.balance>=amount){
          user.balance-=amount;
          user.transaction.push({type:'Debit',amount})
          user.save()
          return {
            status: 'true',
            statusCode: '200',
            message: `${amount} is debited and balance is ${user.balance}`
          }
        }
      else{
        return {
          status: 'false',
          statusCode: '400',
          message: 'Invalid User details'
        }  
      }
    } 
   })
  }



    // if(acno1 in userDetails){
    //   if(psw1==userDetails[acno1]['password']){
    //     if(amount<=userDetails[acno1]['balance']){
    //       userDetails[acno1]['balance']-=amount

    //       userDetails[acno1]['transaction'].push({type:'Debit',amount})

    //       return {
    //         status: 'true',
    //         statusCode: '200',
    //         message: `${amount} is debited and balance is ${userDetails[acno1]['balance']}`
    //       }

    //       // return userDetails[acno1]['balance']
    //     }
      //   else{
      //     // alert('Insufficient Balance')
      //     return {
      //       status: 'false',
      //       statusCode: '400',
      //       message: 'Insufficient Balance'
      //     }
  
      //   }
      // }
    //   else{
    //     // alert('Incorrect Password')
    //     return {
    //       status: 'false',
    //       statusCode: '400',
    //       message: 'Password Incorrect'
    //     }
    //   }
    // }
  //   else{
  //     // alert('Incorrect Username')
  //     return {
  //       status: 'false',
  //       statusCode: '400',
  //       message: 'Invalid User details'
  //     }
  //   }
  // }

  const getTransaction=(acno)=>{
    return db.User.findOne({acno})
    .then(user=>{
      if(user){
        return  {
          status: 'true',
          statusCode: '200',
          Transaction: user.transaction
      }
    }
    else{
          return {
          status: 'false',
          statusCode: '400',
          message: 'User not found'
        }
    }
  })
}

const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if(user){
      return  {
        status: 'true',
        statusCode: '200',
        message: 'User Deleted Successfully'
    }
    }
    else{
      return {
        status: 'false',
        statusCode: '400',
        message: 'User not found'
      }
    }
  })
}

  // exporting from here
  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }
