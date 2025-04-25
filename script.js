
const passwordBox = document.getElementById("Password");
const length = 16;


const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";

const number = "123456789";
const symbol = "~@!#$%^&*()_+{}[]~?< >";

const alChars = upperCase + lowerCase + number + symbol;

function createPassword(){
    let password ="";

    password = password + upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while(length > password.length){
        password += alChars[Math.floor(Math.random() * alChars.length)];
    }

    passwordBox.value = password;

    const historyItem = document.createElement("h2");
    historyItem.textContent = password;
    
    const historyContainer = document.querySelector(".history");
    historyContainer.appendChild(historyItem);


}