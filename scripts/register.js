var userData = JSON.parse(localStorage.getItem("users")) || [];

document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();
    var form = document.querySelector("form");

    var regObj = {
        name: form.uname.value,
        dob: form.dob.value,
        email: form.email.value,
        password: form.password.value,
        status: false,
    }

    userData.push(regObj);
    localStorage.setItem("users",JSON.stringify(userData));
    form.reset();
    alert("User Registered Successfully.")
    window.location.href="login.html"
    
})