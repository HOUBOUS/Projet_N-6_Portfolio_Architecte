
const token = localStorage.getItem('token');
const modals = document.querySelectorAll('.js-modal');
const blackBanner = document.getElementById('blackBanner');
const login = document.querySelector('#lienLogin');
const logout = document.getElementById('lienLogout');
const filters = document.querySelector('#portfolio .filter');
const editIcon = document.querySelectorAll('.fa-pen-to-square');


//losqu'on appuie sur le bouton logout, efface le local storage

logout.addEventListener('click', () => {
  localStorage.clear();
  logout.href = "index.html";
  blackBanner.innerHTML = " ";
  blackBanner.style.display = "none";
  filters.innerHTML = " ";

  modals.forEach(modals => {
    modals.style.display = 'none';
  });

  editIcon.forEach(editIcon =>{
    editIcon.style.display ='none';
  });
    
});
       //gestion de l'ouverture des modales

  const openModal = function(e){
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
  closeButtons[i].addEventListener("click", function() {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
    modal4.style.display = "none";
  });
}
//Utilisateur click n'importe où à l'extérieur de la modale ça ferme la modale
window.addEventListener("click", function(event) {
  if (event.target === modal1 || event.target === modal2 || event.target === modal3 || event.target === modal4) {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
    modal4.style.display = "none";
  }
});


// Afficher les images de la modale3

let galleryModalData = [];
 
const fetchGalleryModal3 = async() =>{
     await fetch('http://localhost:5678/api/works')
           .then((res)=> res.json())
           .then((promise) => {
           galleryModalData = promise;
           console.log(galleryModalData);
        
         })

       .catch(error => console.error(error));

       const portfolioGalleryModal3 = document.querySelector('#modal3 .editGalleryModal3');

       galleryModalData.map(function(itemGallery){
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
    const responseAuth = await fetch('http://localhost:5678/api/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'your_email', password: 'your_password' })
    });
    const { accessToken } = await responseAuth.json();
  
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
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
    if (event.target.classList.contains('trash-can-button')) {
      const listItem = event.target.parentNode;
      const id = listItem.dataset.id;
      removeGalleryItem(id);
      listItem.parentNode.removeChild(listItem);
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

  