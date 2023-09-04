let forgotEmail = document.getElementById("forgotEmail");
let emailForgotButton = document.getElementById("forgotEmailButton");

emailForgotButton.addEventListener("click", async(e)=>{
    try{
        e.preventDefault();
        let EmailForgot={
            email: forgotEmail.value
        } 

        const forgotPassword = await axios.post("http://localhost:3000/forgotpassword", EmailForgot);

        if(forgotPassword.data.success === true){
            alert("Successfully sent Mail. Please open your Email");
            window.location.href='login.html';
        }else{
            alert("Please try Again!!");
        }

    }catch(err){
        console.log(err);
    }
})