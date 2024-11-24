import React, { useState, useEffect } from 'react';

const DataManagement = () => {
  const [tempatSampah, setTempatSampah] = useState([]);
  const [formData, setFormData] = useState({ nama: '', fakultas: '', tempatSampahId: '' });
  const [editing, setEditing] = useState(false); // Menandakan apakah sedang mengedit
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data tempat sampah dari API
    const fetchTempatSampah = async () => {
      try {
        const response = await fetch('http://localhost:3001/tempatSampah');
        if (!response.ok) {
          throw new Error('Failed to fetch tempat sampah');
        }
        const data = await response.json();
        setTempatSampah(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tempat sampah:', error);
      }
    };

    fetchTempatSampah();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editing
      ? `http://localhost:3001/tempatSampah/${formData.tempatSampahId}` // Edit request
      : 'http://localhost:3001/tempatSampah'; // Add request

    const method = editing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: formData.nama,
          fakultas: formData.fakultas,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save tempat sampah');
      }

      // Reset form data setelah berhasil
      setFormData({ nama: '', fakultas: '', tempatSampahId: '' });
      setEditing(false);
      setLoading(true);
      await fetchTempatSampah(); // Refresh daftar tempat sampah
    } catch (error) {
      console.error('Error saving tempat sampah:', error);
    }
  };

  const handleEdit = (tempatSampah) => {
    setFormData({
      nama: tempatSampah.nama,
      fakultas: tempatSampah.fakultas,
      tempatSampahId: tempatSampah.tempatSampahId,
    });
    setEditing(true);
  };

  const handleDelete = async (tempatSampahId) => {
    try {
      const response = await fetch(`http://localhost:3001/tempatSampah/${tempatSampahId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tempat sampah');
      }

      // Setelah menghapus, reload data
      setLoading(true);
      await fetchTempatSampah(); // Refresh daftar tempat sampah
    } catch (error) {
      console.error('Error deleting tempat sampah:', error);
    }
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="container mx-auto mt-48 h-full w-full mb-48 bg-white">
      <h1 className="text-center text-2xl font-bold mb-4">Data Management Tempat Sampah</h1>

      {/* Formulir untuk menambah atau mengedit tempat sampah */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-xl font-semibold">{editing ? 'Edit Tempat Sampah' : 'Tambah Tempat Sampah'}</h2>
        <div className="mb-4">
          <label htmlFor="nama" className="block">Nama Tempat Sampah</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fakultas" className="block">Fakultas</label>
          <input
            type="text"
            id="fakultas"
            name="fakultas"
            value={formData.fakultas}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          {editing ? 'Simpan Perubahan' : 'Tambah Tempat Sampah'}
        </button>
      </form>

      {/* Daftar tempat sampah */}
      <h2 className="text-xl font-semibold mb-4">Daftar Tempat Sampah</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nama Tempat Sampah</th>
            <th className="border px-4 py-2">Fakultas</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tempatSampah.map((tempatSampah) => (
            <tr key={tempatSampah.tempatSampahId}>
              <td className="border px-4 py-2">{tempatSampah.nama}</td>
              <td className="border px-4 py-2">{tempatSampah.fakultas}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(tempatSampah)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tempatSampah.tempatSampahId)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataManagement;
