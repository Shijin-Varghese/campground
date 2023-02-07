var map = new maplibregl.Map({
    container: 'map',
    center: campground.geometry.coordinates,
    zoom: 13,
    // we replaced style_object by https://demotiles.maplibre.org/style.json
    style: 'https://demotiles.maplibre.org/style.json',
    hash: true,
    });
    
    new maplibregl.Marker({
    color: "#FFFFAF",
    draggable: true
    }).setLngLat(campground.geometry.coordinates)
    .addTo(map);
    