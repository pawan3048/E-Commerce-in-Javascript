var userData = JSON.parse(localStorage.getItem("users")) || [];
var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

function loginLoadFun(){
  if(loggedInUser){
    window.location.href="index.html"
  }
}


document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  var form = document.querySelector("form");

  var loginObj = {
    email: form.email.value,
    password: form.password.value,
  };
  // console.log(loginObj)
  var matchUser = userData.filter((ele, ind) => {
    if (ele.email === loginObj.email && ele.password === loginObj.password) {
      userData[ind].status = true;
      localStorage.setItem("users", JSON.stringify(userData))
      return ele;
    }else if(ele.email !== loginObj.email || ele.password !== loginObj.password){
      userData[ind].status = false;
      localStorage.setItem("users", JSON.stringify(userData))
    }
  });
  if (matchUser.length > 0) {
    var loginUser = {
        name: matchUser[0].name,
        email: matchUser[0].email,
    }

    localStorage.setItem("loggedInUser", JSON.stringify(loginUser))
    alert("User Loggedin Successfully.");
    window.location.href = "index.html";
  }else{
    console.log("Invalid Username and Password")
  }
});
