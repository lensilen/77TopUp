import React, { useState, useEffect } from 'react'; // 1. Impor useEffect
import { useNavigate } from 'react-router-dom';

export default function Confirmation({ prevStep, formData }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // ==========================================================
  // PENYESUAIAN: Tambahkan useEffect untuk memuat skrip Midtrans secara dinamis
  // ==========================================================
  useEffect(() => {
    // URL script Snap.js dari Midtrans
    const snapScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    
    // Client Key Midtrans Anda
    const myMidtransClientKey = "SB-Mid-client-jW6L5eBLSCT7AjXQ"; // <-- GANTI DENGAN CLIENT KEY ANDA

    // Buat tag script baru
    const script = document.createElement('script');
    script.src = snapScriptUrl;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.async = true;

    // Tambahkan script ke body dokumen
    document.body.appendChild(script);

    // Cleanup function: hapus script saat komponen di-unmount
    return () => {
      document.body.removeChild(script);
    }
  }, []); // Array dependensi kosong agar hanya berjalan sekali saat komponen dimuat

  // Fungsi handleConfirm Anda TIDAK PERLU DIUBAH, karena sudah benar.
  const handleConfirm = async () => {
    if (!formData.selectedItem || !formData.nickname) {
      alert("Detail pesanan tidak lengkap. Silakan kembali.");
      return;
    }
    setIsProcessing(true);
    try {
      const payload = {
        id_packages: formData.selectedItem.id_packages,
        username: formData.nickname,
        email: 'pembeli@example.com',
      };
      
      const response = await fetch('https://77-top-up-be.vercel.app/pay/:', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Gagal membuat transaksi.');

      const transactionToken = result.token;
      if (!transactionToken) throw new Error("Token transaksi tidak diterima.");

      window.snap.pay(transactionToken, {
        onSuccess: (result) => {
          alert("Pembayaran berhasil!");
          navigate('/transaksi');
        },
        onPending: (result) => {
          alert("Menunggu pembayaran Anda!");
          navigate('/transaksi');
        },
        onError: (result) => {
          alert("Pembayaran gagal!");
          setIsProcessing(false);
        },
        onClose: () => {
          setIsProcessing(false);
        }
      });
    } catch (error) {
      alert(`Terjadi kesalahan: ${error.message}`);
      setIsProcessing(false);
    }
  };

  const currentStep = 3;
  const totalSteps = 3;
  const item = formData.selectedItem;

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex justify-center items-center px-4 py-10">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white">
          <div className="w-full lg:w-[40%] hidden lg:block">
            <img
              src="/MLBB.png"
              alt="Mobile Legends"
              className="object-cover h-full w-full"
            />
          </div>

          <div className="w-full lg:w-[70%] p-6 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
                  <div className="relative w-full h-1 bg-gray-300 rounded">
                    <div 
                      className="h-1 bg-orange-500 rounded transition-all duration-500" 
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Langkah {currentStep}/{totalSteps}</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Konfirmasi Pesanan Anda
              </h2>

              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="font-bold text-lg mb-2 border-b pb-2">Detail Akun</h3>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">Nickname</span>
                    <span className="font-semibold">{formData.nickname || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">User ID (Zone ID)</span>
                    <span className="font-semibold">{formData.id || 'N/A'} ({formData.server || 'N/A'})</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2 border-b pb-2">Detail Pembelian</h3>
                  {item ? (
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
                  ) : (
                    <div className="py-2 text-gray-500">Item belum dipilih.</div>
                  )}
                </div>
              </div>

            </div>

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
                          className="w-full py-3 px-6 bg-orange-500 text-white font-bold rounded-lg shadow-sm hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-400 disabled:cursor-wait"
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