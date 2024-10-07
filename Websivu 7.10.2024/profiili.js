// Store the user data (this is for simplicity, normally you'd use server-side validation)
let userData = {
    username: null,
    password: null,
};

// Form elements
const loginForm = document.getElementById('loginForm');
const userSection = document.getElementById('user-section');
const userNameSpan = document.getElementById('user-name');
const logoutButton = document.getElementById('logoutButton');

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
        // If user is logged in, show their profile section
        userData.username = storedUsername;
        showLoggedInUser(storedUsername);
    }
});

// Handle form submission (user registration/login)
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // If user is not registered, save the credentials
    if (!userData.username || !userData.password) {
        userData.username = username;
        userData.password = password;
        localStorage.setItem('username', username); // Store username in localStorage
        alert('Rekisteröinti onnistui! Voit nyt kirjautua sisään.');
    }

    // Check if credentials match
    if (userData.username === username && userData.password === password) {
        // Successful login
        localStorage.setItem('username', username); // Save the username in localStorage
        showLoggedInUser(username);
    } else {
        alert('Virheellinen käyttäjänimi tai salasana.');
    }
});

// Handle logout
logoutButton.addEventListener('click', function () {
    localStorage.removeItem('username'); // Remove username from localStorage
    loginForm.style.display = 'block';
    userSection.style.display = 'none';
});

// Show logged-in user interface
function showLoggedInUser(username) {
    loginForm.style.display = 'none';
    userSection.style.display = 'block';
    userNameSpan.textContent = username;
}
