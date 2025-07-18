'use client';

import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

export default function ServiceCards() {
  return (
    <div className="flex flex-col md:flex-row gap-6 mx-auto pt-4">
      {/* Left Card */}
      <div className="flex-1 bg-white border rounded-xl shadow-sm p-4">
        <h2 className="font-bold text-sm mb-4">各サービスを利用する</h2>
        <div className="space-y-3">
          {[
            { text: '職務経歴書に関するアドバイス', href: '/career/preview' },
            { text: '面接に関するアドバイス', href: '/interview' },
            { text: '企業からのスカウト確認', href: '/scouts/company' },
          ].map(({ text, href }, idx) => (
            <Link href={href} key={idx}>
              <button className="w-full flex items-center justify-between px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
                <span>{text}</span>
                <FaChevronRight className="text-gray-400 text-xs" />
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Card */}
      <div className="flex-1 bg-white border rounded-xl shadow-sm p-4">
        <h2 className="font-bold text-sm mb-4">登録情報について</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: 'プロフィール', href: '/users/myinfo/registerdata#name' },
            { label: '経歴', href: '/users/myinfo/registerdata#history' },
            { label: '希望条件', href: '/users/myinfo/registerdata#hope' },
            { label: '履歴書', href: '/users/myinfo/registerdata#resume' },
          ].map(({ label, href }, idx) => (
            <Link href={href} key={idx}>
              <button className="flex items-center justify-between px-4 py-2 border rounded-md hover:bg-gray-50 w-full">
                <span>{label}</span>
                <FaChevronRight className="text-gray-400 text-xs" />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
