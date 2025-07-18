'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: 'TOP', href: '/users' },
  { label: '登録情報の確認・変更', href: '/users/myinfo/registerdata' },
  { label: 'パスワードの変更', href: '/users/myinfo/password' },
  { label: '支払い情報登録・変更', href: '/users/myinfo/payment' },
  { label: '有料プラン', href: '/users/myinfo/PaidPlans' },
];

export default function Leftpage() {
  const pathname = usePathname();

  return (
    <div className="bg-white border rounded-xl shadow-sm">
      {menuItems.map((item, index) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-100 ${
              isActive ? 'bg-gray-200 font-semibold' : ''
            }`}
          >
            <span>{item.label}</span>
            <FaChevronRight className="text-gray-400 text-xs" />
          </Link>
        );
      })}
    </div>
  );
}
