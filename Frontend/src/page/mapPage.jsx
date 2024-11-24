import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Map from '../components/Map';
import TempatSampahList from '../components/TempatSampahList';
import style from '../style';
import { useRef, useState, useEffect } from 'react';

export function useIsVisible(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
          setIntersecting(entry.isIntersecting);
      });

      if (ref.current) {
          observer.observe(ref.current);
      }

      return () => {
          if (ref.current) {
              observer.unobserve(ref.current);
          }
          observer.disconnect();
      };
  }, [ref]);

  return isIntersecting;
}

const MapPage = () => {
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);

  const ref2 = useRef();
  const isVisible2 = useIsVisible(ref2);

  const ref3 = useRef();
  const isVisible3 = useIsVisible(ref3);

  return (
    <div className="bg-primary w-full relative pt-9">
      <Navbar />

      {/* Konten Utama */}
      <div className={`flex-grow flex flex-col items-center justify-center ${style.flexStart}`}>
        <div ref={ref1} className={`${style.boxWidth} w-full`}>
          <Map />
        </div>
      </div>

      <div className={`flex-grow flex flex-col items-center justify-center ${style.flexStart}`}>
        <div ref={ref2} className={`${style.boxWidth} w-full`}>
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
