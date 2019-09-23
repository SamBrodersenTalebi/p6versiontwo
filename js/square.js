import { Player } from "./player.js";
import { Weapon } from "./weapon.js";
import { TheBoard } from "./board.js";

export class Square{
  static GetPlayerLocation(name){
      //get the id of the td with the player inside
      let tdId =  $("#"+name, TheBoard.elem).parent().attr('id');
      //use number method to turn string into number
      let r = Number(tdId[0]);
      let c = Number(tdId[2]);
      //return the row and column
      return { row: r, column: c };
  }

  constructor(id){
    this.id = id;
    this._blocked = false;
    this._player = null;
    this._weapon = null;
    //this._highlight = false;
  }

  // ------------------------------------------------------------------------
  // GETTER AND SETTER
  // ------------------------------------------------------------------------

  // Getter is called when trying to read a property
  get blocked(){
    return this._blocked;
  }

  //Setter is called when trying to update a property
  set blocked(boolean){
    //Update model
    this._blocked = boolean;
    //Update view
    let td = $('#'+this.id, TheBoard.elem);
    if(boolean){
      $(td).addClass('blocked');
    } else{
      $(td).removeClass('blocked');
    }
  }

  get weapon(){
    return this._weapon;
  }

  set weapon(object){
    //update model
    this._weapon = object;

    let td = $('#'+this.id, TheBoard.elem);
    let child2 = $(td).children()[1];  // returns an HTML elem //the second argument tells it to search inside of the context of the table element
    if(this._weapon === null){
      $(child2).replaceWith("<div>")
    } else{
      // set weapon
      $(child2).replaceWith(object.elem);  // calls jQuery’s replaceWith() method
    }
  }


  unhighlight(){
    //this._highlight = boolean;
    //remove clickhandler and class highlight
    $('#'+this.id, TheBoard.elem).removeClass('highlight').off();
  }

  highlight(handler){
    //this._highlight = boolean;
    let elem = $('#'+this.id, TheBoard.elem);
    elem.addClass('highlight').click(handler);
  }

  get player(){
    return this._player;
  }


  setPlayer(p){
    //Update model
    this._player = p;

    //Update view
    let td = $('#'+this.id, TheBoard.elem);
    let child1 = $(td).children()[0]
    $(child1).replaceWith(p.elem);

  }

  removePlayer(){
    //select player and update Model
    let p = this._player;
    this._player = null;

    //update View
    let td = $('#'+this.id);
    let child1 = $(td).children()[0]
    $(child1).replaceWith("<div>");
    return p;
  }
}
