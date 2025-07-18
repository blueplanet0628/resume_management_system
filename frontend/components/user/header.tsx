"use client"
import React from "react";
import { useRouter } from 'next/navigation';


const Header = () => {

  const router = useRouter();
  const mypage = () => {
    // router.push('/user/logout');
  }
  const logout = () => {
    localStorage.removeItem('token'); // Clear the token
    router.push('/dashboard');        // Redirect to dashboard or login page
  };

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
            <button onClick={mypage}>
            マイページ
            </button>
            <button onClick={logout} className="px-4 py-2 text-sm border border-gray-400 rounded-full text-black hover:bg-gray-100 transition">
            ログアウト
            </button>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  