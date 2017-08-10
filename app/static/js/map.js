function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 38.902572, lng: -77.038486}
    });
    var infoWindow = new google.maps.InfoWindow;
    var markers = [];

    d3.json("/api/stations", function (data) {
    	data.forEach(function(d) {
    	    var latlng = new google.maps.LatLng(d.latitude, d.longitude);
    	    var marker = new google.maps.Marker({position: latlng})
            var info_window_content = '<div><b>' + d.name + '</d></div>';

    	    marker.addListener('click', function() {
                infoWindow.setContent(info_window_content);
                infoWindow.open(map, marker);
              });
    	    markers.push(marker);
    	});

    	var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

	});
}

