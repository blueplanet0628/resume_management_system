'use client';

import { useState } from 'react';

export default function RegisterForm() {
  const [agree, setAgree] = useState(false);

  return (
    <>
        <form className="max-w-2xl mx-auto py-[50px] px-[90px] bg-white rounded-xl shadow-md space-y-6 border border-gray-200">

            <div>
                <label className="text-sm font-medium text-black"> メールアドレス／会員ID</label>
                <input type="email" placeholder="sample@gmail.com" className="input border rounded-xl border-[#868282] py-[13px] pl-[20px] mt-1 w-full" />
            </div>


        </form>
   

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={!agree}
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          再設定 <span className="ml-1">▶</span>
        </button>
      </div>
    </>
      
  );
}
