import { Player } from "./player.js";
import { Weapon } from "./weapon.js";
import { ScoreBoard } from "./scoreboard.js";
import { Square } from "./square.js";

export var TheBoard = null;

export class Board{
  constructor(size){
    this.size = size;
    this.elem = this._createView(); //html elem
    this.model = this._createModel(); //array that contains all square instances for all cells
    this.players = this._createPlayers(); // two player objects contained in array
    TheBoard = this;
    //this.scoreBoard = new ScoreInfo(this.players);
    this.blockedsquares();
    this.weaponsquares();
    this.addPlayer();
    this.initMove();
    //$('#table').on('click', movePlayer());
    //console.table(this.model)
    //console.log(this.model)
  }

  // ------------------------------------------------------------------------
  // Model and View methods
  // ------------------------------------------------------------------------

  _createPlayers(){
    let p1 = new Player('Sam', true);
    let p2 = new Player('Jeff', false);
    let players = [p1,p2]
    return players;
  }

  _createView(){
    let tableElem = $('<table>');

    for (let row = 0; row < this.size; row++){
      //create tr for each row
      let trElem = $('<tr>')

      for (let column = 0; column < this.size; column++){
        let id = `${row}_${column}`;
        //append <td> to <tr> and add id to each cell
        let tdElem = $('<td>').attr('id',id).appendTo(trElem);
        for (let i = 0; i < 2; i++){
          $('<div>').appendTo(tdElem);
        }
      }
      $(tableElem).append(trElem);
    }
    return tableElem;
  }

  _createModel(){
    let model = [];

    for(let row = 0; row < this.size; row++){
      model.push([]) // will push a [] for each row

      for(let column = 0; column < this.size; column++){
        let id = `${row}_${column}`;
        model[row].push(new Square(id)); // push a new square for each column to the current row
      }
    }
    return model;
  }

  // ------------------------------------------------------------------------
  // Squares
  // ------------------------------------------------------------------------
  getActivePlayer(boolean){
    let player;
    if(this.player[0].active === boolean){
      player = this.player[0];
    } else{
      player = this.player[1];
    }
    return player;
  }

  getSquareWithPlayer(active){
    let player = this.players[0];
    if(player.active !== active){
      player = this.players[1];
    }
    let location = Square.GetPlayerLocation(player.name);
    //return player from model array
    return this.model[location.row][location.column]

  }

  getRandomSquare(){
    let row = Math.floor(Math.random()*this.size);
    let column = Math.floor(Math.random()*this.size);
    return this.model[row][column];
  }

  //gets a specific square
  getSquare(row, column){
    return this.model[row][column];
  }

  // ------------------------------------------------------------------------
  // add blocked, weapons squares and player
  // ------------------------------------------------------------------------

  blockedsquares(){
    let i = 0;
    // while there is less than five td's that has the class of blocked then run the code
    while (i < 5){
      let randomsquare = this.getRandomSquare();
      //Grabs one random table cell and check if it is blocked
      if(randomsquare.blocked === false){
        // if random td is not blocked set it to blocked and increment i by 1.
        randomsquare.blocked = true;
        i++;
      }
    }
  }

  weaponsquares(){
    //Create weapon object and insert them into a randomsquare.
    let weapons = [new Weapon('Axe', 30), new Weapon('Sword', 20), new Weapon('Knife', 20), new Weapon('Spear', 30)];

    while(weapons.length > 0){
      //Grab one random cell
      let randomsquare = this.getRandomSquare();
      // If the randomsquare has an instance property of weapon set to an empty string then run the code
      if(randomsquare.weapon == null && randomsquare.blocked == false){
        //calls setter
        randomsquare.weapon = weapons.pop();
      }
    }
  }

  addPlayer(){
    let i = 0
    while(i <= 1){
      let randomsquare = this.getRandomSquare();
      if(randomsquare.blocked == false && randomsquare.weapon == null && randomsquare.player == null){
        randomsquare.setPlayer(this.players[i]);
        i++;
      }
    }
  }

  // ------------------------------------------------------------------------
  // EVENT PART TWO
  // ------------------------------------------------------------------------
  initMove(){
    //get square with active player
    let playerSquare = this.getSquareWithPlayer(true);
    //store the squares that a player can move into in an array.
    let validSquares = this.findValidSquares(playerSquare);
    //tells the highlight method what handler to call when there is a click
    // bind() creates a new function that will have this set to the first parameter
    this.highlight(validSquares, Board.prototype.clickHandler.bind(this));
    // UPDATE SCOREBOARD!
    /*
    this.scoreBoard.swictchActivePlayer();
    this.scoreBoard.updatePlayerLifePoints();
    this.scoreBoard.updatePlayerWeapon
    */
    //switch active player when the turn is done
    this.switchPlayer(true);

  }


