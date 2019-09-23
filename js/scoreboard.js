import { Player } from "./player.js";

export class ScoreBoard{
  constructor(players){
    this.players = players;
    this.updateScoreBoard(this.players);
  }

  updateScoreBoard(players){
    let elem = $('#name').children()[0];
    $(elem).text(this.players[0].name);
    let elem2 = $('#name').children()[2]
    $(elem2).text(this.players[1].name);

    if(players[0].active === true){
      $('#active').text(players[0].name)
    } else{
      $('#active').text(players[1].name)
    }

    let life = $('#life').children()[0];
    $(life).text(players[0].life);
    let life2 = $('#life').children()[2];
    $(life2).text(players[1].life);


    let weapon = $('#weapon').children()[0];
    $(weapon).text(players[0].weapon.name);
    let weapon2 = $('#weapon').children()[2]
    $(weapon2).text(players[1].weapon.name);

    let damage = $('#damage').children()[0];
    $(damage).text(players[0].weapon.damage);
    let damage2 = $('#damage').children()[2]
    $(damage2).text(players[1].weapon.damage);
  }
}
