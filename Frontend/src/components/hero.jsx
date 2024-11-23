import React from 'react';
import map from '../assets/map-putih.png';

const hero = () => {

    return (
        <div className="pl-16 pt-28 pb-28 overflow-hidden">
            <div className="absolute mt-24">
                <h1 className="text-white text-6xl font-bold mb-4 center text-gradient">Cek sini dulu</h1>
                <h1 className="text-white text-6xl font-bold mb-4 center">sebelum angkut sampah!!</h1>
                <h3 className="text-white text-xl mb-4 center">Trash Tracker dapat menampilkan landscape sampah di tempat anda!</h3>
            </div>
            <img src={map} className="ml-72 scale-75"></img>
        </div>
    )

}

export default hero;