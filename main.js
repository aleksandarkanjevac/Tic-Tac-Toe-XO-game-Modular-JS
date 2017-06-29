
(function () {

for(var i=1; i<=6; i++){//buttons for calling tables

    var button = "button"+i; 
    var to= document.getElementById(button);
    to.addEventListener('click',startGame);    

}


function startGame(){
    var tip=this.getAttribute("data-type");//which table will be open
        XO.newGame(tip);

 
        
    }
    
 }());   

var XO = (function () {
    var API = {},
        activeGames = [], // {player: num, niz: {}, fields: {}, semaphore: '', semaphore1: '', reset: ''}
        gameTemplate = '<div class="game-wrapper" data-gameID="{{gameID}}">' +
                            '<div>' +
                                '<h3>Player turn:</h3>' +
                                '<p id="line-{{gameID}}">X</p>' +
                            '</div>' +
                            
                                '<div id="semaphore-{{gameID}}">' +
                                    '<span id="semaphore1-{{gameID}}"></span><br/><br/><br/>' +
                                    '<button id="reset-{{gameID}}" data-gameID="{{gameID}}" type="submit" name="submit1" style="visibility:hidden">New game</button>' +
                                '</div>' +
                                '<table>' +
                                    '<tr>' +
                                        '<th id="field1-{{gameID}}" data-gameID="{{gameID}}" data-columns="a" data-rows="0"></th>' +
                                        '<th id="field2-{{gameID}}" data-gameID="{{gameID}}" data-columns="a" data-rows="1"></th>' +
                                        '<th id="field3-{{gameID}}" data-gameID="{{gameID}}" data-columns="a" data-rows="2"></th>' +
                                    '</tr>' +
                                    '<tr>' +
                                        '<th id="field4-{{gameID}}" data-gameID="{{gameID}}" data-columns="b" data-rows="0"></th>' +
                                        '<th id="field5-{{gameID}}" data-gameID="{{gameID}}" data-columns="b" data-rows="1"></th>' +
                                        '<th id="field6-{{gameID}}" data-gameID="{{gameID}}" data-columns="b" data-rows="2"></th>' +
                                    '</tr>' +
                                    '<tr>' +
                                        '<th id="field7-{{gameID}}" data-gameID="{{gameID}}" data-columns="c" data-rows="0"></th>' +
                                        '<th id="field8-{{gameID}}" data-gameID="{{gameID}}" data-columns="c" data-rows="1"></th>' +
                                        '<th id="field9-{{gameID}}" data-gameID="{{gameID}}" data-columns="c" data-rows="2"></th>' +
                                    '</tr>' +
                                '</table>' +
                           
                        '</div>';


    function selection() {
        var gameID = this.getAttribute("data-gameID"),
            game = activeGames[gameID],
            x,
            y;

       
       
        if (game.player === 9) {
            
            game.reset.style.visibility = "visible";
            game.semaphore1.innerHTML = "DRAW!! YOU WONT PLAY AGAIN?";
            game.semaphore.style.visibility = "visible";
            
        }

//which player is on turn
        if (game.player % 2 != 0) {// even is x player 
            
            x = this.getAttribute("data-rows");
            y = this.getAttribute("data-columns");

            if(game.niz[y][x]==="X"){
             game.player--; 
            
            }else if (game.niz[y][x]==="O" ){
              game.player--; 
                
            }else{
            document.getElementById("line-" + gameID).innerHTML = "O";// if value is even its X player turn, inner say that on next turn is player O
            this.innerHTML = "X";
            game.niz[y].splice(x, 1, "X");

        }

        } else { // if row is not filed then next player turn
            
            x = this.getAttribute("data-rows");
            y = this.getAttribute("data-columns");

             if(game.niz[y][x]==="X"){
             game.player--; 
           
            }else if (game.niz[y][x]==="O" ){
              game.player--; 
             
            }else{
            document.getElementById("line-" + gameID).innerHTML = "X";
            this.innerHTML = "O";
            game.niz[y].splice(x, 1, "O");
        }
        }

         game.player++;
        //if number of moves is 9 and function comparison is not passed, it will be draw
        comparison(gameID, x); 
    }

//compare if lines is field with the same values
    function comparison(gameID, x) {
        var game = activeGames[gameID],
            gameOver = false;

        if (game.niz.a[0] == game.niz.a[1] && game.niz.a[1] == game.niz.a[2]) {
            //colored fields with the same values
            game.fields[1].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[2].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[3].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.reset.style.visibility = "visible";
            gameOver = true;
        } else if (game.niz.b[0] == game.niz.b[1] && game.niz.b[1] == game.niz.b[2]) {

            game.fields[4].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[5].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[6].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.reset.style.visibility = "visible";
            gameOver = true;
        } else if (game.niz.c[0] == game.niz.c[1] && game.niz.c[1] == game.niz.c[2]){

            game.fields[7].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[8].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[9].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.reset.style.visibility = "visible";
            gameOver = true;
        } else if (game.niz.a[0] == game.niz.b[0] && game.niz.b[0] == game.niz.c[0]){

            game.fields[1].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[4].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[7].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.reset.style.visibility = "visible";
            gameOver = true;
        } else if (game.niz.a[1] == game.niz.b[1] && game.niz.b[1] == game.niz.c[1]){
            game.fields[2].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[5].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[8].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.reset.style.visibility = "visible";
            gameOver = true;
        } else if (game.niz.a[2] == game.niz.b[2] && game.niz.b[2] == game.niz.c[2]){
            game.fields[3].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[6].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[9].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.reset.style.visibility = "visible";
            gameOver = true;
        } else if (game.niz.a[0] == game.niz.b[1] && game.niz.b[1] == game.niz.c[2]){
            game.fields[1].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[5].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[9].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.reset.style.visibility = "visible";
            gameOver = true;
        } else if (game.niz.a[2] == game.niz.b[1] && game.niz.b[1] == game.niz.c[0]){
            game.fields[3].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[5].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.fields[7].setAttribute("style", "background-color: antiquewhite;color:black;");
            game.reset.style.visibility = "visible";
            gameOver = true;
        }

        if (gameOver) {
            whoWin(game);
        }
    }

//will give us player who completed the line with the same value.if the value of the variable is even then it means it is player x.vice versa it's the O-player
    function whoWin(game) {

        if (game.player % 2 != 0) {
            game.semaphore1.innerHTML = "The winner is player O!! <br/> YOU WANT PLAY AGAIN?";
            game.semaphore.style.visibility = "visible";
            //game.semaphore.style.backgroundColor = "antiquewhite";
           // game.semaphore.style.color = "black";
        } else {

            game.semaphore1.innerHTML = "The winner is player X!! <br/> YOU WANT PLAY AGAIN?";
            game.semaphore.style.visibility = "visible";
            //game.semaphore.style.backgroundColor = "antiquewhite";
            //game.semaphore.style.color = "black";
        }
    }
    
    function reset () {

        var gameID = this.getAttribute("data-gameID"),
            game = activeGames[gameID];
        game.reset.style.visibility = "hidden";
        game.semaphore.style.visibility = "hidden";
        game.player = 1;
        game.niz = {
            a: ["0", "1", "2"],
            b: ["3", "4", "5"],
            c: ["6", "7", "8"]
        };

        for (var i = 1; i <= 9; i++) {
            activeGames[gameID].fields[i].innerHTML = '';
            game.fields[i].setAttribute("style", "background-color: black;");

        }
        document.getElementById("line-" + gameID).innerHTML = "X";
        game.semaphore1.innerHTML = '';

        
    }


    API.newGame = function (wrap) {
        var container = document.getElementById(wrap),
            gameID;

        if (!container) {
            alert('Wrong container ID sent!');
            return;
        }

        activeGames.push({//pushing variables and events necessary for functions
                player: 1,
                niz: {
                    a: ["0", "1", "2"],
                    b: ["3", "4", "5"],
                    c: ["6", "7", "8"]
                },
                fields: {},
                semaphore: '',
                semaphore1: '',
                reset: ''
        });

        gameID = activeGames.length - 1;//how meny games is possible

        container.innerHTML = gameTemplate.replace(/{{gameID}}/g, gameID);

        for (var i = 1; i <= 9; i++) {
            activeGames[gameID].fields[i] = document.getElementById("field"+i+"-" + gameID);
            activeGames[gameID].fields[i].addEventListener('click', selection);
            activeGames[gameID].semaphore = document.getElementById("semaphore-" + gameID);
            activeGames[gameID].semaphore1 = document.getElementById("semaphore1-" + gameID);
            activeGames[gameID].reset = document.getElementById("reset-" + gameID);
            activeGames[gameID].reset.addEventListener('click', reset);
        }
    };

    return API;
}());