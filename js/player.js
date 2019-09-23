import { Weapon } from "./weapon.js";
import { TheBoard } from "./board.js";

export class Player{
  constructor(name, boolean){
    this._name = name;
    this._active = boolean;
    this._life = 100;
    this._weapon = new Weapon("Dagger","dagger.png", 10);
    this._defend = false;
    this.elem = this.createView()
  }

  createView(){
    //Create div with an id of player an insert name of player into div
    let elem = $('<div>').attr('id', this._name).attr('class', 'player').text(this._name);
    return elem
  }

  get name(){
    return this._name;
  }

  set name(string){
    this._name = string;
  }

  get active(){
    return this._active
  }

  set active(boolean){
    this._active = boolean;
  }

  get weapon(){
    return this._weapon;
  }

  set weapon(string){
    this._weapon = string;
  }

  set damage(number){
    this._damage = number;
  }

  get defend(){
    return this._defend;
  }

  set defend(boolean){
    this._defend = boolean;
  }

  get life(){
    return this._life;
  }

  set life(number){
    this._life = number;
  }
}
