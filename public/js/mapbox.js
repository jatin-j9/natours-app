export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiamF0aW4wOSIsImEiOiJjbHd0YmRoc3kwMjJlMmpwZzN4eWluaWlpIn0.q0QTl14P6OO3rYtY5fHp-w';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jatin09/clwthg3ce011d01pcfhup6psd',
    scrollZoom: false,
    // center: [-118.113491, 34.11175],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add pop-up
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
