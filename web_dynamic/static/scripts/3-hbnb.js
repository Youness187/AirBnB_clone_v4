// JS
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

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $.each(data, function (i, place) {
        const guests = place.max_guest > 1 ? 's' : '';
        const rooms = place.number_rooms > 1 ? 's' : '';
        const bathrooms = place.bathrooms > 1 ? 's' : '';
        $('.places').append(
          '<article><div class="title_box"><h2>' +
						place.name +
						'</h2><div class="price_by_night">' +
						place.price_by_night +
						'</div></div><div class="information"><div class="max_guest">' +
						place.max_guest +
						' Guest' +
						guests +
						'</div><div class="number_rooms">' +
						place.number_rooms +
						' Bedroom' +
						rooms +
						'</div><div class="number_bathrooms">' +
						place.number_bathrooms +
						' Bathroom' +
						bathrooms +
						'</div></div><div class="description">' +
						place.description +
						'</div></article>'
        );
      });
    }
  });
});
