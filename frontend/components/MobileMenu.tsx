'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bottom Fixed Bar */}
      <div className="fixed bottom-0 left-0 flex w-[100%] max-w-[768px] items-center md:hidden z-50">
        <button onClick={() => setIsOpen(true)} className="text-white h-[60px] w-[60px]  px-4 py-3 bg-[#4D433F]">
          <Menu size={24} />
        </button>
        <span className="text-white font-semibold h-[60px] pl-4 flex justify-center items-center bg-[#FF733E]">
          Webで簡単！添削サービスに申し込む
        </span>
      </div>

      {/* Slide Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-6 text-gray-800">
          <a href="#">私たちについて</a>
          <a href="#">サービスの流れ</a>
          <a href="#">転職成功事例</a>
          <a href="#">料金体系</a>
          <a href="#">FAQ</a>
          <button className="bg-orange-500 text-white py-2 rounded-full mt-4">
            添削サービスに申し込む
          </button>
          <button className="border border-gray-500 text-gray-700 py-2 rounded-full mt-2">
            ログイン
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
