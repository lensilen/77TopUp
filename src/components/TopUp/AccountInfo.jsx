import { useState } from "react";

export default function AccountInfo({ formData, setFormData, nextStep }) {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleValidate = async () => {
    setLoading(true);
    setNickname("");
    setError("");

    try {
      const res = await fetch(
        `https://api.isan.eu.org/nickname/ml?id=${formData.id}&server=${formData.server}`
      );
      const data = await res.json();

      if (data?.success) {
        setNickname(data.name);
        // Simpan juga ke formData utama
        setFormData({ 
          ...formData, 
          nickname: data.name 
        });
      } else {
        setError("Akun tidak ditemukan. Periksa kembali ID dan Server Anda.");
        setFormData({ ...formData, nickname: '' });
      }
    } catch (err) {
      setError("Gagal menghubungi server validasi. Coba lagi nanti.");
      setFormData({ ...formData, nickname: data.name });
    }

    setLoading(false);
  };

  // Fungsi helper lain untuk menangani input
  const handleInputChange = (e, field) => {
      setFormData({
          ...formData,
          [field]: e.target.value,
          nickname: '' 
      });
      setNickname('');
      setError('');
  }

  return (
    <div className="bg-gray-50">
      {/* Container: Form + Image */}
      <div className="min-h-screen flex justify-center items-center px-4 py-10">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white">

          {/* Gambar */}
          <div className="w-full lg:w-[40%]">
            <img
              src="/MLBB.png"
              alt="Mobile Legends"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Form */}
          <div className="w-full lg:w-[60%] p-8 flex flex-col justify-between">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
                <div className="w-full h-1 bg-gray-300 rounded">
                  <div className="h-1 bg-orange-500 rounded w-1/4" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Langkah 1/3</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Detail Akun Game
            </h2>

            {/* Error / Success */}
            {error && (
              <div className="mb-4 text-red-700 bg-red-100 rounded-lg p-3 text-sm font-medium">
                {error}
              </div>
            )}
            {nickname && !error && (
              <div className="mb-4 text-green-700 bg-green-100 rounded-lg p-3 text-sm font-medium">
                Nickname: {nickname}
              </div>
            )}

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User ID
                </label>
                <input
                  type="text"
                  placeholder="Masukkan ID"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.id || ""}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Server
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Zone ID"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.server || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, server: e.target.value })
                  }
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              Pastikan ID yang dimasukkan sudah benar
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleValidate}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={loading || !formData.id || !formData.server || !!nickname}
              >
                {loading ? "Memvalidasi..." : "Cek Akun"}
              </button>

              <button
                onClick={nextStep}
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!nickname}
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Container: Ulasan Pembeli */}
      {/* <div className="px-4 py-12 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Ulasan Pembeli</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <p className="text-sm text-gray-700 font-medium mb-1">
                  herr****wig@gmail.com
                </p>
                <div className="flex items-center text-yellow-500 text-sm mb-1">
                  {"★★★★★".split("").map((star, idx) => (
                    <span key={idx}>{star}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mb-1">Diamond 50</p>
                <p className="text-xs text-gray-400">2025-05-14 20:42:26</p>
                <p className="italic text-sm text-gray-600 mt-2">
                  Cepat murah dan aman!
                </p>
              </div>
            ))} */}
    </div>
  );
}
