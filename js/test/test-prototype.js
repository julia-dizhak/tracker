'use strict';

function Car(brand, color) {
  this.brand = brand;
  this.color = color;
  
  //this.getDescription = function() {
  //  return 'I am' + ' ' + color + ' ' + brand;
  //}
}

//var car = new Car('BMW', 'black');

//console.log(car.brand);
//console.log(car.color);

//

function SportCar(brand, color, maxSpeed) {
  Car.call(this, brand, color);
  this.maxSpeed = maxSpeed;
}

SportCar.prototype = new Car('','');

var car = new SportCar('Bugatti', 'white', 350);


console.log(car.brand);
console.log(car.color);
console.log(car.getDescription() );

//prototype

Object.prototype.someFunc = function(){
  return 'lalalalal';
}

var obj = {};
alert(obj.someFunc());

