let email = document.getElementById('email');
let password = document.getElementById('password');
let button = document.getElementById('press');

//user login 
button.addEventListener("click", async(e)=>{
    try{
        e.preventDefault();
    obj={
        email:email.value,
        password:password.value
    }
    //console.log(obj);
    const userLogin = await axios.post("http://localhost:3000/user-login",obj)
        
        if(userLogin.data.success===true){

            //localStorage.setItem('isPremium', userLogin.data.isPremium)
            localStorage.setItem('token', userLogin.data.token);
            
            console.log("User data is available in DB");
            alert("User Logged In");
            window.location.href="./index.html";
            
        }else{
            console.log("User Not existing");
            alert("Please Sign Up");
        }
    }catch(err){
        console.log(err);
    }
    
   
})
//forgot password
let forgotButton = document.getElementById("forgot");
            forgotButton.addEventListener("click", async(e)=>{
                try{
                    window.location.href="forgot-password.html";
                }catch(err){
                    console.log(err);
                }
            })