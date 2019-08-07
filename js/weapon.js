class Weapon{
  constructor(weapon, damage){
    this._weapon = weapon;
    this._damage = damage;
    this.element = this.createView();
  }

  createView(){
    let elem = $('<div>').attr('class', 'weapon').text(this.weapon);
    return elem
  }

  get weapon(){
    return this._weapon;
  }

  get damage(){
    return this._damage;
  }

}
