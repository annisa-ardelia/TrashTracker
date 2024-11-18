// src/components/GoogleMap.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: -6.200000, // Latitude Jakarta
  lng: 106.816666, // Longitude Jakarta
};

const Map = () => {
  // Menggunakan Environment Variable
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Pastikan API Key tersedia
  if (!apiKey) {
    return <p className="text-red-500">Google Maps API Key is missing!</p>;
  }

  return (

    <div className="min-h-screen flex flex-col justify-start">

      <h1 className="font-poppins font-semibold text-white text-center text-[55px] justify-center mb-12 pt-16">
        <span className="text-whitet">Trash Locations</span>
      </h1>

      <div className='flex-grow w-full'>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
            {/* Menambahkan Marker */}
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>

      <h1 className="font-poppins text-white opacity-70 text-12px mb-16">
        <span className="">Powered by Google Maps</span>
      </h1>

    </div>
  );
};

export default Map;
