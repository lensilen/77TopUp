import React, { useState, useEffect } from "react";
import { useParams } from "react-router"; // Sebaiknya dari react-router-dom
import AccountInfo from "../../components/TopUp/AccountInfo";
import Nominal from "../../components/TopUp/Nominal";
import Payment from "../../components/TopUp/Payment";
import Confirmation from "../../components/TopUp/Confirmation";

export const TopUp = () => {
  const { slug } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: '',
    server: '',
    nickname: '',
    selectedItem: null,
    paymentMethod: '',
  });
  
  // State untuk menampung data dari backend
  const [gameData, setGameData] = useState(null); // Gunakan null sebagai nilai awal yang lebih baik
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk maju ke langkah berikutnya
  const nextStep = () => setStep(prev => prev + 1);
  // Fungsi untuk mundur ke langkah sebelumnya
  const prevStep = () => setStep(prev => prev - 1);
  
  useEffect(() => {
    // Jangan fetch jika tidak ada slug
    if (!slug) {
        setLoading(false);
        setError("Game slug tidak ditemukan di URL.");
        return;
    };

    const fetchData = async () => {
      setLoading(true); // Mulai loading setiap kali fetch
      setError(null);
      try {
        const res = await fetch(
    `https://77-top-up-be.vercel.app/77topup/ml`
);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Gagal mengambil data dari server.");
        }

        const json = await res.json();
        setGameData(json);
        console.log("Game data:", json);

        // Inisialisasi item pertama sebagai default saat data berhasil didapat
        if (json.packages && json.packages.length > 0) {
            setFormData(prev => ({ ...prev, selectedItem: json.packages[0] }));
        }

      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        // Hentikan loading baik berhasil maupun gagal
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // PERBAIKAN: Tambahkan slug sebagai dependensi
  
  // Fungsi untuk menampilkan komponen berdasarkan langkah saat ini
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AccountInfo
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
            // Kirim gameData agar bisa menampilkan gambar/nama game jika perlu
            gameData={gameData}
          />
        );
      case 2:
        return (
          <Nominal
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
            // PERBAIKAN: Sintaks prop yang benar
            gameData={gameData}
          />
        );
      // case 3:
      //   return (
      //     <Payment
      //       nextStep={nextStep}
      //       prevStep={prevStep}
      //       formData={formData}
      //       setFormData={setFormData}
      //     />
      //   );
      case 3: // Asumsi Konfirmasi adalah langkah ke-4
        return (
          <Confirmation
            prevStep={prevStep}
            formData={formData}
          />
        );
      default:
        // Fallback jika terjadi kesalahan pada state 'step'
        return <AccountInfo formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    }
  };

  // Tampilkan UI Loading atau Error sebelum menampilkan form
  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading game details...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      {/* Panggil renderStep hanya setelah loading selesai dan tidak ada error */}
      {renderStep()}
    </div>
  );
}