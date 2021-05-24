export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmJhbGxyYWluMDciLCJhIjoiY2tvbnNocXFoMDRsNDJ2cGlkbTRldTAxdyJ9.31o5DaR97zxBSi-kl1j0Rw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/bballrain07/ckonxzb330n7j19oa0scmna7l',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 9,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add pop up
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // extends the map bounds to include current location
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
