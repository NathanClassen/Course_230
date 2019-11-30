$(function() {
  $("button").on("click", function() {
    var color = $(this).text();

    $(`article[data-color='${color}']`).slideToggle();

    

  });
});