import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@mui/x-charts";

const TrashBarChart = () => {
  const [data, setData] = useState([]);

  // Fungsi untuk mengambil data dari API menggunakan fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/DailySampah"); // Ganti dengan URL API kamu
        const sampahData = await response.json();

        // Format data untuk chart
        const chartData = sampahData.map(item => ({
          date: item.date,  // Tanggal data
          basah: item.basah,  // Jumlah sampah basah
          kering: item.kering  // Jumlah sampah kering
        }));

        setData(chartData);  // Menyimpan data ke state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();  // Menjalankan fetch data saat komponen pertama kali dimuat
  }, []); // Menggunakan [] agar hanya dipanggil sekali setelah mount

  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4">
        <h2 className="text-center text-xl font-semibold mb-4">Jumlah Sampah Basah dan Kering Harian</h2>

        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />  {/* Menggunakan 'date' sebagai key untuk XAxis */}
              <YAxis />
              <Tooltip />
              <Bar dataKey="basah" fill="#4caf50" />  {/* Bar untuk Sampah Basah */}
              <Bar dataKey="kering" fill="#ff9800" />  {/* Bar untuk Sampah Kering */}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default TrashBarChart;
