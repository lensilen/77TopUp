import React, { useState } from 'react';

// Prop 'step' sekarang digunakan untuk menentukan langkah awal (misal: step={1})
// Jika tidak ada prop yang diberikan, default-nya adalah 1.
export default function StepWrapper({ step: initialStep = 1 }) {
  // 1. TAMBAHKAN STATE: Membuat komponen menjadi interaktif.
  // Kita ubah prop 'initialStep' (1-based) menjadi state internal (0-based).
  const [activeStep, setActiveStep] = useState(initialStep - 1);

  // Array yang akan kita gunakan untuk membuat 4 langkah (indeks 0, 1, 2, 3)
  const steps = [0, 1, 2, 3];
  const numberOfSteps = steps.length;

  // Menghitung lebar progress bar yang terisi (garis oranye)
  const progressWidth = activeStep > 0 ? (activeStep / (numberOfSteps - 1)) * 100 : 0;

  return (
    // Menggunakan kontainer yang lebih sesuai untuk slider
    <div className="w-full max-w-md my-8">
      {/* 2. TAMBAHKAN TRACK: Kontainer relative untuk menumpuk elemen */}
      <div className="relative h-5 flex items-center">
        {/* Garis Latar (Abu-abu) */}
        <div className="absolute w-full h-1 bg-gray-300 rounded-full" />

        {/* Garis Progress (Oranye) */}
        <div
          className="absolute h-1 bg-orange-500 rounded-full transition-all duration-300"
          style={{ width: `${progressWidth}%` }}
        />

        {/* Kontainer untuk semua titik, agar posisinya pas */}
        <div className="w-full flex justify-between items-center">
          {steps.map((s) => (
            <div
              key={s}
              // 4. BUAT INTERAKTIF: Tambahkan onClick untuk mengubah state
              onClick={() => setActiveStep(s)}
              className="relative z-10 flex items-center justify-center cursor-pointer"
            >
              {/* 3. SESUAIKAN GAYA TITIK: Lingkaran dasar */}
              <div
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  activeStep >= s ? "bg-orange-500" : "bg-gray-300"
                }`}
              />
              {/* Thumb (pegangan) yang hanya muncul di titik aktif */}
              {activeStep === s && (
                <div className="absolute w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-md" />
              )}
              {/* Angka di dalam lingkaran {s} kita hapus */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
