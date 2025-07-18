'use client';

import { useState } from 'react';

export default function Rightpage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。');
      return;
    }

    if (password !== confirm) {
      alert('確認用パスワードが一致しません。');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('ログイントークンが見つかりません。再度ログインしてください。');
      return;
    }

    try {
      const res = await fetch('http://localhost:9000/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword: password,
        }),
      });

      if (res.status === 200) {
        alert('パスワードを更新しました。');
        setPassword('');
        setConfirm('');
      } else {
        const data = await res.json();
        alert(data.detail || '更新に失敗しました。');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('予期せぬエラーが発生しました。');
    }
  };

  return (
    <>
      <h1 className="text-3xl">パスワードの変更</h1>
      <h2 className="text-xl mt-4 mb-5">登録したパスワードの変更ができます。</h2>
      <form onSubmit={handleSubmit} className="mx-auto py-6">
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            新規パスワード（6文字以上）
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            新規パスワード（確認）
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#FF6F3F] hover:bg-[#ff5a1f] text-white font-medium py-2 px-6 rounded-full flex items-center justify-center mx-auto transition"
        >
          保存する
          <span className="ml-2 text-lg">▶</span>
        </button>
      </form>
    </>
  );
}
