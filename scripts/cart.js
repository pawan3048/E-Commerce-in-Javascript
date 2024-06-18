var cartData = JSON.parse(localStorage.getItem("cartData")) || [];

if (cartData.length > 0) {
  document.querySelector("#cartCount").innerText = cartData.length;
}
var cartProductsContainer = document.querySelector("#cartProducts");

function showCartData(data) {
  data.forEach((ele) => {
    var cartProMainDiv = document.createElement("div");
    cartProMainDiv.setAttribute("class", "cartProDiv");
    var cartProImg = document.createElement("img");
    cartProImg.setAttribute("src", ele.image);
    var cartProTitle = document.createElement("h3");
    cartProTitle.innerText = ele.title;

    var cartProCountDiv = document.createElement("div");
    cartProCountDiv.setAttribute("class", "cartProCountDiv");

    var cartProInc = document.createElement("button");
    cartProInc.innerText = "+";
    // cartProInc.setAttribute("class","cartProInc")
    cartProInc.addEventListener("click", function () {
      let product = cartData.find((item) => {
        if (item.id) {
          localStorage.setItem("count", JSON.stringify(cartData.count++));
        } else {
          console.log("Product not found in the cart");
        }
      });
    });
    var cartProCount = document.createElement("p");
    cartProCount.innerText = ele.count;
    var cartProDec = document.createElement("button");
    cartProDec.innerText = "-";

    cartProCountDiv.append(cartProInc, cartProCount, cartProDec);
    var cartProPrice = document.createElement("p");
    cartProPrice.innerText = ele.price;

    var cartProRemove = document.createElement("button");
    cartProRemove.setAttribute("id", "cartRemoveItem");
    cartProRemove.innerText = "Remove Item";
    cartProRemove.addEventListener("click", function(){
      if(ele.id){
        localStorage.removeItem("cartData")
        console.log(localStorage.key("users"))
      }
    })
    // var cartTotalPrice = document.createElement("h2");
    cartProMainDiv.append(
      cartProImg,
      cartProTitle,
      cartProCountDiv,
      cartProPrice,
      cartProRemove
    );
    cartProductsContainer.append(cartProMainDiv);
  });
}

showCartData(cartData);
