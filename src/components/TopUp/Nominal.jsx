import React, { useState } from "react";

const diamondOptions = [
  { id: 1, amount: 5, price: 7000, isHot: true },
  { id: 2, amount: 10, price: 14000, isHot: false },
  { id: 3, amount: 25, price: 35000, isHot: false },
  { id: 4, amount: 50, price: 50000, isHot: false },
  { id: 5, amount: 70, price: 70000, isHot: false },
];

export default function Nominal({ nextStep, prevStep }) {
  const [selectedDiamond, setSelectedDiamond] = useState(diamondOptions[3]);

  const handleSelectDiamond = (diamond) => {
    setSelectedDiamond(diamond);
  };

  const currentStep = 2;
  const totalSteps = 4;
  const handlePosition = '25%';
  const barWidth = '25%';

  return (
    <div className="bg-gray-50">
      {/* Container: Form + Image */}
      <div className="min-h-screen flex justify-center items-center px-4 py-10">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white">

          {/* Gambar */}
          <div className="w-full lg:w-[40%]">
            <img
              src="/public/MLBB.png"
              alt="Mobile Legends"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Kolom Kanan: Form (60% dari lebar layar di desktop) */}
          {/* Diberi flex flex-col justify-between agar konten terdistribusi secara vertikal */}
          <div className="w-full lg:w-[70%] p-6 flex flex-col justify-between">
            {/* Konten Atas: Progress Bar, Judul, Pilihan Diamond */}
            <div>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
                  <div className="w-full h-1 bg-gray-300 rounded">
                    <div className="h-1 bg-orange-500 rounded w-1/2" />
                  </div>
                  <div 
                    className="absolute top-1/2 w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow transform -translate-y-1/2 -translate-x-1/2"
                    style={{ left: handlePosition }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Langkah {currentStep}/{totalSteps}</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pilih Item Top UP
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <button className="px-6 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg shadow-md focus:outline-none">
                  Diamond
                </button>
                <button className="px-6 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg focus:outline-none">
                  Battle Pass
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {diamondOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedDiamond.id === option.id
                        ? "border-orange-500 bg-orange-50 shadow-lg"
                        : "border-gray-300 bg-white hover:border-orange-400"
                    }`}
                    onClick={() => handleSelectDiamond(option)}
                  >
                    {option.isHot && (
                      <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg rounded-tl-lg">
                        🔥 Hot
                      </div>
                    )}
                    <p className="font-bold text-center text-gray-800 mt-2">{option.amount} Diamonds</p>
                    <p className="text-sm text-center text-gray-500 mt-1">
                      Rp {option.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Konten Bawah: Total & Tombol Aksi */}
            <div className="mt-10">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total:</p>
                  <p className="text-xl font-bold text-gray-900">
                    <span className="font-normal">{selectedDiamond.amount} Diamonds</span> x1
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    Rp {selectedDiamond.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 w-full border-t border-gray-200">
                <div className="flex flex-col gap-4">
                  <button
                    onClick={nextStep}
                    className="w-full py-3 px-6 bg-orange-500 text-white font-bold rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Lanjut
                  </button>
                  <button
                    onClick={prevStep}
                    className="w-full py-3 px-6 bg-orange-500 text-white font-bold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Kembali
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
