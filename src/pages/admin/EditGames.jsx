import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { useParams } from "react-router";

export default function EditGames() {
  const { slug } = useParams();
  const [game, setGame] = useState({});
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://77-top-up-be.vercel.app/77topup/${slug}`
        );
        if (!res.ok) throw new Error("Gagal mengambil data dari server.");

        const json = await res.json();
        setGame(json.game);
        setPackages(json.packages || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Edit Game</h3>

        {/* Editable 1 - Game */}
        <div className="relative">
          <div className="flex items-center gap-6 bg-green-300">
            <img
              src={game.image}
              alt={game.name}
              className="w-32 h-32 object-cover rounded-lg shadow"
            />
            <div>
              <h1 className="text-3xl font-semibold">{game.name}</h1>

              <p className="text-gray-600">
                Slug: <span className="font-mono">{game.ihsangan_slug}</span>
              </p>

              <p className="mt-1">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    game.isactive
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {game.isactive ? "Aktif" : "Tidak Aktif"}
                </span>
              </p>
            </div>
          </div>

          {/* Edit Icon 1 */}
          <div className="absolute inset-y-0 right-0 p-1 mt-1 mr-1 hover:bg-slate-300 hover:cursor-pointer w-fit h-fit rounded-full">
            <RiEdit2Fill size={25} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Daftar Paket</h3>
        {packages.length === 0 ? (
          <p className="text-gray-500">Belum ada paket tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Editable 2 - Package Item */}
            {packages.map((pkg) => (
              <div key={pkg.id_packages} className="relative">
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="text-lg font-semibold mt-3">{pkg.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {pkg.description}
                  </p>
                  <p className="mt-2 text-blue-700 font-medium">
                    Rp {pkg.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm mt-1">
                    Tag: <span className="italic">{pkg.tag}</span>
                  </p>
                  <p className="mt-1">
                    Status:{" "}
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        pkg.isactive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pkg.isactive ? "Aktif" : "Nonaktif"}
                    </span>
                  </p>
                </div>

                {/* Edit Icon 1 */}
                <div className="absolute inset-y-0 right-0 p-1 mt-1 mr-1 bg-white hover:bg-slate-300 hover:cursor-pointer w-fit h-fit rounded-full">
                  <RiEdit2Fill size={25} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
