import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "@mui/x-charts";

const TrashPieChart = () => {
  const [data, setData] = useState([]);

  // Fungsi untuk mengambil data dari API menggunakan fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/JumlahSampah"); // Ganti dengan URL API kamu
        const sampahData = await response.json();

        // Menyusun data dalam format yang dibutuhkan oleh PieChart
        const chartData = [
          { name: "Sampah Basah", value: sampahData.basah || 0 }, // Pastikan jika tidak ada data, tetap 0
          { name: "Sampah Kering", value: sampahData.kering || 0 }
        ];

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Menjalankan fetch data saat komponen pertama kali dimuat
  }, []);

  // Menentukan warna untuk setiap kategori
  const COLORS = ["#4caf50", "#ff9800"];

  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h2 className="text-center text-xl font-semibold mb-4">Perbandingan Sampah Basah dan Kering</h2>

        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default TrashPieChart;
