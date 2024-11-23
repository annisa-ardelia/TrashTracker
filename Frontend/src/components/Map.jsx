import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: -6.200000, // Latitude Jakarta
  lng: 106.816666, // Longitude Jakarta
};

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [googleMaps, setGoogleMaps] = useState(null); // State to hold google.maps object
  const navigate = useNavigate(); // Inisialisasi navigate

  // Menggunakan Environment Variable untuk API Key
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Pastikan API Key tersedia
  if (!apiKey) {
    return <p className="text-red-500">Google Maps API Key is missing!</p>;
  }

  // Menambahkan lokasi marker sampah
  useEffect(() => {
    // Misalnya, data tempat sampah dapat diambil dari API atau didefinisikan manual
    const trashLocations = [
      { id: 1, lat: -6.200000, lng: 106.816666, name: 'Tempat Sampah 1' },
      { id: 2, lat: -6.210000, lng: 106.820000, name: 'Tempat Sampah 2' },
      { id: 3, lat: -6.190000, lng: 106.805000, name: 'Tempat Sampah 3' },
    ];

    setMarkers(trashLocations);
  }, []);

  // Fungsi untuk menangani klik marker dan navigasi ke halaman detail
  const handleMarkerClick = (marker) => {
    setSelectedPlace(marker);  // Menyimpan tempat yang diklik
    // Navigasi ke halaman detail tempat sampah (misal: /detail/{id})
    navigate(`/detail/${marker.id}`);
  };

  // Custom icon tempat sampah (gunakan URL atau path gambar)
  const trashIcon = googleMaps
    ? {
        url: "https://cdn-icons-png.flaticon.com/512/2891/2891491.png", // Ganti dengan URL atau path gambar tempat sampah
        scaledSize: new googleMaps.maps.Size(30, 30), // Ukuran icon
      }
    : null;

  // Log icon object for debugging
  useEffect(() => {
    if (trashIcon) {
      console.log('Icon Object:', trashIcon);
    }
  }, [trashIcon]);

  // Callback for when the map is loaded
  const onMapLoad = (map) => {
    setGoogleMaps(window.google); // Set googleMaps after the map is loaded
  };

  return (
    <div className="min-h-screen flex flex-col justify-start">
      <h1 className="font-poppins font-semibold text-white text-center text-[55px] justify-center mb-12 pt-16">
        <span className="text-whitet">Trash Locations</span>
      </h1>

      <div className="flex-grow w-full">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onMapLoad} // Handle onMapLoad to get google.maps object
          >
            {/* Menambahkan marker dengan custom icon */}
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={trashIcon}  // Menentukan icon marker
                onClick={() => handleMarkerClick(marker)}  // Menambahkan event handler untuk klik
              />
            ))}

            {/* Menampilkan InfoWindow jika ada tempat yang dipilih */}
            {selectedPlace && (
              <InfoWindow
                position={{
                  lat: selectedPlace.lat,
                  lng: selectedPlace.lng,
                }}
                onCloseClick={() => setSelectedPlace(null)} // Menutup InfoWindow
              >
                <div>
                  <h3 className="text-xl font-semibold">{selectedPlace.name}</h3>
                  <p>Click to see details</p>
                </div>
              </InfoWindow>
            )}
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
