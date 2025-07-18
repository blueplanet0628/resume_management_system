'use client';

import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface FormData {
  firstName: string;
  lastName: string;
  kanaFirst: string;
  kanaLast: string;
  email: string;
  phone1: string;
  phone2: string;
  phone3: string;
  gender: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  address: string;
  educationSchool: string;
  educationDept: string;
  educationNote: string;
  expPeople: string;
  expJob: string;
  expIndustry: string;
  currentIncome: string;
  desiredLocation: string;
  desiredIncome: string;
  desiredJobs: string[];
  desiredIndustries: string[];
}

export default function RegisterForm() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        kanaFirst: '',
        kanaLast: '',
        email: '',
        phone1: '',
        phone2: '',
        phone3: '',
        gender: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        address: '',
        educationSchool: '',
        educationDept: '',
        educationNote: '',
        expPeople: '',
        expJob: '',
        expIndustry: '',
        currentIncome: '',
        desiredLocation: '',
        desiredIncome: '',
        desiredJobs: Array(6).fill(''),
        desiredIndustries: Array(6).fill(''),
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number,
    field: 'desiredJobs' | 'desiredIndustries'
  ) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };


  const handlesubmit = async () => {
    const payload = new FormData();
  
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => payload.append(key, v)); // ✅ Remove [i]
      } else {
        payload.append(key, value);
      }
    });
  
    if (file) payload.append('resume', file);
  
    // Debug output
    for (const pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const res = await axios.post('http://localhost:9000/auth/history', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (res.status === 200) {
        alert('送信が完了しました');
        // router.push('/auth/step/step1-profile')
      }
    } catch (err) {
      console.error(err);
      alert('送信に失敗しました');
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto py-10 px-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-200">
      <h2 className="text-[#FF733E] text-left text-lg font-semibold">プロフィール</h2>

      {/* 氏名 */}
      <div>
        <label className="text-sm font-medium text-black">氏名</label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="山田" className="input border rounded-md border-[#868282] p-2" />
          <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="太郎" className="input border rounded-md border-[#868282] p-2" />
        </div>
      </div>

      {/* 氏名カナ */}
      <div>
        <label className="text-sm font-medium text-black">氏名カナ（全角カナ）</label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <input name="kanaLast" value={formData.kanaLast} onChange={handleChange} type="text" placeholder="ヤマダ" className="input border rounded-md border-[#868282] p-2" />
          <input name="kanaFirst" value={formData.kanaFirst} onChange={handleChange} type="text" placeholder="タロウ" className="input border rounded-md border-[#868282] p-2" />
        </div>
      </div>

      {/* メール */}
      <div>
        <label className="text-sm font-medium text-black">メールアドレス／会員ID</label>
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="sample@gmail.com" className="input border rounded-md border-[#868282] p-2 mt-1 w-full" />
      </div>

      {/* 電話番号 */}
      <div>
        <label className="text-sm font-medium text-black">電話番号</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <input name="phone1" value={formData.phone1} onChange={handleChange} type="text" placeholder="080" className="input border rounded-md border-[#868282] p-2" />
          <input name="phone2" value={formData.phone2} onChange={handleChange} type="text" placeholder="1234" className="input border rounded-md border-[#868282] p-2" />
          <input name="phone3" value={formData.phone3} onChange={handleChange} type="text" placeholder="5678" className="input border rounded-md border-[#868282] p-2" />
        </div>
      </div>

      {/* 性別 */}
      <div>
        <label className="text-sm font-medium text-black">性別</label>
        <div className="mt-2 space-x-6">
          <label>
            <input type="radio" name="gender" value="男性" onChange={handleChange} checked={formData.gender === '男性'} /> 男性
          </label>
          <label>
            <input type="radio" name="gender" value="女性" onChange={handleChange} checked={formData.gender === '女性'} /> 女性
          </label>
        </div>
      </div>

      {/* 生年月日 */}
      <div>
        <label className="text-sm font-medium text-black">生年月日</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <input name="birthYear" value={formData.birthYear} onChange={handleChange} type="number" placeholder="2000" className="input border rounded-md border-[#868282] p-2" />
          <input name="birthMonth" value={formData.birthMonth} onChange={handleChange} type="number" placeholder="01" className="input border rounded-md border-[#868282] p-2" />
          <input name="birthDay" value={formData.birthDay} onChange={handleChange} type="number" placeholder="01" className="input border rounded-md border-[#868282] p-2" />
        </div>
      </div>

      {/* 居住地 */}
      <div>
        <label className="text-sm font-medium text-black">居住地</label>
        <select name="address" value={formData.address} onChange={handleChange} className="input border rounded-md border-[#868282] p-2 mt-1 w-full">
          <option value="">居住地を選択してください</option>
          <option value="東京">東京</option>
          <option value="大阪">大阪</option>
          <option value="名古屋">名古屋</option>
        </select>
      </div>

      <h2 className="text-orange-500 font-semibold text-lg">経歴</h2>

      {/* 最終学歴 */}
      <label className="text-sm font-medium text-black">最終学歴</label>
      <div className="flex gap-4">
        <input name="educationSchool" value={formData.educationSchool} onChange={handleChange} placeholder="学校名を入力してください" className="w-1/2 border border-gray-300 rounded px-3 py-2" />
        <input name="educationDept" value={formData.educationDept} onChange={handleChange} placeholder="学部名を入力してください" className="w-1/2 border border-gray-300 rounded px-3 py-2" />
      </div>

      {/* 学歴 */}
      <label className="text-sm font-medium text-black">学歴</label>
      <textarea name="educationNote" value={formData.educationNote} onChange={handleChange} rows={3} placeholder="例）2025年3月 ●●大学●●学部卒業" className="w-full border border-gray-300 rounded px-3 py-2" />

      {/* 経験者数 */}
      <label className="text-sm font-medium text-black">経験者数</label>

      <select name="expPeople" value={formData.expPeople} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2">
        <option value="">000</option>
        <option value="1-3人">1-3人</option>
        <option value="4-10人">4-10人</option>
        <option value="10人以上">10人以上</option>
      </select>

      {/* 職種 */}
      <label className="text-sm font-medium text-black">経験職種</label>

      <textarea name="expJob" value={formData.expJob} onChange={handleChange} rows={2} placeholder="職種を入力してください" className="w-full border border-gray-300 rounded px-3 py-2" />

      {/* 業種 */}
      <label className="text-sm font-medium text-black">経験業種</label>

      <textarea name="expIndustry" value={formData.expIndustry} onChange={handleChange} rows={2} placeholder="業種を入力してください" className="w-full border border-gray-300 rounded px-3 py-2" />

      {/* 年収 */}
      <label className="text-sm font-medium text-black">年収</label>

      <input name="currentIncome" value={formData.currentIncome} onChange={handleChange} type="number" placeholder="000" className="w-full border border-gray-300 rounded px-3 py-2" />

      <h2 className="text-orange-600 font-semibold mb-2 text-lg">希望条件</h2>

      {/* 希望勤務地 */}
      <select name="desiredLocation" value={formData.desiredLocation} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
        <option value="">勤務地を選択してください</option>
        <option value="東京">東京</option>
        <option value="大阪">大阪</option>
      </select>

      {/* 希望年収 */}
      <label className="text-sm font-medium text-black">希望年収</label>

      <div className="flex items-center gap-2">
        <input name="desiredIncome" value={formData.desiredIncome} onChange={handleChange} type="number" placeholder="000" className="border border-gray-300 rounded-md p-2 w-24" />
        <span>万円</span>
      </div>

      {/* 希望職種 */}
      <div>
        <label className="block font-medium mb-2">希望職種（最大6つ）</label>
        <div className="grid grid-cols-2 gap-4">
          {formData.desiredJobs.map((job, index) => (
            <select key={index} value={job} onChange={(e) => handleArrayChange(e, index, 'desiredJobs')} className="w-full border border-gray-300 rounded-md p-2">
              <option value="">職種を選択してください</option>
              <option value="営業">営業</option>
              <option value="エンジニア">エンジニア</option>
              <option value="事務">事務</option>
            </select>
          ))}
        </div>
      </div>

      {/* 希望業種 */}
      <div>
        <label className="block font-medium mb-2">希望業種（最大6つ）</label>
        <div className="grid grid-cols-2 gap-4">
          {formData.desiredIndustries.map((industry, index) => (
            <select key={index} value={industry} onChange={(e) => handleArrayChange(e, index, 'desiredIndustries')} className="w-full border border-gray-300 rounded-md p-2">
              <option value="">業種を選択してください</option>
              <option value="IT">IT</option>
              <option value="医療">医療</option>
              <option value="製造">製造</option>
            </select>
          ))}
        </div>
      </div>

     <div>
      {/* Title */}
      <h2 className="text-sm font-semibold text-orange-500 mb-2">履歴書</h2>

      {/* Box */}
      <div className="border border-gray-300 rounded-lg px-4 py-6 bg-white text-center">
        <p className="text-sm text-gray-700 font-semibold mb-2">
          履歴書のアップロード画面です。
        </p>
        <p className="text-sm text-gray-700 mb-4">
          ご自身で作成した履歴書をご提出いただいております。
        </p>

        <ul className="text-sm text-gray-600 text-left list-disc pl-5 space-y-1 mb-6">
          <li>ご自身で作成した履歴書をご提出いただいております。</li>
          <li>
            アップロードできるファイル形式は、Word（.docx、.doc）、Excel（.xlsx、.xls）、PDF（.pdf）です。
          </li>
          <li>ファイルの最大サイズは10MBです。</li>
          <li>履歴書は1件のアップロードです。</li>
          <li>
            履歴書差し替えたい場合、新しいファイルを追加でアップロードする必要があります。
          </li>
        </ul>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-2">ここにファイルをドロップ、または</p>
          <label className="inline-block bg-white border border-gray-400 rounded px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">
            ファイルを選択
            <input type="file" onChange={handleFileChange} className="hidden" />
            </label>
        </div>
      </div>
    </div>

  

      {/* 送信 */}
      <div className="text-center pt-4">
        <button onClick={handlesubmit} className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
          送信する <span className="ml-1">▶</span>
        </button>
      </div>
    </div>
  );
}
