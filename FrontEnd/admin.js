
const token = localStorage.getItem('token');
const modals = document.querySelectorAll('.js-modal');
const blackBanner = document.getElementById('blackBanner');
const login = document.querySelector('#lienLogin');
const logout = document.getElementById('lienLogout');
const filters = document.querySelector('#portfolio .filter');
const editIcon = document.querySelectorAll('.fa-pen-to-square');

// Gérer le rechargement de la page 

if (token){
 login.style.display = "none";
 logout.style.display = "block";
 blackBanner.style.display = "block";
 modals.forEach(modals => {
  modals.style.display = 'block';
});

editIcon.forEach(editIcon => {
  editIcon.style.display = 'block';
});

}else{
  login.style.display = "block";
  logout.style.display = "none";
  filters.innerHTML = " ";
  modals.forEach(modals => {
    modals.style.display = 'none';
    
  });

  editIcon.forEach(editIcon => {
    editIcon.style.display = 'none';
  });
  blackBanner.style.display = "none";

}

//losqu'on appuie sur le bouton logout, efface le local storage
logout.addEventListener('click', () => {
  localStorage.clear();
  logout.href = "index.html";
  blackBanner.innerHTML = " ";
  blackBanner.style.display = "none";
  login.style.display = "block";
  filters.innerHTML = " ";

  modals.forEach(modals => {
    modals.style.display = 'none';
  });

  editIcon.forEach(editIcon => {
    editIcon.style.display = 'none';
  });

});
//gestion de l'ouverture des modales

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = null;
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', true);
};

document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener('click', openModal);

});



// Utilisateur click sur le bouton pour fermer la modale

const closeButtons = document.querySelectorAll(".modal-close");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", function () {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
    modal4.style.display = "none";
  });
}
// Utilisateur click n'importe où à l'extérieur de la modale ça ferme la modale
window.addEventListener("click", function (event) {
  if (event.target === modal1 || event.target === modal2 || event.target === modal3 || event.target === modal4) {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
    modal4.style.display = "none";
  }
});

function closeModal4(event) {
  event.preventDefault();
  modal4.style.display = "none";

}

// Afficher les images de la modale3

let galleryModalData = [];

const fetchGalleryModal3 = async () => {
  await fetch('http://localhost:5678/api/works')
    .then((res) => res.json())
    .then((promise) => {
      galleryModalData = promise;
      console.log(galleryModalData);

    })

    .catch(error => console.error(error));

  const portfolioGalleryModal3 = document.querySelector('#modal3 .editGalleryModal3');

  galleryModalData.map(function (itemGallery) {
    console.log("itemGallery", itemGallery);

    const listItemRaw = `
        <div data-id = '${itemGallery.id}'>
          
          <img src='${itemGallery.imageUrl}' alt = '${itemGallery.title}'/>
          <i class="fas fa-trash-can trash-can-button"></i>
          <p>éditer</p>

        </div>
       `;
    portfolioGalleryModal3.insertAdjacentHTML('beforeend', listItemRaw);

  });
  
  };
fetchGalleryModal3();


//La fonction removeGalleryItem est appelée avec l'ID de l'élément parent, qui est stocké dans l'attribut de données "data-id" de la div parent. 


// Pour supprimer un élement de l'API Swagger, je fait une demande d'autorisation en envoyant les informations d'identification email et password,
const removeGalleryItem = async (id) => {
  

  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  // La fonction de suppression utilise l'API Swagger pour supprimer l'élément avec l'ID donné, et si elle réussit, elle supprime également l'élément 
  // HTML correspondant de la galerie.
  if (response.status === 204) {
    console.log(`Item with id ${id} deleted successfully.`);
  } else {
    throw new Error(`Failed to delete item with id ${id}.`);
  }
};

const portfolioGalleryModal3 = document.querySelector('#modal3 .editGalleryModal3');

// Ecouter l'évenement clique sur l'icône de corbeille (trash-can-button) pour supprimer l'élement parent 


portfolioGalleryModal3.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('trash-can-button')) {
    const listItem = event.target.parentNode;
    const id = listItem.dataset.id;
    const confirmationSupression = confirm("êtes vous sûr de supprimer ce work??");
    if (confirmationSupression) {
      removeGalleryItem(id);
      event.stopPropagation();
      listItem.parentNode.removeChild(listItem);
    }

  }
});

