// src/App.js

import { Route, Routes } from "react-router"; // Ini harus dari "react-router-dom"
import NotFound from "./pages/NotFound";
import { RootLayout } from "./layout/RootLayout";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { HomePage } from "./pages/user/HomePage";
import { GameList } from "./pages/admin/GameList";
import { TopUp } from "./pages/user/TopUp";
import Dashboard from "./pages/admin/Dashboard";
import EditGames from "./pages/admin/EditGames";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/topup/:slug" element={<TopUp />} />
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/games" element={<GameList />}></Route>
          <Route path="/admin/games/:slug" element={<EditGames />}></Route>
          <Route path="/transaksi"></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
