export class Weapon{
  constructor(weapon, damage){
    this._weapon = weapon;
    this._damage = damage;
    this.elem = this._createView();
  }

  _createView(){
    let elem = $('<div>').attr('class', 'weapon').text(this._weapon);
    return elem;
  }

  get weapon(){
    return this._weapon;
  }

  get damage(){
    return this._damage;
  }

}
