

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
        <div data-category = '${itemGallery.categoryId}'>
          
          <img src='${itemGallery.imageUrl}' alt = '${itemGallery.title}'/>
          <p>éditer</p>

        </div>
       `;
       portfolioGalleryModal3.insertAdjacentHTML('beforeend', listItemRaw);

      });
   
  };
  fetchGalleryModal3();


       
      //création de la page ADMIN
          // Récuperer le contenu de la page indexe.html
          // fetch('index.html')
          //   .then(response => response.text())
          //   .then(Data => {
          //    //Insérer le contenu dans une nouvelle page html
          //    const parser = new DOMParser();
          //    const htmlDoc = parser.parseFromString(Data, 'text/html');
          //     // modifier le contenu de la page admin
          //           // *bande noire Header
          //        const blackBanner = document.querySelector("#blackBanner");
          //            const bannerEdit = document.createElement('div');
          //            bannerEdit.classList.add('edit');
          //            const bannerIcon = document.createElement('i'); 
          //            bannerIcon.classList.add('penHeader', 'fa-regular', 'whiteColor', 'fa-pen-to-square');              
          //            const bannerText = document.createElement('p');
          //            bannerText.textContent = 'Mode édition';
          //            const publishBtn = document.createElement('button');
          //            publishBtn.id = 'btnHeader';
          //            publishBtn.textContent = 'publier les changements'
          //            bannerEdit.appendChild(bannerIcon);
          //            bannerEdit.appendChild(bannerText);
          //            bannerEdit.appendChild(publishBtn);
                     
          //            blackBanner.appendChild(bannerEdit)
          //            console.log(blackBanner);    
          //         //Ajout Icone et text modal1
          //         const modal1 = document.querySelector(".modifier1");
          //         const modal1Icon = document.createElement('i');
          //              modal1Icon.classList.add('fa-regular', 'fa-pen-to-square', 'blackColor');
          //         const modal1text = document.createElement('p');
          //             // **Créer le lien hypertexte dans l'élément p
          //         const modal1Link = document.createElement('a');
          //               modal1Link.href = "#modal1";
          //               modal1Link.className.add("js-modal");
          //               modal1Link.textContent = "modifier";
          //              // **Ajouter l'élément div à la page
          //               modal1text.appendChild(modal1Link);
          //               modal1.appendChild(modal1Icon);
          //               modal1.appendChild(modal1text);

          //            //Ajout du contenu modifié de la page index.html à la page admin.html
          //     // Afficher la page HTML
          //       const adminPage = document.createElement('html');
          //        adminPage.appendChild(htmlDoc.documentElement.cloneNode(true));
          //       document.documentElement.replaceWith(adminPage);
          //        // document.body.innerHTML = admin.outerHTML

          //   });

    
    
   // Vérification du Token 
    function tokenVerification(){
      
      const token = localStorage.getItem('token')
   
     if(token){
      console.log("token en mémoire ! => Mode admin activé");
      //au chargement de la page index rajout bandeau noir 
      adminEdition();
     }else {
      console.log("pas de token en mémoire");

    }

  } 

    const removeGalleryItem = async (id) =>{
      // Formuler la demande d'autorisation accés token
      const responseAuth = await fetch('http://localhost:5678/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'your_username', password: 'your_password' }),
      });
      const { accessToken } = await responseAuth.json();
  
        
    // Formuler la demande de supression avec autorisation accés token
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.ok) {
      console.log(`Item with id ${id} deleted successfully.`);
    } else {
      throw new Error(`Failed to delete item with id ${id}.`);
    }
    
  };

   //Passage en mode administrateur 
   

    
  
   

//   //Suppression des images de la galerie
//   let deleteBtn = document.createElement('i');
//       deleteBtn.classList.add("fa-solid", "fa-trash-can");
//       deleteBtn.style.display = "none";

//   let editBtn = document.querySelector(".editGalleryModal3 p");
      
      
// let figure = document.createElement("figure");
// let galleryElement = document.querySelectorAll('.editGalleryModal3 div');
//     //  Ajout de boucle forEach
//    galleryElement.appendChild(figure);

//    figure.appendChild(deleteBtn);
//    figure.appendChild(editBtn);
   
  