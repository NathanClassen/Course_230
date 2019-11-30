$(function() {
  var $screen = $("#screen");
  var $shapes = $("#screen div");

  function getFormObject($f) {
    var dataObj = {};
    var data    = $f.serializeArray();

    data.forEach(function(obj) {
      var name  = obj.name;
      var value = obj.value;
      dataObj[name] = value;
    });

    return dataObj;
  }

  function createShape(data) {
    var $shape = $("<div></div>");
    formatShape($shape, data);
    return $shape;
  }

  function formatShape($shape, data) {
    $shape.addClass(data.shapeType);
    $shape.css({bottom: data.startY + "px", left: data.startX + "px"});
    $shape.data(data);
  }

  function animate($shape) {
    $shape.stop();
    $shape.animate({
      left: $shape.data("endX"),
      bottom: $shape.data("endY"),
    }, 3500);
  }

  function reverseAnimationOf($shape) {
    $shape.stop();
    $shape.animate({
      left: $shape.data("startX"),
      bottom: $shape.data("startY"),
    }, 3500);
  }

  $("form").on("submit", function(e) {
    e.preventDefault();

    var $f   = $(this);
    var data = getFormObject($f);
    var $shape = createShape(data);

    $($shape).appendTo($("div#screen"));

    $("#screen div").click(function() { $(this).remove() });
  });

  $("#screen div").on("click", function() {
    $(this).remove();
  });

  $("#animate-button").on("click", function(e) {
    e.preventDefault();
    var $shapes = $("#screen div");

    $shapes.each(function(index) {
      var $shape = $($shapes[index]);
      animate($shape);
    });
  });

  $("#stop-button").on("click", function(e) {
    e.preventDefault();
    $("#screen div").stop();
  });

  $("#reverse-button").on("click", function(e) {
    e.preventDefault();
    var $shapes = $("#screen div");

    $shapes.each(function(index) {
      var $shape = $($shapes[index]);
      reverseAnimationOf($shape);
    });
  });

});