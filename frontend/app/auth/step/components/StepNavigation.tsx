import React from 'react';

const steps = ['今までに在籍した会社情報を入力してください', 'スキル・資格を入力してください', '自己PRを入力してください', '職務要約を入力してください', '作成した職務経歴書の内容を確認してください', '作成した職務経歴書の内容を確認してください'];

export default function StepNavigation({ current }: { current: number }) {
  return (
    <div className="w-full py-8 px-4">
      {/* Page Title */}
      <h2 className="text-center text-lg font-semibold mb-6">{steps[current]}</h2>

      {/* Step Container */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Connecting Lines */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 z-0" />

        {/* Circles */}
        <div className="relative z-10 flex justify-between">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold
                ${index === current ? 'bg-orange-500' : 'bg-gray-400'}
              `}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
