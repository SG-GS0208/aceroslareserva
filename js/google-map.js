var google;

function init() {
    // Coordenadas de Lurigancho-Chosica, Lima
    var myLatlng = new google.maps.LatLng(-11.9431, -76.7094);

    var mapOptions = {
        zoom: 14, // Ajusta el nivel de zoom
        center: myLatlng,
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    { "visibility": "simplified" },
                    { "hue": "#ff0000" }
                ]
            }
        ]
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);

    // Agregar un marcador en Lurigancho-Chosica
    new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Lurigancho-Chosica, Lima",
        icon: 'images/loc.png'
    });

    // Lista de direcciones (puedes agregar más)
    var addresses = ['Lurigancho-Chosica, Lima, Peru'];

    for (var x = 0; x < addresses.length; x++) {
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json', {
            address: addresses[x],
            key: 'TU_CLAVE_DE_API_AQUI' // Usa tu clave válida
        }, function (data) {
            if (data.status === "OK" && data.results.length > 0) {
                var p = data.results[0].geometry.location;
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'images/loc.png'
                });
            } else {
                console.error("No se encontraron resultados para la dirección: " + addresses[x]);
            }
        });
    }
}

// Cargar el mapa cuando la ventana termine de cargar
google.maps.event.addDomListener(window, 'load', init);
