// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total_price = 0;

// Template and container
const cartItemTemplate = document.querySelector(".cart-content");
const cartContainer = cartItemTemplate.parentElement;

// Remove the template from DOM so we can clone it
cartItemTemplate.remove();

// Function to render cart
function renderCart() {
  // Clear container first
  cartContainer.innerHTML = "";

  total_price = 0;

  if (cart.length === 0) {
    const emptyMessage = document.createElement("h2");
    emptyMessage.textContent = "Your cart is empty.";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.marginTop = "50px";
    cartContainer.appendChild(emptyMessage);
    document.getElementById("amount").innerText = total_price.toFixed(2);
    return;
  }

  cart.forEach((item, index) => {
    // Add a unique ID if not already present
    if (!item.id) item.id = Date.now() + Math.random();

    const newCartItem = cartItemTemplate.cloneNode(true);

    // Populate details
    newCartItem.querySelector("#product-image").src = item.image_link;
    newCartItem.querySelector("#image-name").textContent = item.item_name;
    newCartItem.querySelector("#material-type").textContent =
      item.item_material.charAt(0).toUpperCase() + item.item_material.slice(1);
    newCartItem.querySelector("#size-type").textContent = item.item_size;
    newCartItem.querySelector("#product-price").textContent = item.price;

    const numericPrice = parseFloat(item.price.replace("$", "").trim());
    total_price += numericPrice;

    // Remove button
    const removeButton = newCartItem.querySelector(".remove-cart");
    removeButton.addEventListener("click", () => {
      removeItemFromCart(item.id);
    });

    cartContainer.appendChild(newCartItem);
  });

  document.getElementById("amount").innerText = total_price.toFixed(2);
}

// Remove item by unique ID
function removeItemFromCart(itemId) {
  // Find the index of the item dynamically
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) return;

  // Remove from array
  cart.splice(itemIndex, 1);

  // Update localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Re-render cart
  renderCart();
}

// Select checkout button
const checkoutButton = document.querySelector(".chechout");

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items before checking out.");
    return;
  }

  // Redirect to checkout page
  window.location.href = "checkout.html"; // adjust path if needed
});

// Initial render
renderCart();
