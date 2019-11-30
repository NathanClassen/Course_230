$(function() {
  var index = 0;
  $("ul img").on("click", function() {
    $($("figure")[index]).stop().fadeOut(300);

    index = $(this).parent().index();
    $($("figure")[index]).stop().delay(300).fadeIn();

    $("ul img[class='focus']").removeClass("focus");
    $(this).addClass("focus");
  });
});