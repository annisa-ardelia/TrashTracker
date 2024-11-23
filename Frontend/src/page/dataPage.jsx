import React from 'react';
import { useParams } from 'react-router-dom'; // Mengambil ID dari URL
import SampahBarChart from "../components/barChart";
import SampahPieChart from "../components/pieChart";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import style from "../style";

const DataPage = () => {
    const { id } = useParams(); // Mengambil ID dari URL

    return (
        <div className="bg-primary w-full relative pt-9">
            <Navbar />

            <div className={`bg-primary ${style.flexStart} w-full h-screen flex flex-row justify-center items-center gap-24`}>
                <div className={`${style.boxWidth}`}>
                    {/* Mengirimkan ID ke komponen BarChart */}
                    <SampahBarChart tempatSampahId={id} />
                </div>
            </div>

            <div className={`bg-primary ${style.flexStart} w-full h-screen flex flex-row justify-center items-center gap-24`}>
                <div className={`${style.boxWidth}`}>
                    {/* Mengirimkan ID ke komponen PieChart */}
                    <SampahPieChart tempatSampahId={id} />
                </div>
            </div>

            <div className={`bg-primary ${style.paddingX} ${style.flexCenter} flex-col md:absolute md:bottom-0 w-screen`}>
                <div className={`${style.boxWidth}`}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default DataPage;
