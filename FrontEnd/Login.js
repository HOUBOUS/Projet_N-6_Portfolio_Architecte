const error = document.querySelector('.error');
const submit = document.getElementById('submit');
const token = localStorage.getItem('token');
const modals = document.querySelectorAll('.js-modal');
const login = document.querySelector('.lienConnexion');
const filtres = document.querySelector('.filtres');
const loginForm = document.getElementById('loginForm');


// Ajout d'un evenement eventLister sur le bouton submit

loginForm.addEventListener('submit', (event) => {
  // Suspendre le changement de la page
  event.preventDefault();
  // Selectionnement l'email et le password 
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Vérifier que l'email et le mot de passe sont corrects

  //    Si ce n'est pas valide 

  if (!email || !password) {
    document.querySelector('.error').innerHTML = "Email ou mot de passe manquant!";
    return;
  }

  // Définir les informations de connexion

  // Effectuer une requête POST à l'API pour se connecter
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(data => {
      // Si la connexion est réussie, enregistrer 
      // le jeton dans le stockage local
      if (data.token) {
        localStorage.setItem('tokenSophie', data.token);
        window.location.href = "./index.html";
      } else {
        error.innerHTML = "Email ou mot de passe incorrect:("
      }

    })

    .catch(error => console.error(error));
});