
let galleryData = [];
 
const fetchGallery = async() =>{
  await fetch('http://localhost:5678/api/works')
       .then((res)=> res.json())
       .then((promise) => {
        galleryData = promise;
        console.log(galleryData);
        
       })

      //  .catch(error => console.error(error));

       const portfolioGallery = document.querySelector('#portfolio .gallery');

      galleryData.map(function(itemGallery){
        console.log("itemGallery", itemGallery);
        
       const listItemRaw = `
        <div data-category = '${itemGallery.categoryId}'>
          
          <img src='${itemGallery.imageUrl}' alt = '${itemGallery.title}'/>
          <p>${itemGallery.title}</p>

        </div>
       `;
       portfolioGallery.insertAdjacentHTML('beforeend', listItemRaw);

      });

      
  };
      fetchGallery();

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
  });
}
//Utilisateur click n'importe où à l'extérieur de la modale ça ferme la modale
window.addEventListener("click", function(event) {
  if (event.target === modal1 || event.target === modal2 || event.target === modal3) {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
  }
});