
const portfolioGallery = document.querySelector('#portfolio .gallery');
 
const fetchGallery = async() =>{
  let galleryData = [];
  await fetch('http://localhost:5678/api/works')
       .then((res)=> res.json())
       .then((promise) => {
        galleryData = promise;
                
       })
       .catch(error => console.error(error));

       portfolioGallery.innerHTML = " ";

      galleryData.map(function(itemGallery){
                
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
  

//  Creation of buttons //

const allButton = document.createElement("button");
allButton.textContent = 'Tous';
const objectButton = document.createElement("button");
objectButton.textContent = 'Objets';
const appartementButton = document.createElement("button");
appartementButton.textContent = 'Appartements';
const hotelRestaurantButton = document.createElement("button");
hotelRestaurantButton.textContent = 'Hotels & restaurants';

const portfolioFilter = document.querySelector('#portfolio .filter');

portfolioFilter.appendChild(allButton);
portfolioFilter.appendChild(objectButton);
portfolioFilter.appendChild(appartementButton);
portfolioFilter.appendChild(hotelRestaurantButton);

console.log(portfolioFilter);
     // Fonction pour designer le boutton actif
      function setActiveButton(button){
        allButton.classList.remove('active');
        objectButton.classList.remove('active');
        appartementButton.classList.remove('active');
        hotelRestaurantButton.classList.remove('active');

       //Ajout de la classe 'Active' au bouton lors du click//
         button.classList.add('active');
  
      }

      function filterWorks(category){
        const gallery = document.querySelector('.gallery');
        for(const work of gallery.children){
        console.log(work);
        if (category == work.dataset.category){
          work.style.display = "block";
        } else{
            work.style.display = "none";
          }
      };
      };

     function diplayAllWorks(){
      const gallery = document.querySelector('.gallery');
        for(const work of gallery.children){
          work.style.display = "block";
        };
     };
      // add click event listeners to each button
      allButton.addEventListener('click', function(){
        setActiveButton(allButton);
        diplayAllWorks();
      });

      objectButton.addEventListener('click', function(){
        setActiveButton(objectButton);
        filterWorks(1);

      });

      appartementButton.addEventListener('click', function(){
          setActiveButton(appartementButton);
          filterWorks(2);
      });

      hotelRestaurantButton.addEventListener('click', function(){
         setActiveButton(hotelRestaurantButton);
         filterWorks(3);
      });



      