function Thermostat(){
  this.temperature = 20;
  this.powerSaveMode = true;
  this.usage = "mid-usage"
};

var thermostat = new Thermostat();

Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.setCurrentTemperature = function(temperature) {
   this.temperature = temperature;
   var el = document.getElementById("temperature-indicator");
   el.innerHTML = this.temperature;
   this.energyUsage()
   return this.temperature;
};

Thermostat.prototype.up = function() {
  if (this.powerSaveMode === true && this.temperature >= 25){
    return this.setCurrentTemperature(25);
  }
  else if (this.powerSaveMode === false && this.temperature >= 32){
    return this.setCurrentTemperature(32);
  }
  else {
    return this.setCurrentTemperature(++this.temperature);
  }


  
};

Thermostat.prototype.down = function() {
  if (this.temperature <= 10) {
    return this.setCurrentTemperature(10);
  } else {
    return this.setCurrentTemperature(--this.temperature)
  }
};

Thermostat.prototype.powerSaveSwitch = function() {
  this.powerSaveMode = !this.powerSaveMode
  var el = document.getElementById("psm");
  el.className = this.powerSaveMode ? "btn mode-on" : "btn mode-off"
};

Thermostat.prototype.resetTemp = function() {
  return this.setCurrentTemperature(20);
};

Thermostat.prototype.energyUsage = function() {
  if (this.temperature < 18){
    this.usage = 'low-usage';
    var el = document.getElementById("usage-indicator");
    el.innerHTML = this.usage
  } 
  else if (this.temperature > 17 && this.temperature < 25){
    this.usage = 'mid-usage';
    var el = document.getElementById("usage-indicator");
    el.innerHTML = this.usage
  }
  else {
    this.usage = 'high-usage';
    var el = document.getElementById("usage-indicator");
    el.innerHTML = this.usage
  }
};


  // if (this.power_save === true)
  //   if (this.temperature === 25){
  //     reutrn this.temperature
  //   }
  //   else if {this.temperature < 25
  //     return this.temperature += 1;
  //   }
  // else if (this.power_save === false)
  //   if (this.temperature === 32){
  //     return this.temperature
  //   }
  //   else {
  //     return this.temperature += 1;
  //   }
// function Thermostat(temp) = {
//   this.temperature = temp;
// };

// Thermostat.prototype.show = function(){
//   return this.temperature;
// };

// var test_thermo = new Thermostat(20);

// test_thermo.temp();
// Thermostat.prototype.temperature = function(){
//   reutrn this.temperature;
// };