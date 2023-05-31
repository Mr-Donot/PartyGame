
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
let code;

async function launchGame(){
    const balisePseudoPlayerHost = document.querySelector("#pseudoPlayerHost");
    const pseudoHost = balisePseudoPlayerHost.value;
    if (pseudoHost == ""){
        //TODO ajouter msg "veuillez entrer un pseudo"
        return;
    }

    const baliseSectionMenuCreateGame = document.querySelector("#menuCreateGame");
    baliseSectionMenuCreateGame.style.display = "none";

    const baliseSectionWaitingRoom = document.querySelector("#waitingRoom");
    baliseSectionWaitingRoom.style.display = "block";

    const baliseTextWaitingRoom = document.querySelector("#textWaitingRoom");
    const baliseInputNbJoueur = document.querySelector("#valueJoueurs");
    const nbJoueur = baliseInputNbJoueur.value;

    
   
    baliseTextWaitingRoom.innerHTML = "Waiting players : 1/" + nbJoueur;
    const baliseCodeForRoom = document.querySelector("#codeForRoom");
    code = generateCode(4);
    const baliseInputNbSeconde = document.querySelector("#valueSecondes");
    const nbSeconde = baliseInputNbSeconde.value;
    baliseCodeForRoom.innerHTML = "Code : <strong>" + code + "</strong>";
    let response = await fetch('/api/rooms/addRoom/'+code+'/'+nbJoueur+'/'+nbSeconde, {
        method: "post",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    })
    if (response.status == 200){
        fetch('api/rooms/addPlayer/'+code+'/'+pseudoHost, {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        });
    }    
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


//Récup de n'importe quel message de n'importe quel utilisateur
socket.on('addPlayer', function(data) {
    const baliseTextWaitingRoom = document.querySelector("#textWaitingRoom");
    if (data.room.codeRoom == code){
        baliseTextWaitingRoom.innerHTML = "Waiting players : " + data.room.playersList.length + "/" + data.room.nbMaxPlayer;
        if (data.room.playersList.length == data.room.nbMaxPlayer){
            let objectDataToSentToAPI = {
                "room" : data.room
            }
            socket.emit("launchGame", objectDataToSentToAPI);
        }
    }    
});

