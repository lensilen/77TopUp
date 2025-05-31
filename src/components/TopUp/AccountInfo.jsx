// src/components/TopUp/AccountInfo.jsx
import { useState } from "react";

export default function AccountInfo({ formData, setFormData, nextStep }) {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validasi akun coba cek https://github.com/ihsangan/valid/tree/main
  // Contoh ML:
  //    id      = 1114917746
  //    server  = 13486

  const handleValidate = async () => {
    setLoading(true);
    setNickname("");
    setError("");

    try {
      const res = await fetch(
        `https://api.isan.eu.org/nickname/ml?id=${formData.id}&server=${formData.server}`
      );
      const data = await res.json();
      console.log(data);

      if (data?.success) {
        setNickname(data.name);
      } else {
        setError("Akun tidak ditemukan.");
      }
    } catch (err) {
      setError("Gagal menghubungi server.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4 bg-purple-300 p-4">
      {error !== "" ? (
        <p className="text-red-600 font-medium bg-red-200 rounded-lg p-2 w-fit">
          ❌ {error}
        </p>
        
      ) : (
        nickname !== "" && (
          <p className="text-green-600 font-medium bg-green-200 rounded-lg p-2 w-fit">
            ✅ {nickname}
          </p>
        )
      )}

      <h2 className="text-lg font-semibold">Masukkan ID Akun</h2>
      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="ID Akun"
        value={formData.id}
        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
      />

      <h2 className="text-lg font-semibold">Masukkan ID Server</h2>
      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="ID Server"
        value={formData.server || ""}
        onChange={(e) => setFormData({ ...formData, server: e.target.value })}
      />

      <div className="flex gap-2">
        <button
          onClick={handleValidate}
          className="btn btn-primary"
          disabled={loading || !formData.id || !formData.server}
        >
          {loading ? "Memvalidasi..." : "Validasi"}
        </button>

        <button
          onClick={nextStep}
          className="btn btn-secondary"
          disabled={!nickname} // hanya bisa lanjut kalau sudah divalidasi
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}
