console.log("Welcome");
// console.log("Register");
// console.log("Login");
// console.log("Thank U");

const Register=(login)=>{
    setTimeout(()=>{console.log("Register");
        login(); },5000)
};

const Login=(thank)=>{
    setTimeout(()=>{ console.log("Login");
thank();  },4000)
}
const Thank=()=>{
    setTimeout(()=>{console.log("Thank U");},2000)
}

Register(()=>{
    Login(()=>{
        Thank();
    });
});

