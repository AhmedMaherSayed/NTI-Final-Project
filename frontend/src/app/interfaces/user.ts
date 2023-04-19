export interface User {
    name:string,
    age:string,
    email:string,
    password:string,
    addresses:[
      {
        addType:string,
        mobile:string
      }
    ]
  }
  