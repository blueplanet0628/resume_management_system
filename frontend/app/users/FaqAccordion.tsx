'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  { question: '質問内容が入ります。', answer: '回答内容が入ります。' },
  { question: '質問内容が入ります。', answer: '回答内容が入ります。' },
  { question: '質問内容が入ります。', answer: '回答内容が入ります。' },
  { question: '質問内容が入ります。', answer: '回答内容が入ります。' },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // 最初だけ開く

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="w-full bg-[#FDF8F3] rounded-lg border mt-5 border-gray-200 overflow-hidden">
      <div className="bg-[#3D2B1F] text-white px-4 py-2 font-semibold text-sm">よくある質問</div>

      {faqData.map((item, index) => (
        <div key={index} className="border-t border-[#EEE5D8]">
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium"
          >
            <span className="text-[#3D2B1F]">{item.question}</span>
            <span className="text-[#3D2B1F]">
              {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
            </span>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-3 text-sm text-[#666]"> {item.answer} </div>
          )}
        </div>
      ))}
    </div>
  );
}
