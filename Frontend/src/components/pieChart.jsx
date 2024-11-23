import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom"; // Jika menggunakan React Router

const SampahPieChart = ({ tempatSampahId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tempatSampahId) throw new Error("Trash location ID is required.");
        
        const response = await fetch(`http://localhost:3001/JumlahSampah/${tempatSampahId}`); // Menggunakan id dalam URL
        
        if (!response.ok) {
          if (response.status === 404) {
            // Jika status 404, ambil pesan error dari response JSON
            const errorData = await response.json();
            throw new Error(errorData.message || "No data available.");
          }
          throw new Error("Failed to fetch trash data.");
        }
        
        const sampahData = await response.json();

        // Menyusun data untuk PieChart
        const chartData = [
          { id: "basah", value: sampahData.basah || 0, label: "Sampah Basah" },
          { id: "kering", value: sampahData.kering || 0, label: "Sampah Kering" },
        ];

        setData(chartData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [tempatSampahId]); // Hanya dipanggil saat id berubah

  const COLORS = ["#4caf50", "#ff9800"]; // Warna untuk pie chart

  if (loading) {
    return <p className="text-center text-gray-500">Loading data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h1 className="font-poppins font-semibold text-black text-center text-[30px] justify-center mb-12 pt-8">
          Trash Data for Location {tempatSampahId}
        </h1>

        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label" // Gunakan label untuk penamaan
                innerRadius={60}
                outerRadius={80}
                label={(entry) => entry.label} // Tampilkan label sektor
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.id}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No data available for this trash location.</p>
        )}
      </div>
    </div>
  );
};

export default SampahPieChart;
