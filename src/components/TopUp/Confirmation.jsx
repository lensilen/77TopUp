import React, { useState } from 'react';

// Terima props prevStep dan formData dari komponen Induk
export default function Confirmation({ prevStep, formData }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    // Di aplikasi nyata, di sini Anda akan memanggil API untuk membuat transaksi
    console.log("Data yang dikirim ke server:", formData);
    
    // Simulasi proses pembayaran
    setTimeout(() => {
      alert(`Pembayaran Berhasil!\n\nNickname: ${formData.nickname}\nItem: ${formData.selectedItem.amount ? `${formData.selectedItem.amount} Diamonds` : formData.selectedItem.name}\nTotal: Rp ${formData.selectedItem.price.toLocaleString('id-ID')}`);
      setIsProcessing(false);
      // Di sini Anda bisa mengarahkan pengguna ke halaman histori transaksi
      // window.location.href = '/transaksi';
    }, 2000); // Simulasi delay 2 detik
  };

  const currentStep = 4;
  const totalSteps = 4;
  const item = formData.selectedItem;

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex justify-center items-center px-4 py-10">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white">
          <div className="w-full lg:w-[40%] hidden lg:block">
            <img
              src="/public/MLBB.png" // Pastikan path gambar ini benar
              alt="Mobile Legends"
              className="object-cover h-full w-full"
            />
          </div>

          <div className="w-full lg:w-[70%] p-6 flex flex-col justify-between">
            <div>
              {/* Progress Bar di Langkah 4/4 */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
                  <div className="relative w-full h-1 bg-gray-300 rounded">
                    <div className="h-1 bg-orange-500 rounded w-full" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Langkah {currentStep}/{totalSteps}</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Konfirmasi Pesanan Anda
              </h2>

              {/* Bagian Detail Konfirmasi */}
              <div className="space-y-6 text-gray-700">
                {/* Detail Akun */}
                <div>
                  <h3 className="font-bold text-lg mb-2 border-b pb-2">Detail Akun</h3>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">Nickname</span>
                    <span className="font-semibold">{formData.nickname || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">User ID (Zone ID)</span>
                    <span className="font-semibold">{formData.id} ({formData.server})</span>
                  </div>
                </div>

                {/* Detail Item */}
                <div>
                  <h3 className="font-bold text-lg mb-2 border-b pb-2">Detail Pembelian</h3>
                  {item && (
                    <>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-500">Item</span>
                        <span className="font-semibold">
                          {item.amount ? `${item.amount} Diamonds` : item.name}
                        </span>
                      </div>
                       <div className="flex justify-between py-2">
                        <span className="text-gray-500">Harga</span>
                        <span className="font-semibold">
                          Rp {item.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Metode Pembayaran */}
                 <div>
                  <h3 className="font-bold text-lg mb-2 border-b pb-2">Metode Pembayaran</h3>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">Bayar dengan</span>
                    <span className="font-semibold">{formData.paymentMethod || 'N/A'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bagian Total dan Tombol Aksi */}
            <div className="mt-10">
              {item ? (
                <>
                  <div className="w-full pt-6 border-t border-gray-200" />
                  <div className="flex justify-between items-center mt-6">
                      <div>
                          <p className="text-xl font-bold text-gray-900">
                              <span className="font-normal">Total Bayar</span> 
                          </p>
                          <p className="text-2xl font-bold text-orange-600">
                              Rp {item.price.toLocaleString("id-ID")}
                          </p>
                      </div>
                  </div>
                  <div className="mt-6">
                      <div className="flex flex-col gap-4">
                      <button
                          onClick={handleConfirm}
                          disabled={isProcessing}
                          className="w-full py-3 px-6 bg-green-500 text-white font-bold rounded-lg shadow-sm hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-400 disabled:cursor-wait"
                      >
                          {isProcessing ? 'Memproses...' : 'Konfirmasi & Bayar'}
                      </button>
                      <button
                          onClick={prevStep}
                          disabled={isProcessing}
                          className="w-full py-3 px-6 bg-white text-gray-700 font-bold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
                      >
                          Kembali
                      </button>
                      </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 pt-6 w-full border-t border-gray-200 text-center text-gray-500">
                    <p>Detail pesanan tidak lengkap.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}