import React, { useEffect } from 'react';
import "./style.css";
import mapboxgl from 'mapbox-gl';

const MapLocation = ({ lat, lon, isLang }) => {
  let mapStreets, mapLight, mapDark, mapOutdoors, mapSatellite, mapLat, mapLong;
  if (isLang === "ru") {
    mapStreets = "улицы"; mapLight = "светлая"; mapDark = "темная";
    mapOutdoors = "снаружи"; mapSatellite = "спутник"; mapLat = "широта"; mapLong = "долгота"
  }
  if (isLang === "en") {
    mapStreets = "streets"; mapLight = "light"; mapDark = "dark";
    mapOutdoors = "outdoors"; mapSatellite = "satellite"; mapLat = "latitude"; mapLong = "longitude"
  }
  if (isLang === "be") {
    mapStreets = "вуліцы"; mapLight = "светлая"; mapDark = "цёмная";
    mapOutdoors = "звонку"; mapSatellite = "спутнік"; mapLat = "шырата"; mapLong = "даўгата"
  }

  let latDeg, latMas, latMin, lonDeg, lonMas, lonMin;
  latMas = String(lat).split(".");
  latDeg = latMas[0];
  latMin = latMas[1];
  lonMas = String(lon).split(".");
  lonDeg = lonMas[0];
  lonMin = lonMas[1];

  useEffect(() => {
    if (lat && lon) {
      mapboxgl.accessToken = 'pk.eyJ1Ijoia29zdHlheWFraW1vdmljaCIsImEiOiJja2FpaDRjdDEwMG9lMnNwMXF4MXdxbWZkIn0.30qA4nNgSMfXSm2En9vBqA';
      let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: 8
      });
      var layerList = document.getElementById('menu');
      var inputs = layerList.getElementsByTagName('input');

      function switchLayer(layer) {
        var layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
      }

      for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
      }

      new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);
    }

  }, [lat, lon]);
  return (

    <div className="map-location">
      <div className="map-container">
        <div className="map" id="map"></div>
        <div id="menu">
          <div className="map-theme"><input
            id="streets-v11"
            type="radio"
            name="rtoggle"
            value="streets"
            defaultChecked
          />
            <label htmlFor="streets-v11" >{mapStreets}</label></div>
          <div className="map-theme"><input id="light-v10" type="radio" name="rtoggle" value="light" />
            <label htmlFor="light-v10">{mapLight}</label></div>
          <div className="map-theme"><input id="dark-v10" type="radio" name="rtoggle" value="dark" />
            <label htmlFor="dark-v10">{mapDark}</label></div>
          <div className="map-theme"><input id="outdoors-v11" type="radio" name="rtoggle" value="outdoors" />
            <label htmlFor="outdoors-v11">{mapOutdoors}</label></div>
          <div className="map-theme"><input id="satellite-v9" type="radio" name="rtoggle" value="satellite" />
            <label htmlFor="satellite-v9">{mapSatellite}</label></div>
        </div></div>
      <div className="map-param">
        <p className="latitude">{mapLat}: {latDeg}&deg;{latMin}&prime;</p>
        <p className="longitude">{mapLong}: {lonDeg}&deg;{lonMin}&prime;</p>
      </div>
    </div>
  );
};

export default MapLocation;