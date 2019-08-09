import { Player } from "./player.js";
import { Weapon } from "./weapon.js";
import { ScoreBoard } from "./scoreboard.js";
import { Square } from "./square.js";
export class Board{
  constructor(size){
    this.size = size;
    this.elem = this._createView(); //html elem
    this.model = this._createModel(); //array that contains all square instances for all cells
    this.players = this._createPlayers(); // two player objects contained in array
    //this.scoreBoard = new ScoreInfo(this.players);
    this.blockedsquares();
    this.weaponsquares();
    //this.addPlayer();
    //console.table(this.model)
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
        model[row].push(new Square(id, this.elem)); // push a new square for each column to the current row
      }
    }
    return model;
  }

  // ------------------------------------------------------------------------
  // Squares
  // ------------------------------------------------------------------------
  getSquareWithPlayer(active){
    //DELETE NAME ARGUMENT!
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
    return this.model[row][column]
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


}
