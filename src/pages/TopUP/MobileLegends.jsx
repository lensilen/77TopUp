import AccountInfo from "../../components/TopUp/AccountInfo";
// import Nominal from "../../components/TopUp/Nominal";
// import Payment from "../../components/TopUp/Payment";
// import Confirmation from "../../components/TopUp/Confirmation";
// import StepWrapper from "../../components/TopUp/StepWrapper";
import { useState } from "react";

export default function MobileLegends() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: "",
    server: "",
    nominal: "",
    paymentMethod: ""
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <StepWrapper step={step} />

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
          prevStep={prevStep}
        />
      )}
    </div>
  );
}
