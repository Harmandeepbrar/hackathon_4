// here, we grab a reference to our form. It's the gateway for user input.
const form = document.getElementById("contactForm");

const emailInput = form.elements["email"];

form.addEventListener("submit", (event) => {
    // prevent the default submission
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    console.log(typeof(errorMessages));

    errorMessages.forEach(error => {
        error.remove();
    });

    
    // retrieve the name value
    const name = document.getElementById("name").value;

    // log the name
    console.log("Name entered:", name);

    // let's validate our form....
    if (validateForm()){
        form.submit();
        console.log("Validation successful");
    }else{

        console.log("validation failed.");
    }
});

document.getElementById("name").addEventListener("input", (evt) =>{
    console.log("Name changed to: ", evt.target.value);
});

/***
 * Purpose: a custom validation function for our form
 */
function validateForm(){
    let isValid= true;

    const nameInput = document.getElementById("name");
    const name = escapeHTML(nameInput.value);

    //Simple validation rules: name should not be empty
    if (name === ""){
        console.error("Name must be filled out");
        showInputError(nameInput, "Name is required.");
        isValid = false;
    
    }

    const email = document.getElementById("email");
    const emailInputValue = escapeHTML(email.value);

    console.log("Sanitized name entered:", name);
    console.log("Sanitized email entered:", email);

    const complexEmailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!complexEmailPattern.test(emailInputValue)){
        console.error("Please enter a valid email address");
        showInputError(email, "Please enter a valid email address");
        isValid = false;
    }

    return isValid;
}

// a function to display error message next to form input
function showInputError(inputElement, message){
    const container = inputElement.closest(".input-container");


    const errorDisplay = document.createElement("span");
    errorDisplay.innerHTML = message;
    errorDisplay.className = "error-message";
    errorDisplay.setAttribute("role","alert");


    inputElement.parentElement.appendChild(errorDisplay);
}

// A function to replace special characters with HTML entity character sets
function escapeHTML(input){
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}