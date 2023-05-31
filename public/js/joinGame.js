const baliseButtonJoinGameWithCode = document.querySelector("#buttonJoinGameWithCode");
baliseButtonJoinGameWithCode.addEventListener("click", joinWithCode);



function joinWithCode(){
    const balisePseudoPlayer = document.querySelector("#pseudoPlayer");
    const pseudo = balisePseudoPlayer.value;
    if (pseudo == ""){
        const baliseDivWhenCodeFalse = document.querySelector("#divWhenCodeFalse");
        baliseDivWhenCodeFalse.innerHTML = "";
        const baliseMsgCodeFalse = document.createElement("p");
        baliseMsgCodeFalse.innerHTML = "Veuillez entrer un pseudo";
        baliseDivWhenCodeFalse.appendChild(baliseMsgCodeFalse);
        return;
    }
    const baliseCode = document.querySelector("#codeToEnterRoom");
    const code = baliseCode.value;
    baliseCode.value = "";
    let autorizedToEnter = false;
    fetch('api/rooms')
    .then(t => t.json())
    .then(r => {
        let boolStillPlaceInRoom = true;
        let boolAlreadyInRoom = false;
        let room;
        for (let i = 0 ; i < r.length ; i++){
            if (code == r[i].codeRoom){
                autorizedToEnter = true;
                for (let j = 0 ; j < r[i].playersList.length ; j++){
                    if (pseudo == r[i].playersList[j]){
                        boolAlreadyInRoom = true;
                    }
                }
                room = r[i];

                if (! boolAlreadyInRoom){
                    boolStillPlaceInRoom = ((r[i].nbMaxPlayer - r[i].playersList.length) > 0);
                }
                else{
                    boolStillPlaceInRoom = true;
                }
            }
        }
        if (boolStillPlaceInRoom){
            if (autorizedToEnter){
                const baliseMenuJoin = document.querySelector("#menuJoin");
                baliseMenuJoin.style.display = "none";
                const baliseWaitingRoomJoin = document.querySelector("#waitingRoomJoin");
                baliseWaitingRoomJoin.style.display = "block";
                if (! boolAlreadyInRoom){
                    
                    room.playersList.push(pseudo);
                    objectDataToSentToAPI = {
                        "room" : room
                    }
                    socket.emit("addPlayer", objectDataToSentToAPI);


                    fetch('api/rooms/addPlayer/'+code+'/'+pseudo, {
                        method: "post",
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        }
                    });
                    if (room.nbMaxPlayer == room.playersList.length){
                        socket.emit("launchGame", objectDataToSentToAPI);
                    }
                }
                else{
                    objectDataToSentToAPI = {
                        "room" : room
                    }
                    socket.emit("addPlayer", objectDataToSentToAPI);
                    if (room.nbMaxPlayer == room.playersList.length){
                        socket.emit("launchGame", objectDataToSentToAPI);
                    }
                }                
            }
            else{
                const baliseDivWhenCodeFalse = document.querySelector("#divWhenCodeFalse");
                baliseDivWhenCodeFalse.innerHTML = "";
                const baliseMsgCodeFalse = document.createElement("p");
                baliseMsgCodeFalse.innerHTML = "Code erroné, veuillez réessayer";
                baliseDivWhenCodeFalse.appendChild(baliseMsgCodeFalse);
            }
        }
        else{
            const baliseDivWhenCodeFalse = document.querySelector("#divWhenCodeFalse");
            baliseDivWhenCodeFalse.innerHTML = "";
            const baliseMsgCodeFalse = document.createElement("p");
            baliseMsgCodeFalse.innerHTML = "La partie est déjà complète";
            baliseDivWhenCodeFalse.appendChild(baliseMsgCodeFalse);
        }
        
    })    
}



