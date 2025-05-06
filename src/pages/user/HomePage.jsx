import React from "react";
import { InputSearch } from "../../components/navigation-bar/input-search";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { ProductCard } from "../../components/card/product-card";
import { Autoplay } from "swiper/modules";
export const HomePage = () => {
  const { keyword } = useParams();

  return (
    <>
    {/* Hero Section */}
  <section className="bg-[#A1E3F9] py-16 px-6 md:px-16">
  <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
    {/* LEFT - Text */}
    <div className="md:w-1/2">
      <p className="text-blue-500 font-medium uppercase mb-2">Welcome to 77TopUp</p>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Topup Murah Proses Cepat</h1>
      <p className="text-gray-700 mb-6">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, aut esse aliquam labore voluptatem cumque laborum. 
        Fuga reiciendis ut laboriosam aut iste facilis voluptates officiis, incidunt itaque nihil nostrum similique!
      </p>
      <div className="w-full">
        <InputSearch />
      </div>
    </div>

    {/* RIGHT - IMAGE SWIPER */}
   <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
      <Swiper
        modules={[Pagination,Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        speed={6000}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          reverseDirection: false,
          pauseOnMouseEnter: false,
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide><img src="/public/I2.png" alt="" className="w-full h-72 md:h-96 object-cover" /></SwiperSlide>
        <SwiperSlide><img src="/public/Honkai.png" alt="" className="w-full h-72 md:h-96 object-cover" /></SwiperSlide>
        <SwiperSlide><img src="/public/MLBB.png" alt="" className="w-full h-72 md:h-96 object-cover" /></SwiperSlide>
        <SwiperSlide><img src="/public/PUBG.png" alt="" className="w-full h-72 md:h-96 object-cover" /></SwiperSlide>
      </Swiper>
    </div>
  </div>
</section>


    {/* Product Card */}
    <section className="p-10 bg-[#D1F8EF] min-h-screen">
  <div className="max-w-7xl mx-auto px-4">
    
    {/* Judul/Kategori */}
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="bg-[#525FE1] text-white font-semibold px-4 py-2 rounded">
        Game 
      </div>
    </div>

    {/* Card Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ProductCard image="/public/Genshin2.png"  title="Genshin Impact" />
        <ProductCard image="/public/MLBB.png"  title="Mobile Legends"/>
        <ProductCard image="/public/I3.png"  title="PUBG Mobile"/>
        <ProductCard image="/public/Honkai.png"  title="Honkai Star Rail"/>
    </div>
  </div>
</section>
    </>
  );
};
