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
    <div className="min-h-screen bg-primary p-8">
      
      <h1 className="font-poppins text-center text-[55px] justify-center mb-12">
        <span className="text-white font-bold text-[55px]">Daftar Tempat Sampah</span><br></br>
      </h1>
      {/* <h2 className="font-poppins text-center text-[20px] justify-center -mt-12 mb-8">
        <span className="text-white text-[20px] font-semibold">Universitas Indonesia</span>
      </h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
        {tempatSampah.map((tempat) => (
          <div
            key={tempat.id}
            className="bg-primary border-white-100 border-solid border-2 p-6 rounded-lg shadow-md hover:shadow-white hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            {/* Konten di tengah card */}
            <div className="flex-grow flex flex-col justify-center items-center text-center">
              <h2 className="font-poppins text-white text-xl font-semibold mb-2">{tempat.nama}</h2>
              <p className="text-gray-400"> Fakultas {tempat.fakultas}</p>
            </div>
  
            {/* Tombol di bagian bawah */}
            <div className="mt-4">
              <button
                onClick={() => handleViewChart(tempat.id)}
                className="w-full py-2 text-black rounded-lg bg-button hover:font-bold"
              >
                See more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default TempatSampahList;
