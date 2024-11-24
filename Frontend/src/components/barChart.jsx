import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SampahBarChart = ({ tempatSampahId, nama, fakultas }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/DailySampah/${tempatSampahId}`);
        const sampahData = await response.json();

        const chartData = sampahData.map(item => ({
          date: item.date,
          basah: item.basah,
          kering: item.kering,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (tempatSampahId) {
      fetchData();
    }
  }, [tempatSampahId]);

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <h1 className="font-poppins text-center text-[55px] justify-center mb-12 pt-16">
        <span className="text-gradient font-bold text-[55px]">{nama}</span><br />
      </h1>
      <h2 className="font-poppins text-center text-[20px] justify-center -mt-12 mb-12">
        <span className="text-white text-[20px] font-semibold">Fakultas {fakultas}</span>
      </h2>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4">
        <h2 className="text-center text-xl font-semibold mb-4 text-black">
          Data Sampah 10 Hari Terakhir
        </h2>

        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="basah" fill="#35D5E7" name="Sampah Basah" /> {/* Ganti warna */}
              <Bar dataKey="kering" fill="#ffc300" name="Sampah Kering" /> {/* Ganti warna */}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default SampahBarChart;
