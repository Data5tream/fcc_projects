$(function() {
  var act = "";
  var res = 0;

  function calculate() {
    var re = /[\d.]+/g;
    var rer = /[^\d.]/g;
    var numbers = []
    var operators = []
    while ((m = re.exec(act)) !== null) {
      if (m.index === re.lastIndex) {
          re.lastIndex++;
      }
      m.forEach((match, groupIndex) => {
        numbers.push(parseFloat(match));
      });
    }
    while ((m = rer.exec(act)) !== null) {
      if (m.index === rer.lastIndex) {
          rer.lastIndex++;
      }
      m.forEach((match, groupIndex) => {
        operators.push(match);
      });
    }
    if (numbers.length <= 1 && operators.length == 0) {
      if (numbers.length == 0) {
        $('#res').text("0");
        $('#act').text("0")
      } else {
        $('#res').text(numbers[0]);
      }
      act = "";
      res = 0;
    }else if (numbers.length != operators.length+1 || operators.length < 1) {
      alert("Invalid query!");
    } else {
      if (operators[0] == "/") {
        res = numbers[0]/numbers[1];
      } else if (operators[0] == "*") {
        res = numbers[0]*numbers[1];
      } else if (operators[0] == "+") {
        res = numbers[0]+numbers[1];
      } else if (operators[0] == "-") {
        res = numbers[0]-numbers[1];
      }
      for (var i=1; i < operators.length; i++) {
        if (operators[i] == "/") {
          res = res/numbers[i+1];
        } else if (operators[i] == "*") {
          res = res*numbers[i+1];
        } else if (operators[i] == "+") {
          res = res+numbers[i+1];
        } else if (operators[i] == "-") {
          res = res-numbers[i+1];
        }
      }
      $('#res').text(res);
      act = "";
      res = 0;
    }
  }

  function getInput(input) {
    if (input == "=") {
      calculate();
    } else if (input == "ce") {
      act = "";
      $('#act').text("0");
    } else if (input == "ac") {
      act = "";
      res = 0;
      $('#act').text("0");
      $('#res').text("0");
    } else {
      if (act == "") {
        $('#act').text("");
      }
      act += input;
      $('#act').text(act);
    }

  }

  $(document).keyup(function(event) {
    var inp = Number(event.which);
    if (inp >= 48 && inp <= 57) {
      getInput('' +inp-48);
      console.log("FUCK");
    } else if (inp >= 96 && inp <= 105) {
      getInput('' +inp-96);
    } else if (inp == 106) {
      getInput("*");
    } else if (inp == 107) {
      getInput("+");
    } else if (inp == 109) {
      getInput("-");
    } else if (inp == 111) {
      getInput("/");
    } else if (inp == 13) {
      calculate();
    }
  });

  $('button').click(function() {
    getInput($(this).attr('value'));
  });
});
