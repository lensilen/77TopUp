import { useState } from "react";

// Data untuk metode pembayaran, bisa dikembangkan dengan menambahkan logo, etc.
const paymentOptions = [
  { name: "Gopay" },
  { name: "Ovo" },
  { name: "BNI" },
  { name: "BCA" },
  { name: "BRI" },
  { name: "QRIS" }
];

export default function Payment({ formData, setFormData, nextStep, prevStep }) {
  // State untuk melacak metode pembayaran yang dipilih
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0].name);

  const handleSelectPayment = (paymentName) => {
    setSelectedPayment(paymentName);
    // Simpan metode pembayaran ke state utama jika diperlukan
    setFormData({ ...formData, paymentMethod: paymentName });
  };

   const item = formData.selectedItem;
  // Asumsi data item dan harga dari langkah sebelumnya
//   const item = {
//     name: "50 Diamonds",
//     price: 50000,
//   };

  return (
    <div className="bg-gray-50">
      {/* Container: Form + Image (Struktur dipertahankan) */}
      <div className="min-h-screen flex justify-center items-center px-4 py-10">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white">
          {/* Gambar (Struktur dipertahankan) */}
          <div className="w-full lg:w-[40%] hidden lg:block">
            <img
              src="/MLBB.png" // Ganti dengan path gambar yang benar
              alt="Mobile Legends"
              className="object-cover h-full w-full"
            />
          </div>

          <div className="w-full lg:w-[60%] p-8 flex flex-col justify-between">
            <div>
              {/* Progress Bar diubah ke Langkah 3/4 */}
               {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
                <div className="w-full h-1 bg-gray-300 rounded">
                  <div className="h-1 bg-orange-500 rounded w-3/4" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Langkah 3/4</p>
            </div>
                

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Pilih Pembayaran
              </h2>

              {/* Grid untuk Pilihan Pembayaran */}
              <div className="grid grid-cols-2 sm:grid-cols-3  gap-4">
                {paymentOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectPayment(option.name)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 flex flex-col items-center justify-center h-24 ${
                      selectedPayment === option.name
                        ? "border-orange-500 bg-orange-50 shadow-lg"
                        : "border-gray-300 bg-white hover:border-orange-400"
                    }`}
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-md mb-2"></div>
                    <p className="text-sm font-semibold text-gray-800 text-center">
                      {option.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bagian Total dan Tombol Aksi */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              {/* Detail Total */}
              <div className="mb-6">
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    {/* 💎 {item.name} */}
                  </p>
                  <p className="text-xl font-bold text-orange-600">
                    Total: Rp. {item.price.toLocaleString("id-ID")}
                  </p>
              </div>

              {/* --- Tombol Aksi (Lanjut & Kembali) --- */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={prevStep}
                  className="w-full sm:w-auto py-3 px-6 bg-white text-orange-500 font-bold rounded-lg border border-orange-500 shadow-sm hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Kembali
                </button>
                <button
                  onClick={nextStep}
                  className="w-full sm:flex-1 py-3 px-6 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!selectedPayment}
                >
                  Lanjut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}