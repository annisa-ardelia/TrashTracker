import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import BarChartTeknik from "../components/barChartTeknik"; // Make sure to import BarChartTeknik
import SampahBarChart from "../components/barChart";
import SampahPieChart from "../components/pieChart";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import style from "../style";

const DataPage = () => {
    const { id } = useParams(); // Mengambil ID dari URL
    const [tempatSampah, setTempatSampah] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mengambil semua tempat sampah dari API
                const response = await fetch(`http://localhost:3001/TempatSampah`);
                
                if (!response.ok) {
                    throw new Error("Data not found.");
                }

                const data = await response.json();

                // Mencari tempat sampah yang sesuai dengan ID dari URL
                const selectedTempatSampah = data.find(item => item.id === parseInt(id)); 

                if (!selectedTempatSampah) {
                    throw new Error("Tempat Sampah with the specified ID not found.");
                }

                setTempatSampah(selectedTempatSampah); // Menyimpan data tempat sampah yang sesuai
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // Menjalankan hanya saat ID berubah

    if (loading) {
        return <p className="text-center text-gray-500">Loading data...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-primary w-full relative pt-9 overflow-hidden">
            <Navbar />

            <div className={`bg-primary ${style.flexStart} w-full h-full flex flex-row justify-center items-center gap-24`}>
                <div className={`${style.boxWidth}`}>
                    {id === '1' ? (
                        <BarChartTeknik />
                    ) : (
                        <SampahBarChart tempatSampahId={id} nama={tempatSampah.nama} fakultas={tempatSampah.fakultas} />
                    )}
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