
import React, { useEffect } from "react";
import AccountInfo from "../../components/TopUp/AccountInfo";
import Nominal from "../../components/TopUp/Nominal";
import Payment from "../../components/TopUp/Payment";
import Confirmation from "../../components/TopUp/Confirmation";
import StepWrapper from "../../components/TopUp/StepWrapper";
import { useState } from "react";
import { useParams } from "react-router";   
      // Impor komponen langkah 3

export const TopUp = () => {
  const { slug } = useParams()
  const [step, setStep] = useState(1);

  // 2. State untuk menyimpan SEMUA data form dari semua langkah
  const [formData, setFormData] = useState({
    id: '',
    server: '',
    nickname: '',
    selectedItem: null, // Di sini kita akan simpan item dari Nominal.js
    paymentMethod: '',
  });

  // Fungsi untuk maju ke langkah berikutnya
  const nextStep = () => setStep(prev => prev + 1);
  // Fungsi untuk mundur ke langkah sebelumnya
  const prevStep = () => setStep(prev => prev - 1);

  const [gameData, setGameData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
         `https://77-top-up-be.vercel.app/77topup/${slug}`
        );

        if (!res.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }

        const json = await res.json();
        setGameData(json);
        console.log("Game data:", json);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);
  
  // Fungsi untuk menampilkan komponen berdasarkan langkah saat ini
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AccountInfo
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <Nominal
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData} // Kirim fungsi ini ke Nominal
          />
        );
        case 3:
          return (
            <Payment
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData} // Kirim data yang sudah lengkap ke Payment
              setFormData={setFormData}
            />
          );
        case 4:
          return (
            <Confirmation
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData} // Kirim data yang sudah lengkap ke Payment
              setFormData={setFormData}
            />
          );
      default:
        return <AccountInfo />;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
}