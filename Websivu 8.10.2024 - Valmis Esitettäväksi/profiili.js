// Tallenna käyttäjätiedot (tämä on yksinkertaisuuden vuoksi, normaalisti käytät palvelinpuolen validoimista)
let userData = {
  username: null,
  password: null,
};

// Lomake-elementit
const loginForm = document.getElementById("loginForm");
const userSection = document.getElementById("user-section");
const userNameSpan = document.getElementById("user-name");
const logoutButton = document.getElementById("logoutButton");

// Tarkista, onko käyttäjä jo kirjautunut sisään
document.addEventListener("DOMContentLoaded", function () {
  const storedUsername = localStorage.getItem("username");

  if (storedUsername) {
    // Jos käyttäjä on kirjautunut sisään, näytä hänen profiilinsa
    userData.username = storedUsername;
    showLoggedInUser(storedUsername);
  }
});

// Käsittele lomakkeen lähetys (käyttäjärekisteröinti/kirjautuminen)
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Jos käyttäjä ei ole rekisteröitynyt, tallenna tiedot
  if (!userData.username || !userData.password) {
    userData.username = username;
    userData.password = password;
    localStorage.setItem("username", username); // Tallenna käyttäjätunnus localStorageen
    alert("Rekisteröinti onnistui! Voit nyt kirjautua sisään.");
  }

  // Tarkista, vastaavatko tiedot
  if (userData.username === username && userData.password === password) {
    // Onnistunut kirjautuminen
    localStorage.setItem("username", username); // Tallenna käyttäjätunnus localStorageen
    showLoggedInUser(username);
  } else {
    alert("Virheellinen käyttäjänimi tai salasana.");
  }
});

// Käsittele uloskirjautuminen
logoutButton.addEventListener("click", function () {
  localStorage.removeItem("username"); // Poista käyttäjätunnus localStoragesta
  loginForm.style.display = "block";
  userSection.style.display = "none";
});

// Näytä kirjautuneen käyttäjän käyttöliittymä
function showLoggedInUser(username) {
  loginForm.style.display = "none";
  userSection.style.display = "block";
  userNameSpan.textContent = username;
}
