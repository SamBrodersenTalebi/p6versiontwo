import { Player } from "./player";
export class ScoreBoard{
  constructor(players){
    this.players = players;
    this.name();
    this.swictchActivePlayer();
    this.updatePlayerLifePoints();
    this.updatePlayerWeapon();
  }

  name(){
    $('#name').children()[0].text(this.players[0].name);
    $('#name').children()[1].text(this.players[1].name);
  }

  switchActivePlayer(){
    if(this.players[0].active === true){
      $('#active').text(this.players[0].name)
    } else{
      $('#active').text(this.players[1].name)
    }
  }

  updatePlayerLifePoints(){
    $('#life').children()[0].text(this.players[0].life);
    $('#life').children()[1].text(this.players[1].life);
  }

  updatePlayerWeapon(){
    $('#weapon').children()[0].text(this.players[0].weapon.weapon);
    $('#weapon').children()[1].text(this.players[1].weapon.weapon);
  }
}
