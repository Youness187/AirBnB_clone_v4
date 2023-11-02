// script that add class available to div#api_status based on the status code if it is "OK"
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

  $.get('http://localhost:5001/api/v1/status', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
});
