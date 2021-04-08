import { countriesData } from './countries';
import 'regenerator-runtime';

function getColorOfConfirmed(c) {
  if (c > 10000000) {
    return '#67000d';
  }
  if (c > 4000000) {
    return '#a50f15';
  }
  if (c > 2000000) {
    return '#cb181d';
  }
  if (c > 700000) {
    return '#ef3b2c';
  }
  if (c > 400000) {
    return '#fb6a4a';
  }
  if (c > 100000) {
    return '#fc9272';
  }
  if (c > 50000) {
    return '#fcbba1';
  }
  if (c > 20000) {
    return '#fee0d2';
  }

  return '#fff5f0';
}

/* function getColorOfRecovered(r) {
  if (r > 10000000) {
    return '#00441b';
  }
  if (r > 4000000) {
    return '#006d2c';
  }
  if (r > 2000000) {
    return '#238b45';
  }
  if (r > 700000) {
    return '#41ae76';
  }
  if (r > 400000) {
    return '#66c2a4';
  }
  if (r > 100000) {
    return '#99d8c9';
  }
  if (r > 50000) {
    return '#ccece6';
  }
  if (r > 20000) {
    return '#e5f5f9';
  }

  return '#f7fcfd';
}

function getColorOfDead(d) {
  if (d > 10000000) {
    return '#000000';
  }
  if (d > 4000000) {
    return '#252525';
  }
  if (d > 2000000) {
    return '#525252';
  }
  if (d > 700000) {
    return '#737373';
  }
  if (d > 400000) {
    return '#969696';
  }
  if (d > 100000) {
    return '#bdbdbd';
  }
  if (d > 50000) {
    return '#d9d9d9';
  }
  if (d > 20000) {
    return '#f0f0f0';
  }
  return '#ffffff';
} */

export function style(feature) {
  return {
    fillColor: getColorOfConfirmed(feature.properties.totalConfirmed),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

function addMapToDOM() {
  const map = L.map('map').setView([51.505, -0.09], 2);
  const tileLayer = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieXVsaWFwcHAiLCJhIjoiY2tpc2x2dm1pMG0zNTJxc2M2bzd0ZWdtaCJ9.tMek0pj1ldoTDzi83tQWhw',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/light-v9',
      tileSize: 512,
      zoomOffset: -1,
    },
  ).addTo(map);

  const legend = L.control({
    position: 'bottomright',
  });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    const grades = [0, 20000, 50000, 100000, 400000, 700000, 2000000, 4000000, 10000000];
    const labels = [];
    let from;
    let to;

    for (let i = 0; i < grades.length; i += 1) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(`<i style="background:${getColorOfConfirmed(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
    }

    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(map);

  const info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML = `<h6>Covid-19 confirmed</h6>${
      props ? `<b>${props.name}</b><br />${props.totalConfirmed} people` : 'Hover over a state'}`;
  };

  info.addTo(map);
  function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }
  let geojson;

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  }

  geojson = L.geoJson(countriesData, {
    style,
    onEachFeature,
  }).addTo(map);
}

export function addDataToTheCountriesData() {
  for (const feature of countriesData.features) {
    const country = feature.properties.name;
    if (localStorage.getItem(country)) {
      const totalConfirmed = JSON.parse(localStorage.getItem(country)).TotalConfirmed;
      feature.properties.totalConfirmed = totalConfirmed;
    }
  }
  addMapToDOM();
}
