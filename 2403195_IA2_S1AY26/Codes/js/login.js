// Select the form and the error container
const form = document.querySelector(".sign-in-form");
let errorEl = document.querySelector("#login-error");

// Listen for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload
  clearError();

  const email_field = document.getElementById("email");
  const password_field = document.getElementById("password");

  const email = email_field.value.trim();
  const password = password_field.value;

  // Check for empty fields
  if (!email || !password) {
    showError("Please enter both email and password.");
    return;
  }

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find matching user
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    showError("No account found with this email.");
    return;
  }

  if (user.password !== password) {
    showError("Incorrect password.");
    return;
  }

  // Successful login: save current user without password
  const safeUser = { ...user };
  delete safeUser.password;

  localStorage.setItem("currentUser", JSON.stringify(safeUser));

  // Redirect to homepage
  alert("Login successful!");
  window.location.href = "index.html";
});

// Function to show error messages
function showError(msg) {
  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.id = "login-error";
    errorEl.style.color = "red";
    errorEl.style.marginTop = "8px";
    form.appendChild(errorEl);
  }
  errorEl.textContent = msg;
}

// Function to clear previous errors
function clearError() {
  if (errorEl) errorEl.textContent = "";
}
