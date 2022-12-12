userDetails={
    1000:{acno:1000, username:"Amal",password:123,balance:0,transaction:[]},
    1001:{acno:1001, username:"Anu",password:123,balance:0,transaction:[]},
    1002:{acno:1002, username:"Arun",password:123,balance:0,transaction:[]},
    1003:{acno:1003, username:"Mega",password:123,balance:0,transaction:[]},
  }

  register=(acno,username,password)=>{
    if(acno in userDetails){
      return {
        status: 'false',
        statusCode: '400',
        message: 'User already registered'
      }
    }
    else{
      userDetails[acno]={acno,username,password,balance:0,transaction:[]}
      return {
        status: 'true',
        statusCode: '200',
        message: 'Register Success'
      }
    }
  }

  login=(acno,psw)=>{


    if(acno in userDetails){
      if(psw==userDetails[acno]['password']){
        currectuser=userDetails[acno]['username']
        currentacno=acno
        return {
          status: 'true',
          statusCode: '200',
          message: 'Login Success'
        }
      }
      else{
        // alert('Incorrect Password')
        return {
          status: 'false',
          statusCode: '400',
          message: 'Password Incorrect'
        }
      }
    }
    else{
      // alert('User not registered')
      return {
        status: 'false',
        statusCode: '400',
        message: 'Invalid User details'
      }
    }
    // alert("login clicked")
  }

  deposit=(acno,psw,amnt)=>{
    var amount=parseInt(amnt)   // to convert amount data type from string to int
    if(acno in userDetails){
      if(psw==userDetails[acno]['password']){
        userDetails[acno]['balance']+=amount

        //add deposit details in transaction array
        userDetails[acno]['transaction'].push({type:'Credit',amount})

        return {
          status: 'true',
          statusCode: '200',
          message: `${amount} is credited and balance is ${userDetails[acno]['balance']}`
        }

        // return userDetails[acno]['balance']
      }
      else{
        // alert('Incorrect Password')
        return {
          status: 'false',
          statusCode: '400',
          message: 'Password Incorrect'
        }
      }
    }
    else{
      // alert('Incorrect Username')
      return {
        status: 'false',
        statusCode: '400',
        message: 'Invalid User details'
      }
    }
  }

  withdraw=(acno1,psw1,amnt1)=>{
    var amount=parseInt(amnt1)
    if(acno1 in userDetails){
      if(psw1==userDetails[acno1]['password']){
        if(amount<=userDetails[acno1]['balance']){
          userDetails[acno1]['balance']-=amount

          userDetails[acno1]['transaction'].push({type:'Debit',amount})

          return {
            status: 'true',
            statusCode: '200',
            message: `${amount} is debited and balance is ${userDetails[acno1]['balance']}`
          }

          // return userDetails[acno1]['balance']
        }
        else{
          // alert('Insufficient Balance')
          return {
            status: 'false',
            statusCode: '400',
            message: 'Insufficient Balance'
          }
  
        }
      }
      else{
        // alert('Incorrect Password')
        return {
          status: 'false',
          statusCode: '400',
          message: 'Password Incorrect'
        }
      }
    }
    else{
      // alert('Incorrect Username')
      return {
        status: 'false',
        statusCode: '400',
        message: 'Invalid User details'
      }
    }
  }


  // exporting from here
  module.exports={
    register,
    login,
    deposit,
    withdraw
  }
