// src/components/card/product-card.jsx

import React from "react";
// --- PERHATIKAN PERUBAHAN DI SINI: import dari "react-router" ---
import { Link } from "react-router"; // <--- INI PENTING!

export const ProductCard = ({ title, description, image, slug }) => {
  // Console log ini bagus untuk debugging, bisa dihapus nanti jika sudah yakin
  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Image:", image); // Tambahkan log untuk image juga
  console.log("Slug for Link:", slug); // Tambahkan log untuk slug juga

  return (
    // Path Link sudah benar: `/TopUo/${slug}` sesuai dengan rute di App.js
    <Link to={`/TopUp/${slug}`}>
      <div className="card bg-base-100 flex flex-wrap justify-between shadow-sm transition-transform hover:scale-[1.02]">
        <figure>
          <img
            src={image} // Pastikan 'image' prop Anda berisi URL gambar yang valid
            alt={title}
            // Anda bisa tambahkan kelas CSS di sini seperti yang disarankan sebelumnya:
            className="w-full h-40 object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};
