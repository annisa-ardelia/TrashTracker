import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TempatSampahList = () => {
  const [tempatSampah, setTempatSampah] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTempatSampah = async () => {
      try {
        const response = await fetch('http://localhost:3001/TempatSampah');
        const data = await response.json();
        setTempatSampah(data); // Menyimpan data tempat sampah dalam state
      } catch (error) {
        console.error('Error fetching tempat sampah:', error);
      }
    };

    fetchTempatSampah();
  }, []); // Mengambil data hanya sekali ketika komponen pertama kali dirender

  // Fungsi untuk menangani klik button menuju page grafik
  const handleViewChart = (id) => {
    navigate(`/sampah/${id}`); // Navigasi ke halaman grafik dengan id tempat sampah
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center text-3xl font-semibold mb-8">Daftar Tempat Sampah</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {tempatSampah.map((tempat) => (
          <div
            key={tempat.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">No. {tempat.id}</h2>
            <p className="text-gray-700"><strong>Nama:</strong> {tempat.nama}</p>
            <p className="text-gray-700"><strong>Fakultas:</strong> {tempat.fakultas}</p>
            <div className="mt-4">
              <button
                onClick={() => handleViewChart(tempat.id)}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Lihat Grafik
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempatSampahList;
