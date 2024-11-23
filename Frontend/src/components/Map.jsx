import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

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
  const [googleMaps, setGoogleMaps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <p className="text-red-500">Google Maps API Key is missing!</p>;
  }

  useEffect(() => {
    const fetchTrashLocations = async () => {
      try {
        const response = await fetch('http://localhost:3001/TempatSampah'); // Ganti dengan endpoint API Anda
        if (!response.ok) {
          throw new Error('Failed to fetch trash locations');
        }
        const data = await response.json();
        setMarkers(data); // Simpan data tempat sampah ke state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrashLocations(); // Ambil data dari API saat komponen dimuat
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedPlace(marker); // Menyimpan data tempat sampah yang diklik
  };

  const trashIcon = googleMaps
    ? {
        url: "https://cdn-icons-png.flaticon.com/512/2891/2891491.png",
        scaledSize: new googleMaps.maps.Size(30, 30),
      }
    : null;

  const onMapLoad = (map) => {
    setGoogleMaps(window.google);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading map data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

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
            onLoad={onMapLoad}
          >
            {/* Tambahkan marker dengan custom icon */}
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                icon={trashIcon}
                onClick={() => handleMarkerClick(marker)} // Tangani klik marker
              />
            ))}

            {/* Tampilkan InfoWindow jika ada tempat yang dipilih */}
            {selectedPlace && (
              <InfoWindow
                position={{
                  lat: selectedPlace.latitude,
                  lng: selectedPlace.longitude,
                }}
                onCloseClick={() => setSelectedPlace(null)} // Tutup InfoWindow
              >
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">{selectedPlace.nama}</h3>
                  <p>
                    <strong>Fakultas:</strong> {selectedPlace.fakultas}
                  </p>
                  <p>
                    <strong>Jenis:</strong> {selectedPlace.jenis}
                  </p>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => navigate(`/detail/${selectedPlace.id}`)} // Navigasi ke halaman detail
                  >
                    See Details
                  </button>
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
