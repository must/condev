import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import { MachinesPage } from '../pages/machines';

const AnyReactComponent = ({ lat, lng, text }) => <div>{text}</div>;

export type MapProps = {
  apiKey: string;
  center: {
    lat: number;
    lng: number;
  },
  zoom: number;
};

export const Map = ({ apiKey, center, zoom }: MapProps) => (
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={center}
      defaultZoom={zoom}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => {
        map.fitBounds(maps.LatLngBounds());
      }}
    >
      <AnyReactComponent
        lat={59.955413}
        lng={30.337844}
        text="My Marker"
      />
    </GoogleMapReact>
  </div>
);