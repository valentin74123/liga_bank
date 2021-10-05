import React from 'react';
import {YMaps, GeolocationControl, Map, Placemark, ZoomControl} from 'react-yandex-maps';
import {PINS} from '../../const';

const MapSection = () => {
  return (
    <YMaps>
      <section className="map-section" id="map-section">
        <div className="map-section__wrapper">
          <h2 className="map-section__title">Отделения Лига Банка</h2>

          <div className="map-section__map-wrapper">
            <Map className="map-section__map"
              state={{
                center: [56.938011, 59.597474],
                zoom: 5,
              }}
            >
              <ZoomControl
                options={{
                  size: `small`,
                  position: {
                    top: 200,
                    right: 10,
                  },
                }}
              />

              <GeolocationControl
                options={{
                  position: {
                    top: 280,
                    right: 10,
                  },
                }}
              />

              {PINS.map(({id, coords}) => (
                <Placemark
                  key={id}
                  defaultGeometry={coords}
                  options={{
                    iconLayout: `default#image`,
                    iconImageHref: `./img/map-pin.svg`,
                    iconImageSize: [35, 40],
                    iconImageOffset: [-17, -40]}}
                />
              ))}
            </Map>
          </div>
        </div>
      </section>
    </YMaps>
  );
};

export default MapSection;
