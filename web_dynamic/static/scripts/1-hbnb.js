// script that listen for changes on each input checkbox tag then update the h4 tag inside the div Amenities with the list of Amenities checked

$(document).ready(function () {
  const amenityIds = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      amenityIds[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityIds[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityIds).join(', '));
  });
});
