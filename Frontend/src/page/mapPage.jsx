import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Map from '../components/Map';
import style from '../style';

const MapPage = () => {
  return (
    <div className="bg-primary min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="pt-9">
        <Navbar />
      </div>

      {/* Konten Utama */}
      <div className={`flex-grow flex flex-col items-center justify-center ${style.flexStart}`}>
        <div className={`${style.boxWidth} w-full`}>
          <Map />
        </div>
      </div>

      {/* Footer */}
      <div className={`bg-primary ${style.paddingX} ${style.flexCenter} flex-col mt-auto w-full`}>
        <div className={`${style.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
