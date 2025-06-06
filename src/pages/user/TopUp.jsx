import React, { useState } from "react";
import { useParams } from "react-router";
import AccountInfo from "../../components/TopUp/AccountInfo";
import Nominal from "../../components/TopUp/Nominal";
import Payment from "../../components/TopUp/Payment";
import Confirmation from "../../components/TopUp/Confirmation";
// Jika kamu ingin pakai indikator langkah, tinggal uncomment:
// import StepWrapper from "../../components/TopUp/StepWrapper";

export const TopUp = () => {
  const { slug } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: "",
    server: "",
    nominal: "",
    paymentMethod: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        {/* Uncomment kalau mau tampilkan progress step */}
        {/* <StepWrapper step={step} /> */}

        {step === 1 && (
          <AccountInfo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}

        {step === 2 && (
          <Nominal
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 3 && (
          <Payment
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 4 && (
          <Confirmation
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      </div>
    </>
  );
};
