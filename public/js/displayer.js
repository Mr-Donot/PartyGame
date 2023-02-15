//-------GO TO CREATE GAME--------//
const baliseButtonNewGame = document.querySelector("#buttonNewGame");
baliseButtonNewGame.addEventListener("click", loadCreatePage);

function loadCreatePage(){
    const baliseSectionMenuPrincipal = document.querySelector("#menuPrincipal");
    baliseSectionMenuPrincipal.style.display = "none";

    const baliseSectionMenuCreateGame = document.querySelector("#menuCreateGame");
    baliseSectionMenuCreateGame.style.display = "block";
}
//--------------------------------//

//--------GO TO JOIN GAME---------//

const baliseButtonJoinGame = document.querySelector("#buttonJoinGame");
baliseButtonJoinGame.addEventListener("click", loadJoinPage);

function loadJoinPage(){
    const baliseSectionMenuPrincipal = document.querySelector("#menuPrincipal");
    baliseSectionMenuPrincipal.style.display = "none";

    const baliseSectionMenuJoinGame = document.querySelector("#menuJoin");
    baliseSectionMenuJoinGame.style.display = "block";
}
//--------------------------------//



//--------GO TO TUTORIAL ---------//
const baliseButtonTutorial = document.querySelector("#buttonTutorial");
baliseButtonTutorial.addEventListener("click", loadTutorialPage);

function loadTutorialPage(){
    const baliseSectionMenuPrincipal = document.querySelector("#menuPrincipal");
    baliseSectionMenuPrincipal.style.display = "none";

    const baliseSectionTutorial = document.querySelector("#pageTutorial");
    baliseSectionTutorial.style.display = "block";
}
//--------------------------------//


//--------GO BACK TO MENU---------//
const allBalisesRetourToMenu = document.querySelectorAll(".buttonRetourMenu");
for (let i = 0 ; i < allBalisesRetourToMenu.length ; i++){
    allBalisesRetourToMenu[i].addEventListener("click", (e) => {
        const baliseButtonReturn = e.target;
        baliseButtonReturn.parentElement.style.display = "none";

        const baliseSectionMenuPrincipal = document.querySelector("#menuPrincipal");
        baliseSectionMenuPrincipal.style.display = "block";
    });
}
//--------------------------------//

