'use client';

import { FaChevronRight } from 'react-icons/fa';

interface NotificationItem {
  message: string;
  href: string;
}

const notifications: NotificationItem[] = [
  { message: '職務経歴書に関するアドバイスに新しいコメントがあります。', href: '#' },
  { message: '面接に関するアドバイスに新しいコメントがあります。', href: '#' },
  { message: '面接に関するアドバイスに新しいコメントがあります。', href: '#' },
];

export default function NotificationPanel() {
  return (
    <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="bg-[#3A2E20] text-white text-sm font-bold px-4 py-2">
        お知らせ
      </div>
      {notifications.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 border-t hover:bg-gray-50"
        >
          <span>{item.message}</span>
          <FaChevronRight className="text-gray-400 text-xs" />
        </a>
      ))}
    </div>
  );
}
