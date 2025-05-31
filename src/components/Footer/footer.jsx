import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#161E54] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0 text-center md:text-left">
          <div>
            <img
              src="/77topup_logo_1b.png"
              alt="77TopUp Logo"
              className="mx-auto md:mx-0 mb-4 w-40"
            />
            <p className="text-white text-sm font-normal">
              Kami menyediakan layanan top up game yang cepat dan aman untuk
              berbagai game populer seperti Mobile Legends, Genshin Impact, dan
              PUBG Mobile. Dengan pengalaman lebih dari 70 tahun, kami menjamin
              transaksi yang mudah dan terpercaya. Nikmati pengalaman bermain
              game tanpa gangguan dengan layanan top up terbaik dari kami.
            </p>
            <p className="mt-6">
              <span className="font-bold">Info layanan pelanggan :</span>
              <br />
              089876543210 (WA)
              <br />
              tujuhtujuhtopup@gmail.com (Email)
            </p>
            <p>
              Info layanan pelanggan : 089876543210 (WA)
              tujuhtujuhtopup@gmail.com (Email)
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end text-center md:text-right space-y-2">
          <div>
            <img
              src="/tiktok.png"
              alt="TikTok"
              className="mx-auto md:mx-0 mb-4 w-10 hover:scale-110 transition-all duration-200"
            />

            <a
              href="https://instagram.com/yourlink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:scale-110 transition-all duration-200"
            >
              <img
                src="/instagram.png"
                alt="Instagram"
                className="mx-auto w-8 mb-4 hover:scale-110 transition-all duration-200"
              />
            </a>

            <a
              href="https://x.com/yourlink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:scale-110 transition-all duration-200"
            >
              <img
                src="/twitter.png"
                alt="X"
                className="mx-auto w-8 mb-4 hover:scale-110 transition-all duration-200"
              />
            </a>

            <a
              href="https://facebook.com/yourlink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:scale-110 transition-all duration-200"
            >
              <img
                src="/facebook.png"
                className="mx-auto w-8 mb-4 hover:scale-110 transition-all duration-200"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-white">
          © 2025 77TopUp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
