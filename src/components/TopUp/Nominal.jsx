import React from "react";

export default function Nominal({ formData, setFormData, prevStep, nextStep }) {
  return (
    <>
      <button
        onClick={prevStep}
        className="btn btn-secondary"
      >
        Kembali
      </button>
      <button
        onClick={nextStep}
        className="btn btn-secondary"
        // disabled={!isFound} // hanya bisa lanjut kalau sudah divalidasi
      >
        Lanjut
      </button>
    </>
  );
}
