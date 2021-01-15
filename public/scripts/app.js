

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]

      button.addEventListener('click', addToCartClicked)
  }

  // document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target

  console.log(button.getAttribute('menu-item'))
  const itemId = button.getAttribute('menu-item')
  var shopItem = button.parentElement.parentElement


  const index = [].slice.call(shopItem.getElementsByClassName('shop-item-button')).map(i => i.getAttribute('menu-item')).indexOf(itemId)
  var title = shopItem.getElementsByClassName('shop-item-title')[index].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[index].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[index].src
  addItemToCart(title, price, imageSrc, itemId)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc, itemId) {
  console.log(title)
  console.log(price)
  console.log(imageSrc)
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i] === title) {
          alert('This item is already added to the cart')
          return
      }
  }

  var itemWrapper = document.createElement("div")
  var titleSpan = document.createElement("span")
  var titleText = document.createTextNode(title)
  var priceSpan = document.createElement("span")
  priceSpan.classList.add('cart-price')
  var priceText = document.createTextNode(price)
  var quantityInput = document.createElement("input")
  quantityInput.setAttribute("type", "number")
  quantityInput.setAttribute("name", itemId)
  quantityInput.setAttribute("value", "1")
  quantityInput.classList.add('cart-quantity-input')
  var totalPrice = document.createElement("span")
  totalPrice.classList.add('cart-total-price')
  priceSpan.appendChild(priceText)
  titleSpan.appendChild(titleText)
  var removeButton = document.createElement("button")
  var buttonName = document.createTextNode('REMOVE')
  removeButton.appendChild(buttonName)
  removeButton.setAttribute("name", "REMOVE")
  removeButton.setAttribute("value", "REMOVE")
  removeButton.classList.add('btn-danger')
  itemWrapper.appendChild(titleSpan)
  itemWrapper.appendChild(priceSpan)
  itemWrapper.appendChild(quantityInput)
  // itemWrapper.appendChild(totalPrice)
  itemWrapper.appendChild(removeButton)
  document.getElementsByClassName('cart-items')[0].appendChild(itemWrapper);
  cart-total.appendChild(totalPrice)
  itemWrapper.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  itemWrapper.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
  // <span class="cart-total-price">$39.97</span>


  // var cartRowContents = `
  //     <div class="cart-item cart-column">
  //         <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
  //         <span class="cart-item-title">${title}</span>
  //     </div>
  //     <span class="cart-price cart-column">${price}</span>
  //     <div class="cart-quantity cart-column">
  //         <input class="cart-quantity-input" type="number" value="1">
  //         <button class="btn btn-danger" type="button">REMOVE</button>
  //     </div>`
// console.log(cartRowContents)
// console.log(cartItems)

  // cartRow.innerHTML = cartRowContents
  // cartItems.append(cartRowContents)
  // cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  // cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}























// // Step 1: Implement Remove Cart Items (3:42)
// // remove-item
// const removeItemFromCart = document.getElementsByClassName('remove-item')
// for (let i = 0; i < removeCartItemButtons.length; i++) {
//   const button = removeCartItemButtons[i]
//   button.addEventListener('click', function(event) {
//     const buttonClicked = event.target
//     buttonClicked.parentElement.parentElement.remove()
//     // updateCartTotal()
//   })
// };








// // Step 2: Update the total of the cart (8:38)
// const updateCartTotal = function () {
//   const cartItemContainer = document.getElementsByClassName('cart-item')[0];
//   const cartRows = cartItemContainer.getElementsByClassName('cart-row');
//   for (let i = 0; i < cartRows.length; i++) {
//     let cartRow = cartRows[i];
//     let priceElement = cartRow.get
//   }
// };

// // Step 3: Update cart total when quantity is changed (19:00)

// // Step 4: Add to cart buttons (24:11)

// // Step 5: Purchase button (clears cart) (38:15)




// Step 6: Twilio? Checkout section?
