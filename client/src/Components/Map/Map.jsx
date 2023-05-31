import { useMemo } from 'react';
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import './Map.css';

export default function Map(){
    //Default location
    const center = useMemo(() => ({ lat: 10.769527, lng: 106.599430 }), []);

    return (
        <GoogleMap zoom={20} center={center} mapContainerClassName="map-container">
            <MarkerF position={center} />
        </GoogleMap>
    );
}