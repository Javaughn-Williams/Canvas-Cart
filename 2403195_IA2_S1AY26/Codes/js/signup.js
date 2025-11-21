const form = document.querySelector(".sign-in-form");
let errorEl = document.querySelector("#login-error");

document.getElementById("sign-up-button").addEventListener("click", () => {
  const name_field = document.getElementById("fullname");
  const email_field = document.getElementById("email");
  const password_field = document.getElementById("password");
  const confirm_password_field = document.getElementById("confirm-password");

  let name = name_field.value.trim();
  let email = email_field.value.trim();
  let password = password_field.value;
  let confirmPassword = confirm_password_field.value;

  clearError();

  if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    showError("An account with this email already exists.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign up successful! You can now log in.");
  window.location.href = "index.html";
});

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

function clearError() {
  if (errorEl) errorEl.textContent = "";
}
