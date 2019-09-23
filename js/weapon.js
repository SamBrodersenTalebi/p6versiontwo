export class Weapon{
  constructor(name, filename, damage){
    this.name = name;
    this._weapon = filename;
    this._damage = damage;
    this.elem = this._createView();
  }

  _createView(){
    let elem = $('<div>').addClass("weapon");
    $(elem).css("background-image", "url(images/" + this._weapon + ")");
    return elem;
  }


  /*
  get name(){
    return this.name;
  }
  */


  get damage(){
    return this._damage;
  }

}
