import * as React from 'react';
import GoogleMapReact from 'google-map-react';

import { useThemedStyle } from 'themed-jss/react';
import { PinStyle } from './style';

export type MapProps = {
  apiKey: string;
  center?: {
    lat: number;
    lng: number;
  },
  zoom: number;
};

export type PinProps = {
  lat: number;
  lng: number;
  text: string;
};

export const Pin: React.FC<PinProps> = () => (
  <div className={useThemedStyle(PinStyle)}></div>
);

export const Map: React.FC<MapProps> = ({ apiKey, center, zoom, children }) => (
  <div style={{ height: '80vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={center}
      defaultZoom={zoom}
      // yesIWantToUseGoogleMapApiInternals
      // onGoogleApiLoaded={({ map, maps }) => {
      //   map.fitBounds(maps.LatLngBounds());
      // }}
    >
      {children}
    </GoogleMapReact>
  </div>
);
