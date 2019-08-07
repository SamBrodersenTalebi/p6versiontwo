import { Board } from "./board.js";
export class App{
  constructor(boardSize){
    this.board = null; //board object
    this.elem = null //app <div>

    //method
    this._initBoard(boardSize);
  }

  _initBoard(boardSize){
    //create board object
    this.board = new Board(boardSize);

    // Create  app <div> and append board element
    this.elem = $('<div>').attr('id', 'board-app').append(this.board.elem);

    //append app <div> to the div inside of the html document
    $('#table').append(this.elem);
  }
}
