////////////////////////////////////////
// Mobile Nav Trigger
////////////////////////////////////////
$('.menu-icon').click(function() {
  if ($(this).hasClass('is-active')) {
    $(this).removeClass('is-active');
  } else {
    // If clicked item not active, add classes
    $(this).addClass('is-active');
  }
});