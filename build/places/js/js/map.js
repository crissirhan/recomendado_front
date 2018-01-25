function createDetailMap(lat, long, markerImage) {

    var location = new google.maps.LatLng(lat, long);

    var mapCanvas = document.getElementById('detail-map');
    var mapOptions = {
        zoom: 14,
        scrollwheel: false,
        center: location,
        styles: [{
            featureType: "landscape", elementType: "labels", stylers: [{ visibility: "off" }]
        }, {
            featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }]
        }, {
            featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]
        }, {
            featureType: "water", elementType: "labels", stylers: [{ visibility: "off" }]
        }, {
            featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }]
        }, {
            stylers: [{ hue: "#00aaff" }, { saturation: -100 }, { gamma: 2.15 }, { lightness: 12 }]
        }, {
            featureType: "road", elementType: "labels.text.fill", stylers: [{ visibility: "on" }, { lightness: 24 }]
        }, {
            featureType: "road", elementType: "geometry", stylers: [{ lightness: 57 }]
        }]
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: markerImage
    });

}


