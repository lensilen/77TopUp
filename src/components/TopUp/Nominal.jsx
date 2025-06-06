import React, { useState } from "react";

const diamondOptions = [
  { id: 1, amount: 5, price: 7000, isHot: true },
  { id: 2, amount: 10, price: 14000, isHot: false },
  { id: 3, amount: 25, price: 35000, isHot: false },
  { id: 4, amount: 50, price: 50000, isHot: false },
  { id: 5, amount: 70, price: 70000, isHot: false },
];

const twilightPassOptions = [
    { id: 1, name: 'Twilight Pass', price: 60000, isPopular: true},
    // { id: 2, name: 'Twilight Pass', price: 60000, isPopular: true},
    // { id: 3, name: 'Twilight Pass', price: 60000, isPopular: true},
    // { id: 4, name: 'Twilight Pass', price: 60000, isPopular: true},
    // { id: 5, name: 'Twilight Pass', price: 60000, isPopular: true},
];

// Terima props formData dan setFormData dari komponen Induk
export default function Nominal({ nextStep, prevStep, formData, setFormData }) {
  
  // State untuk UI tab (Diamond/Twilight Pass) bisa tetap di sini
  const [activeView, setActiveView] = useState('Twilight Pass');

  // Handler tunggal untuk memperbarui state induk
  const handleSelect = (itemObject) => {
    setFormData({ ...formData, selectedItem: itemObject });
  };
  
  // Handler untuk mengubah tab, sekaligus set item default agar summary terupdate
  const handleViewChange = (view, defaultItem) => {
      setActiveView(view);
      handleSelect(defaultItem); 
  }

  // Baca item yang dipilih LANGSUNG dari props
  const selectedItem = formData.selectedItem;
  
  const currentStep = 2;
  const totalSteps = 4;

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex justify-center items-center px-4 py-10">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white">
          <div className="w-full lg:w-[40%] hidden lg:block">
            <img
              src="/public/MLBB.png"
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
                    <div className="h-1 bg-orange-500 rounded w-1/2" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Langkah {currentStep}/{totalSteps}</p>
              </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Pilih Item Top UP
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={() => handleViewChange('Diamond', diamondOptions[0])}
                className={`px-6 py-2 text-sm font-semibold rounded-lg shadow-md focus:outline-none ${activeView === 'Diamond' ? 'text-white bg-orange-500' : 'text-gray-600 bg-gray-200 hover:bg-gray-300'}`}
              >
                Diamond
              </button>
              <button 
                onClick={() => handleViewChange('Twilight Pass', twilightPassOptions[0])}
                className={`px-6 py-2 text-sm font-semibold rounded-lg shadow-md focus:outline-none ${activeView === 'Twilight Pass' ? 'text-white bg-orange-500' : 'text-gray-600 bg-gray-200 hover:bg-gray-300'}`}
              >
                Twilight Pass
              </button>
              <button className="px-6 py-2 text-sm font-semibold text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed">
                Battle Pass
              </button>
            </div>
            
            {activeView === 'Twilight Pass' && (
                <div className="animate-fade-in">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {twilightPassOptions.map((option, index) => (
                        <div
                        key={`tp-${index}`} 
                        className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 h-28 flex flex-col items-center justify-center ${
                            selectedItem?.id === option.id && selectedItem.name === option.name
                            ? "border-orange-500 bg-orange-50 shadow-lg"
                            : "border-gray-300 bg-white hover:border-orange-400"
                        }`}
                        onClick={() => handleSelect(option)}
                        >
                        <p className="font-bold text-center text-gray-800 mt-2">{option.name}</p>
                        <p className="text-sm text-center text-gray-500 mt-1">
                            Rp {option.price.toLocaleString("id-ID")}
                        </p>
                        </div>
                    ))}
                    </div>
                </div>
            )}
            
            {activeView === 'Diamond' && (
                <div className="animate-fade-in">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {diamondOptions.map((option) => (
                        <div
                        key={option.id}
                        className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            // ==========================================================
                            // INI BAGIAN YANG DIPERBAIKI
                            // Kita cek apakah item punya properti 'amount'
                            // ==========================================================
                            selectedItem?.id === option.id && selectedItem?.hasOwnProperty('amount')
                            ? "border-orange-500 bg-orange-50 shadow-lg"
                            : "border-gray-300 bg-white hover:border-orange-400"
                        }`}
                        onClick={() => handleSelect(option)}
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
            )}
          </div>

          <div className="mt-10">
              {selectedItem ? (
                <>
                  <div className="w-full pt-6 border-t border-gray-200" />
                  <div className="flex justify-between items-center mt-6">
                      <div>
                          <p className="text-xl font-bold text-gray-900">
                              <span className="font-normal">
                                {selectedItem.amount ? `${selectedItem.amount} Diamonds` : selectedItem.name}
                              </span> 
                          </p>
                          <p className="text-2xl font-bold text-orange-600">
                              Rp {selectedItem.price.toLocaleString("id-ID")}
                          </p>
                      </div>
                  </div>
                  <div className="mt-6">
                      <div className="flex flex-col gap-4">
                        <button
                            onClick={nextStep}
                            className="w-full py-3 px-6 bg-orange-500 text-white font-bold rounded-lg shadow-sm hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            Lanjut
                        </button>
                        <button
                            onClick={prevStep}
                            className="w-full py-3 px-6 bg-white text-orange-500 font-bold rounded-lg border border-orange-500 shadow-sm hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            Kembali
                        </button>
                      </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 pt-6 w-full border-t border-gray-200 text-center text-gray-500">
                    <p>Pilih item untuk melanjutkan.</p>
                </div>
              )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}