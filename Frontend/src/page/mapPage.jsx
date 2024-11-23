import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Map from '../components/Map';
import TempatSampahList from '../components/TempatSampahList';
import style from '../style';

const MapPage = () => {
  return (
    <div className="bg-primary w-full relative pt-9">
      <Navbar />

      {/* Konten Utama */}
      <div className={`flex-grow flex flex-col items-center justify-center ${style.flexStart}`}>
        <div className={`${style.boxWidth} w-full`}>
          <Map />
        </div>
      </div>

      <div className={`flex-grow flex flex-col items-center justify-center ${style.flexStart}`}>
        <div className={`${style.boxWidth} w-full`}>
          <TempatSampahList />
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