  findValidSquares(playerSquare){
    let validSquares = [];
    let row = Number(playerSquare.id[0]);
    let column = Number(playerSquare.id[2]);
    //Check Left moves
    for(let i = -1; i >= -3; i--){
      let newRow = row + i;
      if (newRow < 0){
        break;
      }
      let square = this.getSquare(newRow, column)
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
      }
    }
    //Check right moves
    for(let i = 1; i <= 3; i++){
      let newRow = row + i;
      if (newRow > this.size - 1){
        break;
      }
      let square = this.getSquare(newRow, column)
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
      }
    }
    //Check down moves
    for(let j = 1; j <= 3; j++){
      let newColumn = column + j;
      if (newColumn > this.size - 1){
        break;
      }
      let square = this.getSquare(row, newColumn)
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
      }
    }
    //Check up moves
    for(let j = -1; j >= -3; j--){
      let newColumn = column + j;
      if (newColumn < 0){
        break;
      }
      let square = this.getSquare(row, newColumn)
      if(square.blocked == true || square.player !== null ){
        break;
      }
      else{
        validSquares.push(square);
      }
    }
    return validSquares
  }

  highlight(array, handler){
    //add class highlight to objects within validSquares array
    for(let i = 0; i < array.length; i++){
      array[i].highlight(handler);
    }
  }

  clickHandler(event){
    let elem = event.target;
    let id = elem.id;
    let row = Number(id[0]);
    let column = Number(id[2]);
    this.move(row,column);
  }

  unhighlight(array){
    for(let i = 0; i < array.length; i++){
      array[i].unhighlight();
    }
  }

  switchPlayer(boolean){
    // switches the active player
    this.players[0].active = ! this.players[0].active;
    this.players[1].active = ! this.players[1].active;
    if(boolean){
      this.initMove();
    }else{
      this.initFight();
    }
  }

  move(row,column){
    //get square with player
    let playerSquare = this.getSquareWithPlayer(true);
    //remove player from current square
    let player = playerSquare.removePlayer();
    // get the new square
    let square = this.getSquare(row,column);
    // insert player to the new square
    square.setPlayer(player);
    //If a player passes through a weapon it needs to update the weapon of the player
    if(square.weapon !== null){
      //square.weapon accesses the weapon object
      let weaponObject = square.weapon;
      //get the players weapon
      let playerWeapon = player.weapon;
      //updates the players weapon by calling the setter
      player.weapon = weaponObject;
      //replace players weapon with weapon in square
      square.weapon = playerWeapon;
    }
    // ------------------------------------------------------------------------
    // FIGHT PART THREE
    // ------------------------------------------------------------------------
    let fight = false;
    let adjacentSquares = [];
    let rowRight = row+1;
    let rowLeft = row-1;
    let columnDown = column+1;
    let columnUp = column -1;
    if(rowRight > !this.size -1){
      if(this.getSquare(rowRight, column).blocked === false){
        adjacentSquares.push(this.getSquare(rowRight, column));
      }
    }
    if(rowLeft >= 0){
      if(this.getSquare(rowLeft, column).blocked === false){
        adjacentSquares.push(this.getSquare(rowLeft, column));
      }
    }

    if(columnDown > !this.size -1){
      if(this.getSquare(row, columnDown).blocked === false){
        adjacentSquares.push(this.getSquare(row, columnDown));
      }
    }

    if(columnUp >= 0){
      if(this.getSquare(row, columnUp).blocked === false){
        adjacentSquares.push(this.getSquare(row, columnUp));
      }
    }
    //Loop over the adjacentSquares to see if there is a player;
    for(let i=0; i < adjacentSquares.length; i++){
      if(adjacentSquares[i].player !== null){
        fight = true;
        break;
      }
    }
    if(fight){
      this.initFight();
    }

    //PROBLEM DO NOT KNOW THE VALIDSQUARES!
    //this.unhighlight(validSquares);
  }

  initFight(){
    //save the activeplayer
    let activePlayer = this.getActivePlayer(true);

    //Add handler to defend and attack buttons
    this.fightEvent(activePlayer, Board.prototype.fightHandler.bind(this));
    //switchPlayer
    this.switchPlayer(false);
  }

  fightEvent(activePlayer, handler){
    activePlayer.fight(handler);
  }

  fightHandler(event){
    let id = event.target.id;
    this.fight(id);
  }


  fight(id){
    //save the activeplayer
    let activePlayer = this.getActivePlayer(true);
    //save inactivePlayer
    let inactivePlayer = this.getActivePlayer(false);
    if(id == 'attackButton'){
      let damage = activePlayer.weapon.damage;
      if(inactivePlayer.defend == true){
        damage / 2;
      }
      inactivePlayer.life -= damage;
      activePlayer.defend = false;
    }
    if(id == 'defendButton'){
      activePlayer.defend = true;
    }
    //turn off handler;
    this.peace(activePlayer);
  }

  peace(activePlayer){
    activePlayer.peace();
  }

}
