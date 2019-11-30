$(function() {
  $("form").on("submit", function(event) {
    event.preventDefault();

    var $item;
    var itemName = $("#item").val();
    var quantity = Number($("#qnty")[0].value);

    if (!itemName) {
      alert('item must have a name');
      return;
    } else if (!quantity) {
      quantity = 1;
    }

    $item = $(`<li>${quantity} ${itemName}</li>`);

    if ($("ul").children().length > 0) {
      $item.addClass("separated-item");
    }

    $item.appendTo("ul");
    document.getElementById("item-creation-form").reset();
  });

});