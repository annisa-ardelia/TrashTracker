import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BarChartTeknik = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/AllSensorData`);
        const result = await response.json();

        // Access the data property of the result object
        const sampahData = result.data;

        // Check if the fetched data is an array
        if (Array.isArray(sampahData)) {
          // Map the new table structure to chart-friendly data
          const chartData = sampahData.map(item => ({
            timestamp: new Date(item.timestamp).toLocaleString(), // Format timestamp
            percentageWet: item.percentageWet,
            percentageDry: item.percentageDry,
          }));

          setData(chartData);
        } else {
          console.error("Fetched data is not an array:", sampahData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Ensure this runs once by adding an empty dependency array

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <h1 className="font-poppins text-center text-[55px] justify-center mb-12 pt-16">
        <span className="text-gradient font-bold text-[55px]">Tempat Sampah Teknik</span><br />
      </h1>
      <h2 className="font-poppins text-center text-[20px] justify-center -mt-12 mb-12">
        <span className="text-white text-[20px] font-semibold">Fakultas Teknik</span>
      </h2>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4">
        <h2 className="text-center text-xl font-semibold mb-4 text-black">
          Data Sampah 20 Hari Terakhir
        </h2>

        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentageWet" fill="#35D5E7" name="Persentase Sampah Basah" />
              <Bar dataKey="percentageDry" fill="#ffc300" name="Persentase Sampah Kering" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default BarChartTeknik;