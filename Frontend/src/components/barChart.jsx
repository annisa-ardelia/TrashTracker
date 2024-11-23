import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SampahBarChart = ({ tempatSampahId }) => {
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
    <div className="flex justify-center items-center p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4">
        <h2 className="text-center text-xl font-semibold mb-4">
          Jumlah Sampah Harian (ID: {tempatSampahId})
        </h2>

        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="basah" fill="#4caf50" name="Sampah Basah" />
              <Bar dataKey="kering" fill="#ff9800" name="Sampah Kering" />
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