//Suppression de l'ensemble des travaux en cliquant que le bouton "Supprimer la galerie"
const deleteGallery = document.querySelector('.deleteGallery');
const editGalleryModal3 = document.querySelector('.editGalleryModal3');
const arrowMultidirection = document.querySelector('.modalMultidirection .fa-up-down-left-right');

deleteGallery.addEventListener('click', () => {

  editGalleryModal3.innerHTML = " ";
  arrowMultidirection.style.display = "none";

});

// Afficher la nouvelle photo dans la galerie 

const chartAddPhoto = document.querySelector('#chartAddPhoto');
const image = document.querySelector('#inputImg');

image.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    chartAddPhoto.style.backgroundImage = `url(${reader.result})`;
  };
});

// récuperer le formulaire et ajouter un listener sur l'evenement submit
  const formular = document.getElementById('formular');

  formular.addEventListener('submit', (event) => {
   // Empecher l'envoi par défaut de mon formulaire
    event.preventDefault();
    event.stopPropagation();

   //Récupérer les valeurs des différents éléments
    const title = document.getElementById('title').value;
    const imageName = document.getElementById('inputImg').files[0];
    const category = document.getElementById('category').value;
    const submitBtn = document.getElementById('addSubmitBtn');

    
    //Message d'erreur si le formulaire est mal rempli 
    const errorMessage = document.getElementById('errorMessage');

    console.log(!title || !imageName || !category);

    if (!title || !imageName || !category) {

     errorMessage.textContent = 'Veuillez remplir tous les champs';

    }
    else {
     errorMessage.innerHTML = " ";
     
    }
     //Création d'un objet appelé FormData pour envoyer le fichier image
     const formData = new FormData();
     formData.append('title', title);
     formData.append('image', imageName);
     formData.append('category', category);
     

   // Envoyer la requete avec fetch à l'API Swagger 
    fetch('http://localhost:5678/api/works', {
       method: 'POST',
       headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })

    .then(response => {
     
      if (!response.ok) {
        throw new Error('Une erreur est survenue!!');
        
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      const changeColorBtn = () => {
        if (image && title && category){
          submitBtn.style.backgroundColor = '#1D6154';
          
        }else{
          submitBtn.style.backgroundColor = '#A7A7A7';
        }
      };
      document.getElementById('errorMessage').textContent = 'Le formulaire a été envoyé avec succès !';
      // Message de confirmation

     
      const newWork = document.createElement("div");
      newWork.dataset.id = data.id;
      const imgNewWork = document.createElement("img");
      imgNewWork.src = data.imageUrl;
      const titleNewWork = document.createElement("p");
      titleNewWork.innerHTML = data.title;
      const galerie = document.querySelector("#portfolio .gallery");

      galerie.appendChild(newWork);
      newWork.appendChild(imgNewWork);
      newWork.appendChild(titleNewWork);
      
    })
    
    .catch((error) => {
      console.error(error);
      document.getElementById('errorMessage').textContent = 'Une erreur est survenue lors de l\'envoi du formulaire';
    });
  });

  //Changer la couleur du bouton "valider" en vert si tous les champs sont remplis 


  const title = document.getElementById('title');
  const inputImg = document.getElementById('inputImg');
  const category = document.getElementById('category');
  const submitBtn = document.getElementById('addSubmitBtn');

  
    
  // Ecouter les changement au niveau du titre, de l'image ou de la catégorie ensuite faire appel 
  // a la fonction validateForm
  title.addEventListener('input', validateForm);
  inputImg.addEventListener('change', validateForm);
  category.addEventListener('change', validateForm);
  

  
  // La Fonction validateForm vérifie que les trois champs ont des valeurs
  function validateForm() {
    // Vérifier que les champs : Title, inputImg, category ont une valeur 
    if (title.value && inputImg.value && category.value !=="0"){
        // Si les trois champs sont bien remplis le bouton change de couleur
        submitBtn.style.backgroundColor = "#1D6154";
    }
    // si l'un des tois champs est vide le bouton garde sa couleur par défaut 
    else{

         submitBtn.style.backgroundColor = "";

    }
  }
  
  