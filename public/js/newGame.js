//----PLUS & MOINS JOUEURS ----//
const baliseButtonMoinsJoueur = document.querySelector("#buttonMoinsJoueur");
baliseButtonMoinsJoueur.addEventListener("click", minusNbJoueur);

const baliseButtonPlusJoueur = document.querySelector("#buttonPlusJoueur");
baliseButtonPlusJoueur.addEventListener("click", plusNbJoueur);

function minusNbJoueur(){
    const baliseInputNbJoueur = document.querySelector("#valueJoueurs");
    if(baliseInputNbJoueur.value * 1 > 2){
        baliseInputNbJoueur.value = baliseInputNbJoueur.value * 1 - 1;
    }
}

function plusNbJoueur(){
    const baliseInputNbJoueur = document.querySelector("#valueJoueurs");
    if(baliseInputNbJoueur.value * 1 < 10){
        baliseInputNbJoueur.value = baliseInputNbJoueur.value * 1 + 1;
    }
}
//-----------------------------//

//----PLUS & MOINS SECONDES----//
const baliseButtonMoinsSeconde = document.querySelector("#buttonMoinsSeconde");
baliseButtonMoinsSeconde.addEventListener("click", minusNbSecondes);

const baliseButtonPlusSeconde = document.querySelector("#buttonPlusSeconde");
baliseButtonPlusSeconde.addEventListener("click", plusNbSecondes);


function minusNbSecondes(){
    const baliseInputNbSeconde = document.querySelector("#valueSecondes");
    if(baliseInputNbSeconde.value * 1 - 5 >= 60){
        baliseInputNbSeconde.value = baliseInputNbSeconde.value * 1 - 5;
    }
    else{
        baliseInputNbSeconde.value = 60;
    }
}

function plusNbSecondes(){
    const baliseInputNbSeconde = document.querySelector("#valueSecondes");
    if(baliseInputNbSeconde.value * 1 + 5 <= 180){
        baliseInputNbSeconde.value = baliseInputNbSeconde.value * 1 + 5;
    }
    else{
        baliseInputNbSeconde.value = 180;
    }
}
//-----------------------------//

//-------LAUNCH THE GAME-------//
const baliseButtonCreateGame = document.querySelector("#buttonCreateGame");
baliseButtonCreateGame.addEventListener("click", launchGame);

function launchGame(){
    const baliseSectionMenuCreateGame = document.querySelector("#menuCreateGame");
    baliseSectionMenuCreateGame.style.display = "none";

    const baliseSectionWaitingRoom = document.querySelector("#waitingRoom");
    baliseSectionWaitingRoom.style.display = "block";

    const baliseTextWaitingRoom = document.querySelector("#textWaitingRoom");
    const baliseInputNbJoueur = document.querySelector("#valueJoueurs");
    baliseTextWaitingRoom.innerHTML = "Waiting players : 0/" + baliseInputNbJoueur.value;
    const baliseCodeForRoom = document.querySelector("#codeForRoom");
    const code = generateCode(4);
    baliseCodeForRoom.innerHTML = "Code : <strong>" + code + "</strong>";
    //mettre dans la db
}

function generateCode(lengthCode){
    let result = "";
    for (let i = 0 ; i < lengthCode ; i++){
        result += String.fromCharCode(96 + getRandomInt(1, 26));
    }
    return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}