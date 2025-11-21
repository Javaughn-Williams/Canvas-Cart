let subtotal = 0;
let shipping = 5.0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.forEach((item) => {
  const numericPrice = parseFloat(item.price.replace("$", "").trim());
  subtotal += numericPrice;
  shipping += 1.0;
});

document.getElementById("summary-subtotal").innerText = subtotal.toFixed(2);
document.getElementById("summary-shipping").innerText = shipping.toFixed(2);
document.getElementById("summary-total").innerText = (
  subtotal + shipping
).toFixed(2);

// Handle form submission
const form = document.querySelector(".checkout-form");
form.addEventListener("submit", (e) => {
  if (!JSON.parse(localStorage.getItem("currentUser"))) {
    e.preventDefault();
    alert("Please log in to place an order.");
    window.location.href = "login.html";
    return;
  }
  e.preventDefault();

  // Clear cart
  localStorage.removeItem("cart");

  alert("Order placed successfully!");
  window.location.href = "index.html";
});
