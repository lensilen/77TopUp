// src/App.js

import { Route, Routes } from "react-router"; // Ini harus dari "react-router-dom"
import NotFound from "./pages/NotFound";
import { RootLayout } from "./layout/RootLayout";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { HomePage } from "./pages/user/HomePage";
import { EditGames } from "./pages/admin/EditGames";
import { EditPayments } from "./pages/admin/EditPayments";
import { TopUp } from "./pages/user/TopUp";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/TopUp/:slug" element={<TopUp />} />
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          <Route path="/admin/games" element={<EditGames />}></Route>
          <Route path="/admin/payments" element={<EditPayments />}></Route>
          <Route path="/transaksi"></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
