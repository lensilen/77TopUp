import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export const GameList = ({ slug }) => {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://77-top-up-be.vercel.app/77topup/homepage`
        );

        if (!res.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }

        const json = await res.json();
        console.log("Game data:", json);

        const newGame = {
          name: "Add New Game",
          image: "https://placehold.co/600x400?text=%2B",
          ihsangan_slug: "new-game",
          isactive: false,
          type: "Unknown",
        };

        // Tambahkan ke state setelah fetch selesai
        setGamesData([...json.games, newGame]);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Daftar Game</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Gambar</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Tipe</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {gamesData?.map((game, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  {game.ihsangan_slug !== "new-game" ? (
                    game.name
                  ) : (
                    <Link
                      to="/admin/games/new-game"
                      className="text-blue-500 hover:underline"
                    >
                      Add New Game
                    </Link>
                  )}
                </td>

                {game.ihsangan_slug !== "new-game" && (
                  <>
                    <td className="px-4 py-2">{game.ihsangan_slug}</td>
                    <td className="px-4 py-2">{game.type}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          game.isactive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {game.isactive ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <Link to={`/admin/games/${game.ihsangan_slug}`}>
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                      </Link>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
