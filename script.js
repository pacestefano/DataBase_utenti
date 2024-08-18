  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBlLvwA9EV_bTdJ6zmqNFnAcJD0DMmQC14",
    authDomain: "insta-post-1.firebaseapp.com",
    projectId: "insta-post-1",
    storageBucket: "insta-post-1.appspot.com",
    messagingSenderId: "41317315683",
    appId: "1:41317315683:web:40453788ac3e9326e57456",
    measurementId: "G-XH4JJNB49X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// Funzione per mostrare notifiche all'utente
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

// Gestione dello stato dell'utente al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    const accountIconImg = document.querySelector('.account-icon img');
    const accountIconText = document.querySelector('.account-icon span');
    const authSection = document.getElementById('authSection');

    if (loggedInUsername) {
        if (accountIconImg) {
            accountIconImg.src = 'account-icon.png';
        }
        if (accountIconText) {
            accountIconText.textContent = loggedInUsername;
        }
        if (authSection) {
            authSection.style.display = 'none';
        }
    } else {
        if (accountIconImg) {
            accountIconImg.src = 'account-icon-guest.png';
        }
        if (accountIconText) {
            accountIconText.textContent = 'Account';
        }
    }
});

// Funzione per gestire il reindirizzamento alla pagina dell'account o al login
function goAccount() {
    const loggedIn = localStorage.getItem('loggedInUsername'); 
    if (loggedIn) {
        window.location.href = 'storico.html';
    } else {
        window.location.href = 'login.html';
    }
}

// Funzione per il toggle del menu a burger
function toggleMenu() {
    const menu = document.getElementById('burgerMenuContent');
    if (menu) {
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    }
}

// Event Listener per il submit del form di registrazione
document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        localStorage.setItem('loggedInUserId', userCredential.user.uid);
        localStorage.setItem('loggedInUsername', email);
        window.location.href = 'index.html'; // Redirect alla home page
    } catch (error) {
        alert('Errore di registrazione: ' + error.message);
    }
});

// Event Listener per il submit del form di login
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        localStorage.setItem('loggedInUserId', userCredential.user.uid);
        localStorage.setItem('loggedInUsername', email);
        window.location.href = 'index.html'; // Redirect alla home page
    } catch (error) {
        alert('Errore di login: ' + error.message);
    }
});
