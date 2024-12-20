let cart = JSON.parse(localStorage.getItem("cart")) || []; 

// Function to render cart items
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>No items in the cart</p>";
    document.getElementById("total").innerText = `Total: ₹0`;
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
      <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    cartItems.appendChild(cartItem);
  });

  // Convert price to numeric value by removing any non-numeric characters
  const total = cart.reduce((sum, item) => {
    const cleanPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Extracts only the numeric part
    return sum + cleanPrice * item.quantity;
  }, 0);

  document.getElementById("total").innerText = `Total: ₹${total.toFixed(2)}`; // Format total to 2 decimal places
}

// Function to remove item from cart
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Checkout (you can add functionality later)
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty");
    document.getElementById("total").innerText = `Total: ₹0`;
  } else {
    alert("Proceeding to checkout...");
    // Implement checkout functionality
  }
});
  document.getElementById('empty-cart').addEventListener('click', function() {
    localStorage.removeItem('cart'); // Remove the cart from localStorage
    alert('Your cart has been emptied!'); // Notify the user
    location.reload(); // Reload the page to update the cart display
  });


// Render cart on page load
renderCart();
