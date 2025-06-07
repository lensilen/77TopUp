import React, { useState } from "react";

export default function Nominal({
  nextStep,
  prevStep,
  formData,
  setFormData,
  gameData,
}) {
  const [activeView, setActiveView] = useState("DIAMOND");

  const handleSelect = (itemObject) => {
    setFormData({ ...formData, selectedItem: itemObject });
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    const firstItem = view === "DIAMOND" ? diamondPackages[0] : passPackages[0];
    if (firstItem) {
      handleSelect(firstItem);
    }
  };

  const selectedItem = formData.selectedItem;
  const packages = gameData?.packages || [];

  // ==========================================================
  // PERBAIKAN: Ubah logika filter untuk mencari berdasarkan nama
  // ==========================================================
  const diamondPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes("diamond")
  );

  const passPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes("pass")
  );

  const currentStep = 2;
  const totalSteps = 3;

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex justify-center items-center px-4 py-10">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white">
          <div className="w-full lg:w-[40%] hidden lg:block">
            <img
              src={gameData?.game.image || "/MLBB.png"}
              alt={gameData?.game.name || "Game"}
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
                      className="h-1 bg-orange-500 rounded"
                      style={{ width: "66.66%" }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Langkah {currentStep}/{totalSteps}
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pilih Nominal
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => handleViewChange("DIAMOND")}
                  className={`px-6 py-2 text-sm font-semibold rounded-lg shadow-md focus:outline-none ${
                    activeView === "DIAMOND"
                      ? "text-white bg-orange-500"
                      : "text-gray-600 bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Diamond
                </button>

                <button
                  onClick={() => handleViewChange("PASS")}
                  className={`px-6 py-2 text-sm font-semibold rounded-lg shadow-md focus:outline-none ${
                    activeView === "PASS"
                      ? "text-white bg-orange-500"
                      : "text-gray-600 bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Twilight Pass
                </button>

                <button className="px-6 py-2 text-sm font-semibold text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed">
                  Battle Pass
                </button>
              </div>

              {/* Render data dinamis berdasarkan tab yang aktif */}
              {activeView === "DIAMOND" && (
                <div className="animate-fade-in grid grid-cols-2 md:grid-cols-3 gap-4">
                  {diamondPackages.length > 0 ? (
                    diamondPackages.map((pkg) => (
                      <div
                        key={pkg.id_packages}
                        onClick={() => handleSelect(pkg)}
                        className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 h-28 flex flex-col items-center justify-center ${
                          selectedItem?.id_packages === pkg.id_packages
                            ? "border-orange-500 bg-orange-50 shadow-lg"
                            : "border-gray-300 bg-white hover:border-orange-400"
                        }`}
                      >
                        <p className="font-bold text-center text-gray-800">
                          {pkg.name}
                        </p>
                        <p className="text-sm text-center text-gray-500 mt-1">
                          Rp {pkg.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-full text-center text-gray-500">
                      Tidak ada paket diamond tersedia.
                    </p>
                  )}
                </div>
              )}

              {activeView === "PASS" && (
                <div className="animate-fade-in grid grid-cols-2 md:grid-cols-3 gap-4">
                  {passPackages.length > 0 ? (
                    passPackages.map((pkg) => (
                      <div
                        key={pkg.id_packages}
                        onClick={() => handleSelect(pkg)}
                        className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 h-28 flex flex-col items-center justify-center ${
                          selectedItem?.id_packages === pkg.id_packages
                            ? "border-orange-500 bg-orange-50 shadow-lg"
                            : "border-gray-300 bg-white hover:border-orange-400"
                        }`}
                      >
                        <p className="font-bold text-center text-gray-800">
                          {pkg.name}
                        </p>
                        <p className="text-sm text-center text-gray-500 mt-1">
                          Rp {pkg.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-full text-center text-gray-500">
                      Tidak ada paket pass tersedia.
                    </p>
                  )}
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
                        <span className="font-normal">{selectedItem.name}</span>
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
                        className="w-full py-3 px-6 bg-orange-500 text-white font-bold rounded-lg ..."
                      >
                        Lanjut
                      </button>
                      <button
                        onClick={prevStep}
                        className="w-full py-3 px-6 bg-white text-orange-500 font-bold rounded-lg border ..."
                      >
                        Kembali
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 pt-6 w-full border-t border-gray-200 text-center text-gray-500">
                  <p>Silakan pilih nominal untuk melanjutkan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
