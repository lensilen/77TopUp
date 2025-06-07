import React, { useState, useEffect } from "react";
// PENTING: Impor Link untuk navigasi
import { Link } from "react-router-dom"; // Updated import to 'react-router-dom' for Link
import { InputSearch } from "../../components/navigation-bar/input-search";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { ProductCard } from "../../components/card/product-card";

export const HomePage = () => {
  // LANGKAH 1: Definisikan state yang diperlukan
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // LANGKAH 2: Ambil data dari backend saat komponen dimuat
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // PENTING: Ganti dengan URL API backend Anda yang sebenarnya
        const response = await fetch('https://77-top-up-be.vercel.app/77topup/homepage'); 
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server.');
        }
        const data = await response.json();
        
        // Sesuai dengan backend Anda, array game ada di dalam properti `games`
        setGames(data.games); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // Dependensi kosong [] berarti efek ini hanya berjalan sekali

  
  // Fungsi bantuan untuk me-render konten produk
  const renderProductCards = () => {
    // Tampilkan status loading
    if (loading) {
      return <p className="text-white text-center col-span-full">Memuat game...</p>;
    }

    // Tampilkan pesan error jika ada
    if (error) {
      return <p className="text-red-400 text-center col-span-full">Error: {error}</p>;
    }

    // Jika tidak ada game, tampilkan pesan
    if (games.length === 0) {
        return <p className="text-white text-center col-span-full">Belum ada game yang tersedia.</p>;
    }

    // LANGKAH 3: Tampilkan data game secara dinamis menggunakan .map()
    return games.map((game) => (
      // Correctly using Link from 'react-router-dom'
      <Link to={`/TopUp/${game.slug}`} key={game.slug}>
        <ProductCard
          image={game.image} // Gunakan field 'image' dari backend
          title={game.name}   // Gunakan field 'name' dari backend
          slug={game.slug}    // Gunakan field 'slug' dari backend
        />
      </Link>
    ));
  };


  return (
    <>
      {/* Hero Section (Tidak diubah) */}
      <section className="bg-[#34e0a1] py-16 px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
          {/* LEFT - Text */}
          <div className="md:w-1/2">
            <p className="text-blue-500 font-medium uppercase mb-2">
              Welcome to 77TopUp
            </p>
            <h1 className="text-4xl font-extrabold text-[#00000]">
              Topup Murah Proses Cepat
            </h1>
            <p className="text-gray-700 mb-6">
              Platform top up game dan kebutuhan digital terhoki! Dapatkan harga termurah untuk Diamond Mobile Legends, UC PUBG, Valorant Points, dan ratusan game lainnya. Proses? Cukup hitungan detik! Transaksi sat-set, aman, dan online 24 jam.
            </p>
            <div className="w-full">
              <InputSearch />
            </div>
          </div>

          {/* RIGHT - IMAGE SWIPER */}
          <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
            <Swiper
              modules={[Pagination, Autoplay]}
              loop={true}
              pagination={{ dynamicBullets: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
               <SwiperSlide>
                 <img src="/I2.png" alt="Game Banner 1" className="w-full h-72 md:h-96 object-cover"/>
               </SwiperSlide>
               <SwiperSlide>
                 <img src="/Honkai.png" alt="Game Banner 2" className="w-full h-72 md:h-96 object-cover"/>
               </SwiperSlide>
               <SwiperSlide>
                 <img src="/MLBB.png" alt="Game Banner 3" className="w-full h-72 md:h-96 object-cover"/>
               </SwiperSlide>
               <SwiperSlide>
                 <img src="/PUBG.png" alt="Game Banner 4" className="w-full h-72 md:h-96 object-cover"/>
               </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Product Card Section */}
      <section className="p-10 bg-[#163300] min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-[#525FE1] text-white font-semibold px-4 py-2 rounded">
              Game
            </div>
          </div>

          {/* Card Produk - Kontennya sekarang dipanggil dari fungsi renderProductCards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {renderProductCards()}
          </div>
        </div>
      </section>
    </>
  );
};
