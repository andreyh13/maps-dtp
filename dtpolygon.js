window.com = window.com || {};
window.com.xomena = window.com.xomena || {};
window.com.xomena.dtPolygon = (function () {

  // Instance stores a reference to the Singleton
  var instance;
  var marker;
  var circle;
  var tmpMarkers = [];

  function init (map) {
    // Singleton

    // Private methods and variables
    var m_map = map;
    var m_opt = {
        show_point: true,
        show_circle: false,
        show_circle_points: false,
        show_snapped_points: false,
        center_map: true,
        quality: "middle"
    };

    function showPoint (latlng) {
        marker = new google.maps.Marker({
            position: latlng,
            map: m_map,
            title: 'Start point',
            visible: m_opt.show_point
        });

        if (m_opt.center_map) {
            m_map.setCenter(latlng);
        }
    }

    function getPointsOnCircle(latlng, speed, time) {
        var m_radius = speed * time * 1000;
        circle = new google.maps.Circle({
            center: latlng,
            clickable: false,
            map: m_map,
            radius: m_radius,
            strokeColor: '#E91E63',
            strokeWeight: 2,
            visible: m_opt.show_circle
        });

        var head_step, m_dist;
        switch (m_opt.quality) {
            case "low":
              m_dist = 500;
              break;
            case "middle":
              m_dist = 250;
              break;
            case "hight":
              m_dist = 100;
              break;
            default:
              m_dist = 250;
              break;
        }

        var num_p = Math.round(2 * Math.PI * m_radius / m_dist);
        head_step = Math.round(360.0 / num_p);
        if (head_step < 1) {
            head_step = 1;
        }

        var heading = 0, points = [];
        var bounds = new google.maps.LatLngBounds();
        while (heading <= 360) {
            var p = google.maps.geometry.spherical.computeOffset(latlng, m_radius, heading);
            points.push(p);
            bounds.extend(p);
            if (m_opt.show_circle_points) {
                var m = new google.maps.Marker({
                  position: p,
                  map: m_map,
                  title: 'Point ' + heading / head_step,
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#BF360C'
                  }
                });
                tmpMarkers.push(m);
            }
            heading += head_step;
        }
        m_map.fitBounds(bounds);
        return points;
    }

    return {
      // Public methods and variables
      setMap: function (map) {
          m_map = map;
      },

      setOptions: function (opt) {
          m_opt.show_point = opt.show_point || m_opt.show_point;
          m_opt.show_circle = opt.show_circle || m_opt.show_circle;
          m_opt.center_map = opt.center_map || m_opt.center_map;
          m_opt.quality = opt.quality || m_opt.quality;
          m_opt.show_circle_points = opt.show_circle_points || m_opt.show_circle_points;
          m_opt.show_snapped_points = opt.show_snapped_points || m_opt.show_snapped_points;
      },
      buildPolygon: function(latlng, speed, time) {
          if (m_map) {
              showPoint(latlng);
              var points = getPointsOnCircle(latlng, speed, time);
          }
      },
      clearMap: function () {
          if (marker) {
              marker.setMap(null);
              marker = null;
          }
          if (circle) {
              circle.setMap(null);
              circle = null;
          }
          if (tmpMarkers.length) {
              tmpMarkers.forEach(function (m) {
                  m.setMap(null);
                  m = null;
              });
              tmpMarkers = [];
          }
      }

    };

  };

  return {
    getInstance: function (map) {

      if ( !instance ) {
        instance = init(map);
      }

      return instance;
    }
  };

})();
