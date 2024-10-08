document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Estää lomakkeen oletustoiminnan

    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    // Tallenna uusi käyttäjä localStorageen
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name: newUsername, password: newPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Rekisteröinti onnistui! Voit nyt kirjautua sisään.");
  });

// Handle form submission
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  // Store user data (in localStorage for now)
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  alert("Rekisteröinti onnistui! Voit nyt kirjautua sisään.");
  window.location.href = "profiili.html"; // Redirect to login page
});
