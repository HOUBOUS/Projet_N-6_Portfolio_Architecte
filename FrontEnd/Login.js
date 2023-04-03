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

   fetch('http://localhost:5678/api/users/login',{
          
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(response => {
            
            if (response.ok) {
                //rajout du stockage dans le local storage user id et Token
              window.location.href = 'index.html';
            } else {
              
              const error = document.querySelector('.error');
              error.innerHTML = 'Email or password is incorrect';
            };
          })
        
        
 });

