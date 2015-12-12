(function(){
    var map;
    var m_location = new google.maps.LatLng(41.4041408,2.1914985);

    function initialize() {
      var mapOptions = {
        zoom: 15,
        center: m_location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);



      var input = document.getElementById('address');
      var autocomplete = new google.maps.places.Autocomplete(input);

      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          return;
        }

        m_location = place.geometry.location;
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
        }
      });
    }

    function buildPoly () {
        var speed = parseInt(document.getElementById("speed").value);
        var time = parseFloat(document.getElementById("time").value);
        var quality = document.getElementById("quality").value;

        if (map) {
            dtPoly = com.xomena.dtPolygon.getInstance(map);
            dtPoly.setOptions({
                quality: quality
            });
            dtPoly.buildPolygon(m_location, speed, time);
        }
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    google.maps.event.addDomListener(document.getElementById("searchbtn"), 'click', buildPoly);

})();
