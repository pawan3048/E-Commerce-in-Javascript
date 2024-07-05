var cartData = JSON.parse(localStorage.getItem("cartData")) || [];
var loginUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

if (cartData.length > 0) {
  document.querySelector("#cartCount").innerText = cartData.length;
}
var cartProductsContainer = document.querySelector("#cartProducts");

if (loginUser && loginUser.name) {
  var loginUserEle = document.querySelector("#loginPerson");
  var userNameText = document.createTextNode(loginUser.name + " ");
  loginUserEle.insertBefore(
    userNameText,
    loginUserEle.querySelector("#profile-menu")
  );
}

function showCartData(data) {
  cartProductsContainer.innerText= ""
  
 if(data.length>0){
  data.forEach((ele, ind) => {
    var cartProDiv = document.createElement("div");
    cartProDiv.setAttribute("class", "cartProDiv");
    var cartProImg = document.createElement("img");
    cartProImg.setAttribute("src", ele.image);
    var cartProTitle = document.createElement("h3");
    cartProTitle.innerText = ele.title;

    var cartProCountDiv = document.createElement("div");
    cartProCountDiv.setAttribute("class", "cartProCountDiv");

    var cartProInc = document.createElement("button");
    cartProInc.innerText = "+";
    cartProInc.addEventListener("click", () => {
      cartItemCount("+", ind);
    });

    var cartProCount = document.createElement("p");
    cartProCount.innerText = ele.count;
    var cartProDec = document.createElement("button");
    cartProDec.innerText = "-";
    cartProDec.addEventListener("click", () => {
      cartItemCount("-", ind);
    });

    cartProCountDiv.append(cartProInc, cartProCount, cartProDec);
    var cartProPrice = document.createElement("p");
    cartProPrice.innerText = `$${(ele.price * ele.count).toFixed(2)}`;

    var cartProRemove = document.createElement("button");
    cartProRemove.setAttribute("class", "cartRemoveItem");
    cartProRemove.innerText = "Remove Item";
    cartProRemove.addEventListener("click",()=>{
      dltCartItem(ind)
    })

    cartProDiv.append(
      cartProImg,
      cartProTitle,
      cartProCountDiv,
      cartProPrice,
      cartProRemove
    );
    cartProductsContainer.append(cartProDiv);
  });
 }else{
  cartProductsContainer.innerHTML = "<h3>Empty Cart</h3>"
 }
}

showCartData(cartData);

var totalPriceDiv = document.querySelector("#cart-total");

function cartTotal() {
  var totalSum = cartData
    .reduce((initialVal, ele) => {
      console.log(ele.count)
      return ele.price * ele.count + initialVal;
    }, 0)
    .toFixed(2);

  totalPriceDiv.innerText = `$${totalSum}`;
}
cartTotal();

function cartItemCount(sign, index) {
  if (sign === "+") {
    if(cartData[index].count >= 10){
      return
    }
    cartData[index].count++;
  } else {
    if(cartData[index].count === 1){
      return
    }
    cartData[index].count--;
  }
  localStorage.setItem("cartData",JSON.stringify(cartData))
  showCartData(cartData);
  cartTotal()

}

function dltCartItem(index){
  cartData.splice(index, 1)
  localStorage.setItem("cartData",JSON.stringify(cartData))
  showCartData(cartData);
  cartTotal()
}
