const mostPopPorducts = document.querySelector(".most-popular-products");
const jsonFile = "./products.json";
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve existing cart from localStorage

// Fetch the products from JSON file
fetch(jsonFile)
  .then((response) => response.json())
  .then((data) => {
    if (data.Skincare) {
      const allProducts = [...data.Skincare];
      allProducts.forEach((product) => {
        const { id, image, price, prv_price, description } = product;

        mostPopPorducts.innerHTML += `
  <div class="container" data-product-id="${id}">
    <div class="shop-by-catg-items">
      <div class="cards">
        <img class="card-image" src="${image}" alt="${description}" />
        <p class="title">
          <span class="product-details">${description}</span>
          <span style="font-weight: 600; color: rgb(55, 55, 55)">
            ₹${price}
            <span style="text-decoration: line-through; color: rgb(89, 89, 89)">
              ₹${prv_price}
            </span>
          </span>
          <button class="add-to-cart" data-id="${id}" data-name="${description}" data-price="${price}">
            Add to Cart
          </button>
        </p>
      </div>
    </div>
  </div>`;
      });

      // Attach event listeners to "Add to Cart" buttons
      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent card click event
          const productId = e.target.getAttribute("data-id");
          const productName = e.target.getAttribute("data-name");
          const productPrice = e.target.getAttribute("data-price");
          addToCart(productId, productName, productPrice);
        });
      });
      // Add event listener to product cards to redirect to item.html with product ID
      document.querySelectorAll(".cards").forEach((card) => {
        card.addEventListener("click", (e) => {
          const productId = card
            .closest(".container")
            .getAttribute("data-product-id");
          // Redirect to item.html with the product ID in the URL
          window.location.href = `item.html?id=${productId}`;
        });
      });
    } else {
      console.log("Error: No products found");
    }
  })
  .catch((error) => {
    console.error("Error fetching the products:", error);
  });

// Function to add item to the cart
function addToCart(id, name, price) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Item added to cart");
}

// Function to get cart from local storage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

let products = null;
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data.Skincare; // Update to use the correct category (Skincare)
    showDetail();
  });

 
