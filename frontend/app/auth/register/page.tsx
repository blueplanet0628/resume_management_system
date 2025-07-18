'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      full_name: `${formData.get('lastName')} ${formData.get('firstName')}`,
      kana: `${formData.get('lastKana')} ${formData.get('firstKana')}`,
      gender: formData.get('gender'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      phone: `${formData.get('tel1')}-${formData.get('tel2')}-${formData.get('tel3')}`,
    };

    if (data.password !== data.confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/auth/register', {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        kana: data.kana,
        phone: data.phone,
        gender: data.gender

      });
      console.log(response);
      if(response.status == 200) {
        alert('登録成功！');
        router.push('/auth/registersuccess');
      }
    } catch (error: any) {
      alert('登録失敗: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto py-[50px] px-[90px] bg-white rounded-xl shadow-md space-y-6 border border-gray-200"
    >
      {/* 氏名 */}
      <div>
        <label className="text-sm font-medium text-black">
          <span className="bg-[#FF733E] p-1 rounded-md text-white">必須</span> 氏名
        </label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <input type="text" name="lastName" placeholder="山田" required className="border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
          <input type="text" name="firstName" placeholder="太郎" required className="border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
        </div>
      </div>

      {/* 氏名カナ */}
      <div>
        <label className="text-sm font-medium text-black">
          <span className="bg-[#FF733E] p-1 rounded-md text-white">必須</span> 氏名カナ（全角カナ）
        </label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <input type="text" name="lastKana" placeholder="ヤマダ" required className="border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
          <input type="text" name="firstKana" placeholder="タロウ" required className="border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
        </div>
      </div>

      {/* 性別 */}
      <div>
        <label className="text-sm font-medium text-black">
          <span className="bg-[#FF733E] p-1 rounded-md text-white">必須</span> 性別
        </label>
        <div className="mt-2 space-x-6">
          <label>
            <input type="radio" name="gender" value="male" required className="mr-1" />
            男性
          </label>
          <label>
            <input type="radio" name="gender" value="female" required className="mr-1" />
            女性
          </label>
        </div>
      </div>

      {/* メールアドレス */}
      <div>
        <label className="text-sm font-medium text-black">
          <span className="bg-[#FF733E] p-1 rounded-md text-white">必須</span> メールアドレス／会員ID
        </label>
        <input type="email" name="email" placeholder="sample@gmail.com" required className="mt-1 w-full border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
      </div>

      {/* パスワード */}
      <div>
        <label className="text-sm font-medium text-black">
          <span className="bg-[#FF733E] p-1 rounded-md text-white">必須</span> パスワード
        </label>
        <div className="space-y-2 mt-1">
          <input type="password" name="password" placeholder="半角英数字混在で8文字以上" required className="w-full border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
          <input type="password" name="confirmPassword" placeholder="確認用パスワード" required className="w-full border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
        </div>
      </div>

      {/* 電話番号 */}
      <div>
        <label className="text-sm font-medium text-black">
          <span className="bg-[#FF733E] p-1 rounded-md text-white">必須</span> 電話番号
        </label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <input type="text" name="tel1" placeholder="080" required className="border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
          <input type="text" name="tel2" placeholder="1234" required className="border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
          <input type="text" name="tel3" placeholder="5678" required className="border rounded-xl border-[#868282] py-[13px] pl-[20px]" />
        </div>
      </div>

      {/* 同意チェック */}
      <div className="flex items-center justify-center text-sm mt-[50px]">
        <input
          type="checkbox"
          name="agree"
          checked={agree}
          onChange={() => setAgree(!agree)}
          required
          className="mt-1 mr-2 accent-orange-500"
        />
        <p>
          <span className="text-orange-600 font-semibold">プライバシーポリシー</span>
          に同意の上、ご登録ください。
        </p>
      </div>

      {/* 送信ボタン */}
      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          送信する <span className="ml-1">▶</span>
        </button>
      </div>
    </form>
  );
}
