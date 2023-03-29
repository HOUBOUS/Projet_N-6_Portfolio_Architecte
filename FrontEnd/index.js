let galleryData = [];

const fetchGallery = async() =>{
  await fetch('http://localhost:5678/api/works')
       .then((res)=> res.json())
      .then((promise) => {
        galleryData = promise;
        console.log(galleryData);
      });
};

const SetGallery = async () => {
     await fetchGallery();
     document.querySelector(".gallery");
};

   SetGallery();

// // Création de la gallery



// const galleryEl = document.querySelector(".gallery");
// const image = document.createElement('img');
// const title = document.createElement('figcaption');
// const figureElement = document.createElement('figure');

// imageElement.crossOrigin= "anonymos";
// imageElement.src = gallery.imageUrl;
// imageElement.alt = gallery.title;
// galleryFigCaption.innerHTML = gallery.title;

// galleryEl.appendChild("imageElement");

// const creategalleryElement = (worksList) => {
//   worksList.forEach((work) => {
//     const figureElement = document.createElement("figure");
//     const galleryImg = document.createElement("img");
//     const galleryFigCaption = document.createElement("figcaption");

//     galleryImg.crossOrigin = "anonymous";
//     galleryImg.src = work.imageUrl;
//     galleryImg.alt = work.title;

//     // galleryFigCaption.innerHTML = work.title;

//     // const creategalleryElement = (worksList) => {
//     //   worksList.forEach((work) => {
//     //     const figureElement = document.createElement("figure");
//     //     const galleryImg = document.createElement("img");
//     //     const galleryFigCaption = document.createElement("figcaption");
    
    //     galleryImg.crossOrigin = "anonymous";
    //     galleryImg.src = work.imageUrl;
    //     galleryImg.alt = work.title;
    
    //     galleryFigCaption.innerHTML = work.title;
    
       
    //    figureElement.setAttribute("data-id", work.id);
    //     figureElement.append(galleryImg);
    //     figureElement.append(galleryFigCaption);
    //     galleryElement.append(figureElement);
    //   });
    // };//