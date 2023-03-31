const form = document.querySelector('form');
console.log("form = " + form);

form.addEventListener('submit', (event) => {
    console.log("on reprend la main sur le click du submit")
    event.preventDefault();

    // Get the username and password values from the form
    const email = form.elements.mail.value;
    const password = form.elements.password.value;

});
