const error = document.querySelector('.error');
const submit = document.getElementById('submit');

// Ajout d'un evenement eventLister sur le bouton submit

submit.addEventListener('click', (event) => {
    // Suspendre le changement de la page
    event.preventDefault();

   

    // Selectionnement l'email et le password 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Vérifier que l'email et le mot de passe sont corrects

   

       //    Si ce n'est pas valide 

   if (!email || !password ){
    document.querySelector('.error').innerHTML = "Email or password is incorrect";
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
  // Si la connexion est réussie, enregistrer le jeton dans le stockage local
  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = "./index.html";
  }
})
.catch(error => console.error(error));
});