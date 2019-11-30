$(function () {
  $("input").on("change", function(event) {
    var $categories = $(":checkbox");

    $categories.each(function(i) {
      var filter   = $categories[i];
      var checked  = filter.checked;
      var category = $(filter).val();
      var $categoryGames = $(`main li[data-console='${category}']`);
      $categoryGames.toggle(checked);
    });
  });
});
