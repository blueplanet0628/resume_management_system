'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterSuccessForm() {
    const router = useRouter();

    const submit = () => {
        router.push('/auth/history')
    }

  return (
    <>
        <div className="flex flex-col items-center justify-center bg-white px-4 text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                本登録が完了しました。
            </h1>
            <p className="text-gray-600 mb-8">
                あなたのサポートを行うため、職務経歴などといった詳しい経験を登録します。
            </p>
            <button onClick={submit} type='button' className="bg-[#FF733E] text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition flex items-center gap-2">
                登録する
                <span className="text-sm">▶︎</span>
            </button>
        </div>
    </>
      
  );
}
