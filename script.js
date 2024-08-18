// Configurazione Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);

// Funzione per mostrare notifiche all'utente
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Gestione dello stato dell'utente al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    if (loggedInUsername) {
        document.querySelector('.account-icon img').src = 'account-icon.png';
        document.querySelector('.account-icon span').textContent = loggedInUsername;
        
        // Nascondi la sezione di autenticazione se l'utente è loggato
        const authSection = document.getElementById('authSection');
        if (authSection) {
            authSection.style.display = 'none';
        }
    } else {
        document.querySelector('.account-icon img').src = 'account-icon-guest.png';
        document.querySelector('.account-icon span').textContent = 'Account';
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
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

// Event Listener per il submit del form di registrazione
document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
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
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        localStorage.setItem('loggedInUserId', userCredential.user.uid);
        localStorage.setItem('loggedInUsername', email);
        window.location.href = 'index.html'; // Redirect alla home page
    } catch (error) {
        alert('Errore di login: ' + error.message);
    }
});
