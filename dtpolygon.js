window.com = window.com || {};
window.com.xomena = window.com.xomena || {};
window.com.xomena.dtPolygon = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init (map) {
    // Singleton

    // Private methods and variables
    var m_map = map;
    var m_opt = {
        show_point: true,
        center_map: true,
        quality: "middle"
    };

    function showPoint (latlng) {
        var marker = new google.maps.Marker({
          position: latlng,
          map: m_map,
          title: 'Start point'
        });

        if (m_opt.center_map) {
            m_map.setCenter();
        }
    }

    return {
      // Public methods and variables
      setMap: function (map) {
          m_map = map;
      },
      setOptions: function (opt) {
          m_opt.show_point = opt.show_point || m_opt.show_point;
          m_opt.center_map = opt.center_map || m_opt.center_map;
          m_opt.quality = opt.quality || m_opt.quality;
      },
      buildPolygon: function(latlng, speed, time) {
          if (m_map) {
              showPoint(latlng);
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
