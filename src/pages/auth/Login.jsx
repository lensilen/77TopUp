import React from "react";
import { Link } from "react-router";

export const Login = () => {
  return (
    <div className="grid place-items-center h-screen bg-[#d0f8ef]">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[#3774b5]">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn w-full max-w-xs bg-[#3774b5] text-white hover:bg-[#2d5a8f]">
          Login
        </button>
        <p className="text-center text-sm">
          Belum memiliki akun?{" "}
          <Link to="/auth/register">
            <span className="font-bold text-[#3774b5] hover:text-[#2d5a8f] cursor-pointer underline">
              Daftar di sini!
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
