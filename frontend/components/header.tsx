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
            <img src="/logo/Rectangle 289.png" alt="Logo" className="h-10 w-10 mr-3" />
            <p className="text-2xl font-semibold">Trumee</p>
          </div>
  
          {/* Center Nav (hide under 1385px) */}
          <nav className="flex gap-8 hide-under-1385 text-sm font-medium text-gray-700">
            <a href="#">私たちについて</a>
            <a href="#">サービスの流れ</a>
            <a href="#">転職成功事例</a>
            <a href="#">料金体系</a>
            <a href="#">FAQ</a>
          </nav>
  
          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            <img src="/logo/アセット 6@3x.png" alt="Logo" className="h-10 w-auto mr-2 hide-under-800" />
            <button onClick={register} className="bg-[#FF733E] text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-[#e9632e] transition">
              添削サービスに申し込む
            </button>
            <button onClick={login} className="px-4 py-2 text-sm border border-gray-400 rounded-full text-black hover:bg-gray-100 transition">
              ログイン
            </button>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  