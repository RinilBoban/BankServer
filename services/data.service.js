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
        message: 'User already registered'
      }
    }
    else{
      userDetails[acno]={acno,username,password,balance:0,transaction:[]}
      return {
        status: 'true',
        message: 'Register Success'
      }
    }
  }

  // exporting from here
  module.exports={
    register
  }
