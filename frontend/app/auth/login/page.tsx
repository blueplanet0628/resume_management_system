'use client';

import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '@/lib/firebase'; // Your Firebase config
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(true); // You can toggle if needed
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
  
      // ✅ Save token to localStorage
      localStorage.setItem('token', idToken);
  
      // Optionally send token to FastAPI backend
      const res = await axios.post('http://localhost:9000/auth/login', {
        idToken,
      });
  
      setMessage('✅ ログイン成功！');
      console.log(res.config.data, 'res');
  
      if (res.status === 200) {
        router.push('/users');
      }
    } catch (error: any) {
      console.error(error);
      setMessage('❌ ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="max-w-2xl mx-auto py-[50px] px-[90px] bg-white rounded-xl shadow-md space-y-6 border border-gray-200"
      >
        <div>
          <label className="text-sm font-medium text-black">メールアドレス/会員ID</label>
          <input
            type="email"
            placeholder="sample@gmail.com"
            className="input border rounded-xl border-[#868282] py-[13px] pl-[20px] mt-1 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-black">パスワード</label>
          <input
            type="password"
            placeholder="半角英数字混在で8文字以上"
            className="input border rounded-xl border-[#868282] py-[13px] pl-[20px] w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* パスワード再設定リンク */}
        <div className="flex items-center justify-center text-sm pt-4">
          <p className="mr-2">パスワードをお忘れですか？</p>
          <a href="/auth/repassword" className="text-blue-500 underline">パスワード再設定</a>
        </div>

        {/* ログインボタン */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={!agree}
            className={`px-8 py-3 rounded-full font-semibold transition ${
              agree
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-white cursor-not-allowed'
            }`}
          >
            ログイン <span className="ml-1">▶</span>
          </button>
        </div>

        {/* メッセージ表示 */}
        {message && (
          <p className="text-center text-sm mt-4 text-red-500">{message}</p>
        )}
      </form>
    </>
  );
}
