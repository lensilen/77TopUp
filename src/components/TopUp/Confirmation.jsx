import React, {useState} from "react";

export default function Confirmation({ formData, setFormData, prevStep, nextStep }) {
  return (
    <>

    <h1>ini adalah halaman untuk Konfirmasi</h1>
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