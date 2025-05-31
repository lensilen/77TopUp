import React from "react";
import { Link } from "react-router";

export const Register = () => {
  return (
    <div className="grid place-items-center h-screen bg-[#d0f8ef]">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[#3774b5]">
          Register
        </h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn w-full max-w-xs bg-[#3774b5] text-white hover:bg-[#2d5a8f]">
          Register
        </button>
        <p className="text-center text-sm">
          Sudah memiliki akun?{" "}
          <Link to="/auth/login">
            <span className="font-bold text-[#3774b5] hover:text-[#2d5a8f] cursor-pointer underline">
              Masuk
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
