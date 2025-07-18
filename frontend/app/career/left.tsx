'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: '職務経歴書の添削', href: '/career/preview' },
  { label: '印刷する', href: '/career/print' },
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
