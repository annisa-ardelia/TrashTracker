import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SampahPieChart = ({ tempatSampahId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalSampah, setTotalSampah] = useState(0); // Untuk menyimpan total sampah
  const [statusSampah, setStatusSampah] = useState(""); // Untuk menyimpan status sampah

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tempatSampahId) throw new Error("Trash location ID is required.");

        const response = await fetch(`http://localhost:3001/JumlahSampah/${tempatSampahId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            const errorData = await response.json();
            throw new Error(errorData.message || "No data available.");
          }
          throw new Error("Failed to fetch trash data.");
        }
        
        const sampahData = await response.json();
        
        // Menyusun data untuk PieChart
        const basah = parseInt(sampahData.basah) || 0;
        const kering = parseInt(sampahData.kering) || 0;

        // Menentukan total sampah
        const total = basah + kering;
        setTotalSampah(total);

        // Menentukan status berdasarkan total sampah
        if (total <= 25) {
          setStatusSampah("Low");
        } else if (total <= 50) {
          setStatusSampah("Medium");
        } else {
          setStatusSampah("High");
        }

        const chartData = [
          { id: "basah", value: basah, label: "Sampah Basah" },
          { id: "kering", value: kering, label: "Sampah Kering" },
        ];

        setData(chartData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [tempatSampahId]);

  // Menentukan warna untuk pie chart
  const COLORS = ["#35D5E7", "#ffc300"]; // Warna untuk pie chart

  if (loading) {
    return <p className="text-center text-gray-500">Loading data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center -mt-20 mb-12">
      <div className="flex flex-row w-full max-w-4xl bg-primary rounded-lg shadow-md p-4">
        
        {/* Menampilkan total sampah di sebelah kiri */}
        <div className="flex flex-col justify-center items-center mr-8">
          <p className="text-white text-lg">
            Total Sampah: {totalSampah} items
          </p>
          <p className={`text-lg font-semibold ${statusSampah === "Low" ? "text-green-500" : statusSampah === "Medium" ? "text-yellow-500" : "text-red-500"}`}>
            {statusSampah}
          </p>
        </div>

        {/* Pie Chart */}
        <div className="flex-1">
          <h1 className="font-poppins font-semibold text-white text-center text-[30px] justify-center mb-12 pt-8">
            Komposisi sampah hari ini
          </h1>

          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart className="bg-primary">
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={60}
                  outerRadius={80}
                  label={(entry) => entry.label}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.id}`}
                      fill={COLORS[index % COLORS.length]} // Mengubah warna pie chart
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
    </div>
  );
};

export default SampahPieChart;
