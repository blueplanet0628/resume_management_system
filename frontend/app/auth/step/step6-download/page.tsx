'use client';

import { useState } from 'react';
import StepNavigation from '../components/StepNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import PublicConfirmModal from './PublicConfirmModal';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Dynamically import PDF content to avoid SSR issues
const PdfContent = dynamic(() => import('./PdfContent'), { ssr: false });

export default function Step6Confirm() {
  const [agree, setAgree] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const experiences = useSelector((state: RootState) => state.experience.data);
  const skill = useSelector((state: RootState) => state.skill.data);
  const profile = useSelector((state: RootState) => state.profile.data);
  const job = useSelector((state: RootState) => state.job.data);

  // PDF download handler
  const handleDownload = async () => {
    if (!agree) return;

    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('pdf-preview');

    if (!element) {
      alert('PDFコンテンツが見つかりません');
      return;
    }

    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  // Save to backend
  const handleSave = async () => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('ログイン情報が見つかりません。再ログインしてください。');
        return;
      }
  
      const res = await axios.post(
        'http://localhost:9000/auth/save-resume',
        {
          experiences,
          skill,
          profile,
          job,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // attach token in Authorization header
            'Content-Type': 'application/json',
          },
        }
      );
  
      alert('保存が完了しました！');
      console.log(res.data);
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました。');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-[#FCF9F4] min-h-screen relative">
      <h1 className="text-xl font-bold text-center mb-6">職務経歴書の作成が完了しました</h1>

      <StepNavigation current={5} />

      <div className="text-center text-sm text-gray-700 mt-4 mb-6 space-y-1">
        <p>個人情報を特定されない範囲でスキルや経験をシステム内に公開することに同意後、</p>
        <p>PDFの保存が行えます。目的に応じて選択してください。</p>
      </div>

      <div className="flex justify-center items-center mb-6">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="agree" className="text-sm text-gray-700">
          スキルや経験の公開に関するご案内を確認する。
        </label>
      </div>

      <div className="flex gap-4 justify-center mb-8">
        <button
          disabled={!agree}
          onClick={() => setShowSaveModal(true)}
          className={`px-6 py-2 rounded text-white transition-colors duration-200 ${
            agree ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          保存する
        </button>

        <button
          disabled={!agree}
          onClick={handleDownload}
          className={`px-6 py-2 rounded text-white transition-colors duration-200 ${
            agree ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          ダウンロード
        </button>
      </div>

      {showSaveModal && (
        <PublicConfirmModal
          onClose={() => setShowSaveModal(false)}
          onNext={async () => {
            await handleSave();
            setShowSaveModal(false);
          }}
        />
      )}

      {/* Hidden component rendered only for PDF export */}
      <div className="hidden">
        <PdfContent
          experiences={experiences}
          skill={skill}
          profile={profile}
          job={job}
        />
      </div>
    </div>
  );
}
