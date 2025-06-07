import React, { useState } from "react";
import { InputSearch } from "./input-search";
import { DropdownLink } from "./dropdown-link";
import { Link, useLocation } from "react-router";
import { FaClipboardList, FaGamepad, FaHome, FaRegCreditCard } from "react-icons/fa";

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State untuk modal
  const [modalType, setModalType] = useState("login"); // Set modalType default ke "login"

  // State untuk menyimpan data yang diambil dari API
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tambahkan state untuk status login

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Tambahkan state untuk status admin login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "", // Menambahkan username untuk registrasi
    confirmPassword: "", // Menambahkan confirm password untuk registrasi
    otp: "", // Field untuk OTP setelah login admin
  });

  // Navbar status
  const userRole = "user"; // "user" or "admin"

  // Navbar user
  const isHomeActive = userRole === "user" && location.pathname === "/";
  const isCekTransaksiActive = userRole === "user" && location.pathname === "/transaksi";

  // Navbar admin
  const isAdminGamesActive = userRole === "admin" && location.pathname === "/admin/games";
  const isAdminPaymentsActive = userRole === "admin" && location.pathname === "/admin/payments";

  // List halaman yang search bar tidak akan muncul
  const hiddenPaths = ["/"];

  // Fungsi untuk membuka modal login
  const openLoginModal = () => {
    setModalType("login");
    setIsOpen(true);
  };

  // Fungsi untuk handle login dan fetch data dari API
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    setApiData(null);

    if (formData.email === "tujuhtujuhtopupgas@gmail.com" && formData.password === "77TopupGas") {
      // Handle Admin Login
      setIsAdminLoggedIn(true); // Set login admin
      setModalType("otp"); // Buka modal OTP setelah login admin
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://77-top-up-be.vercel.app/77topup/sign-in", // Pastikan URL benar
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email, // Mengirimkan email dari form
            password: formData.password, // Mengirimkan password dari form
          }),
        }
      );
      const data = await res.json();
      console.log(data); // Debug data yang diterima dari server

      if (data?.email && data?.password) {
        setApiData(data); // Menyimpan data login yang diterima
        setIsLoggedIn(true); // Set status login menjadi true
        setModalType("login"); // Setelah login, modal akan berpindah ke login
      } else {
        setError("Akun tidak ditemukan atau password salah.");
      }
    } catch (err) {
      setError("Gagal menghubungi server login. Coba lagi nanti.");
    }

    setLoading(false); // Berhenti loading setelah selesai
  };

  // Fungsi untuk handle OTP setelah login admin
  const handleOTP = async () => {
    if (formData.otp === "123456") {
      alert("OTP Valid! Welcome Admin!");
      setModalType("adminDashboard");
    } else {
      setError("Invalid OTP, please try again.");
    }
  };

  // Fungsi untuk handle registrasi dan fetch
  const handleRegister = async () => {
    setLoading(true);
    setError("");
    setApiData(null);

    // Validasi password dan confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan confirm password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://77-top-up-be.vercel.app/77topup/sign-up", // URL untuk registrasi
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Menyatakan data dalam format JSON
          },
          body: JSON.stringify({
            email: formData.email, // Kirim email
            username: formData.username, // Kirim username
            password: formData.password, // Kirim password
            confirmPassword: formData.confirmPassword, // Kirim password confirm
          }),
        }
      );

      if (res.status === 201) {
        const data = await res.json();
        console.log(data); // Debug data yang diterima

        if (data?.data?.email && data?.data?.username && data?.data?.password) {
          setApiData(data.data); // Menyimpan data user yang berhasil didaftarkan
          setModalType("login"); // Pindah ke modal login setelah registrasi berhasil
        } else {
          setError(
            "Registrasi gagal. Periksa kembali data yang Anda masukkan."
          );
        }
      } else {
        setError("Gagal registrasi. Coba lagi nanti.");
      }
    } catch (err) {
      setError("Gagal menghubungi server registrasi. Coba lagi nanti.");
    }

    setLoading(false); // Berhenti loading setelah selesai
  };

  return (
    <div className="navbar bg-base-200 shadow-sm border-b border-base-300 pb-2 pt-2 pl-5 pr-5 sticky z-50">
      <div className="flex flex-1 items-center gap-20">
        <Link to="/">
          <img
            alt="77TopUp Logo"
            src="/77topup_logo_1b.png"
            className="min-w-52 w-52 hover:drop-shadow-sm active:translate-y-[0.5px]"
          />
        </Link>
        {!hiddenPaths.includes(location.pathname) && (
          <div className="flex-1">
            <InputSearch />
          </div>
        )}
      </div>

      {/* Nav bagian kanan */}
      <div className="flex gap-6">
        {(userRole === "user" && (
          <>
            <Link
              to="/"
              className={
                "flex gap-2 rounded-md items-center select-none pr-4 pl-4 text-base font-semibold hover:drop-shadow-sm active:translate-y-[0.5px]" +
                (isHomeActive && " text-red-700")
              }
            >
              <FaHome size={20}></FaHome>
              <span>Beranda</span>
            </Link>

            <Link
              to="/transaksi"
              className={
                "flex gap-2 rounded-md items-center select-none pr-4 pl-4 text-base font-semibold hover:drop-shadow-sm active:translate-y-[0.5px]" +
                (isCekTransaksiActive && " text-red-700")
              }
            >
              <FaClipboardList size={20} />
              <span>Cek Transaksi</span>
            </Link>
          </>
        )) ||
          (isLoggedIn && userRole === "admin" && (
            <>
              <Link
                to="/admin/games"
                className={
                  "flex gap-2 rounded-md items-center select-none pr-4 pl-4 text-base font-semibold hover:drop-shadow-sm active:translate-y-[0.5px]" +
                  (isAdminGamesActive && " text-red-700")
                }
              >
                <FaGamepad size={20} />
                <span>Edit Games</span>
              </Link>

              <Link
                to="/admin/payments"
                className={
                  "flex gap-2 rounded-md items-center select-none pr-4 pl-4 text-base font-semibold hover:drop-shadow-sm active:translate-y-[0.5px]" +
                  (isAdminPaymentsActive && " text-red-700")
                }
              >
                <FaRegCreditCard size={20} />
                <span>Payments</span>
              </Link>
            </>
          ))}
        {/* Tombol Masuk */}
        {!isLoggedIn ? (
          <button
            onClick={openLoginModal} // Membuka modal login saat tombol masuk diklik
            className="btn btn-secondary text-base"
          >
            Masuk
          </button>
        ) : null}{" "}
        {/* Tombol Masuk akan hilang setelah login */}
      </div>

      {/* Modal Login */}
      {isOpen && modalType === "login" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6">
            <h1 className="text-2xl font-bold text-center text-[#3774b5]">
              Login
            </h1>
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                onClick={handleLogin}
                className="btn w-full max-w-xs bg-[#3774b5] text-white hover:bg-[#2d5a8f]"
              >
                Login
              </button>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {apiData && (
                <p className="text-green-500">Welcome {apiData.email}!</p>
              )}
              <p className="text-center text-sm">
                Belum memiliki akun?{" "}
                <span
                  className="font-bold text-[#3774b5] hover:text-[#2d5a8f] cursor-pointer underline"
                  onClick={() => setModalType("register")} // Mengubah modal menjadi register
                >
                  Daftar di sini!
                </span>
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)} // Menutup modal
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-700 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Modal OTP Admin */}
      {isOpen && modalType === "otp" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6">
            <h1 className="text-2xl font-bold text-center text-[#3774b5]">
              Enter OTP
            </h1>
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="OTP"
                className="input input-bordered w-full max-w-xs"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
              />
              <button
                onClick={handleOTP} // Memproses OTP setelah admin login
                className="btn w-full max-w-xs bg-[#3774b5] text-white hover:bg-[#2d5a8f]"
              >
                Verify OTP
              </button>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
            </div>

            <button
              onClick={() => setIsOpen(false)} // Menutup modal
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-700 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Modal Register */}
      {isOpen && modalType === "register" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6">
            <h1 className="text-2xl font-bold text-center text-[#3774b5]">
              Register
            </h1>
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full max-w-xs"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <button
                onClick={handleRegister} // Panggil fungsi handleRegister untuk registrasi
                className="btn w-full max-w-xs bg-[#3774b5] text-white hover:bg-[#2d5a8f]"
              >
                Register
              </button>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {apiData && (
                <p className="text-green-500">Welcome {apiData.username}!</p>
              )}
              <p className="text-center text-sm">
                Sudah memiliki akun?{" "}
                <span
                  className="font-bold text-[#3774b5] hover:text-[#2d5a8f] cursor-pointer underline"
                  onClick={() => setModalType("login")} // Mengubah modal menjadi login
                >
                  Masuk
                </span>
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)} // Menutup modal
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-700 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
