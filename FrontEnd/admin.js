
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

//   const openModal = function(e){
//     e.preventDefault();
//     const target = document.querySelector(e.target.getAttribute('href'));
//     target.style.diplay = null;
//     target.removeAttribute('aria-hidden');
//     target.setAttribute('aria-modal', true);
//   };

//  document.querySelectorAll(".js-modal").forEach(a => {
//     a.addEventListener('click', openModal);
    
//  });

// Get the modals and the buttons that open them
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const modal3 = document.getElementById("modal3");
const btn1 = document.querySelector(".js-modal[href='#modal1']");
const btn2 = document.querySelector(".js-modal[href='#modal2']");
const btn3 = document.querySelector(".js-modal[href='#modal3']");

// When the user clicks the button, open the modal
btn1.addEventListener("click", function() {
  modal1.style.display = "block";
});
btn2.addEventListener("click", function() {
  modal2.style.display = "block";
});
btn3.addEventListener("click", function() {
  modal3.style.display = "block";
});

// When the user clicks the close button, close the modal
const closeButtons = document.querySelectorAll(".modal-close");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", function() {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
  });
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target === modal1 || event.target === modal2 || event.target === modal3) {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
  }
});