$(function() {

  function calculate(x, y, operator) {
    var result;

    switch (operator) {
      case "sum":
        result = (x + y);
        break;
      case "dif":
        result = (x - y);
        break;
      case "pro":
        result = (x * y);
        break;
      case "quo":
        result = (x / y);
        break;
    }

    return result;
  }

  var oprand1 = $("#operand1");
  var oprand2 = $("#operand2");
  var display = $("#display");
  var oprator = $("select").val();

  //oprand1.val("0");
  //oprand2.val("0");


  $("select").on("change", function() {
    oprator = this.value;
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    var result;

    numerator   = Number(oprand1.val());
    denominator = Number(oprand2.val());
    
    result = calculate(numerator, denominator, oprator);

 
    
    $("p").text(result);
  });
});
