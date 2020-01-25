function Thermostat(){
    this.temperature = 20;
    this.powerSaveMode = true;
    this.usage = "mid-usage";
  };

  Thermostat.prototype.postTemp = function() {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: {temp: this.temperature},
      url: 'http://localhost:4567/temperature',
      success: function(data){
        this.temperature = data.temp;
        $('#temperature').text(this.temperature);
  
      },
      error: function(){
        alert('Error loading temp');
      }
    });
  }

  Thermostat.prototype.getCurrentTemperature = function() {
    return this.temperature;
  };
  Thermostat.prototype.up = function() {
    if (this.powerSaveMode === true && this.temperature === 25){
      return this.temperature;
    }
    else if (this.powerSaveMode === false && this.temperature === 32){
      return this.temperature;
    }
    else {
      this.temperature += 1
      this.energyUsage()
      
      this.postTemp()

    };
    
  };
  Thermostat.prototype.down = function() {
    if (this.temperature === 10) {
      return this.temperature
    } else {
      this.temperature -= 1
      this.energyUsage()
      this.postTemp()
    }
  };
  Thermostat.prototype.powerSaveSwitch = function() {
    this.powerSaveMode = !this.powerSaveMode
  };
  Thermostat.prototype.resetTemp = function() {
    return this.temperature = 20;
  };
  Thermostat.prototype.energyUsage = function() {
    if (this.temperature < 18){
      return this.usage = 'low-usage';
    } 
    else if (this.temperature > 17 && this.temperature < 25){
      return this.usage = 'mid-usage';
    }
    else {
      return this.usage = 'high-usage';
    }
  };

  $(document).ready(function() {
    var thermostat = new Thermostat()
    $('#temperature').text(thermostat.temperature)

    $('#up').on('click', function() {
      thermostat.up()
      $('#temperature').text(thermostat.temperature)
      $('#usage').text(thermostat.usage)
      if (thermostat.usage === "low-usage") {
        $('#usage').css('color', 'green')
      } else if (thermostat.usage === "high-usage") {
        $('#usage').css('color', 'red')
      } else {
        $('#usage').css('color', 'black')
      }
    })

    $('#down').on('click', function() {
        thermostat.down()
        $('#temperature').text(thermostat.temperature)
        $('#usage').text(thermostat.usage)
        if (thermostat.usage === "low-usage") {
          $('#usage').css('color', 'green')
        } else if (thermostat.usage === "high-usage") {
          $('#usage').css('color', 'red')
        } else {
          $('#usage').css('color', 'black')
        }
    })
    
    $('#reset').on('click', function() {
      thermostat.resetTemp()
      thermostat.postTemp()
    $('#temperature').text(thermostat.temperature)
    })

    if (thermostat.powerSaveMode === true) {
        $('#psm').css('color', 'green')
        } else {
        $('#psm').css('color', 'red')
        }

    $('#psm').on('click', function() {
      thermostat.powerSaveSwitch()
      if (thermostat.powerSaveMode === true) {
      $('#psm').css('color', 'green')
      } else {
      $('#psm').css('color', 'red')
      }
    })

    $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    $('#outside-tmp').text(data.main.temp);
    })

    $('#select-city').submit(function(event) {
        event.preventDefault();
        var city = $('#current-city').val();
        $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
          $('#outside-tmp').text(data.main.temp);
          $('#here').text(data.name);
        })
      })

      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://localhost:4567/temperature',
        success: function(data){
          thermostat.temperature = data.temp;
          $('#temperature').text(thermostat.temperature);
    
        },
        error: function(){
          alert('Error loading temp');
        }
      });

      

  });
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