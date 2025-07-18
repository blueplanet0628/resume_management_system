"use client"
import React from "react";
import { useRouter } from 'next/navigation';


const Header = () => {

  const router = useRouter();
  const login = () => {
    router.push('/auth/login');
  }
  const register = () => {
    router.push('/auth/register');
  }

    return (
      <header className="w-full bg-white shadow-md hide-under-756">
        <div className="flex items-center justify-between h-20 px-6 md:px-12 lg:px-16">
          {/* Left Logo */}
          <div className="flex items-center">
            <img src="/logo/logo_top.png" alt="Logo" className="h-10 w-[210px] mr-3" />
            {/* <p className="text-2xl font-semibold">Trumee</p> */}
          </div>
  
          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            <button onClick={login} className="px-4 py-2 text-sm border border-gray-400 rounded-full text-black hover:bg-gray-100 transition">
              ログイン
            </button>
            <button onClick={register} className="bg-[#FF733E] text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-[#e9632e] transition">
              登録する
            </button>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  