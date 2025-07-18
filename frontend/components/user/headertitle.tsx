"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Headertitle = () => {
  const pathname = usePathname();

  // Determine the page type based on the current URL
  const isRegister = pathname.includes("/register");
  const isLogin = pathname.includes("/login");

  let pageTitle = "";
  if (isRegister) {
    pageTitle = "会員登録";
  } else if (isLogin) {
    pageTitle = "ログイン";
  } else {
    pageTitle = "ページ";
  }

  return (
    <header className="w-full flex gap-3 text-[16px] justify-left items-center bg-[#FCF9F4] h-[70px] pl-[136px] shadow-md hide-under-756">
      <a href="/users">TOP</a>
      <span>＞</span>
      <span>マイページ</span>
    </header>
  );
};

export default Headertitle;