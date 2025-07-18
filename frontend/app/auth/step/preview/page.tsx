'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { format } from 'date-fns';

export default function PreviewPage() {
  const router = useRouter();
  const experiences = useSelector((state: RootState) => state.experience.data);
  const skill = useSelector((state: RootState) => state.skill.data);
  const profile = useSelector((state: RootState) => state.profile.data);
  const job = useSelector((state: RootState) => state.job.data);

  const fullname = "fullName"; // Replace with actual full name from state or props

  const today = format(new Date(), 'yyyy年M月d日');

  return (
    <div className="bg-white max-w-4xl mx-auto border border-gray-300 shadow">
      {/* Header */}
      <div className="flex justify-between items-start bg-black  border-gray-200">
        <div className="text-lg m-4 font-semibold text-center w-full text-white text-brown-800">プレビュー</div>
        <button
          onClick={() => router.back()}
          className="text-white m-4 text-xl"
        >
          ✕
        </button>
      </div>


      {/* Title and Name */}
      <div className='p-6'>
        <div className="flex justify-between mb-6">
                <h2 className="text-center font-bold text-lg w-full -ml-10">職務経歴書</h2>
            </div>
            <div className="text-sm text-right">
            <p>{today} 現在</p>
            <p>氏名: {fullname || '●●●'}</p>
            </div>

      

        <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-md font-semibold mb-1">職務要約</h3>
            {job ? (
                <p className="text-sm text-gray-700">{job.job} (ID: {job.id})</p>
            ) : (
                <p>入力した職務要約が記載されます。</p>
            )}
        </div>

        <h3 className="text-md font-semibold text-gray-800 mb-1">職務内容</h3>
        {experiences.map((exp, i) => (

            <div key={i} className="mb-6 border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-700">{exp.periodFrom}～{exp.periodTo}</p>
                <p className="text-sm text-gray-700">会社名: {exp.company || '●●'}</p>
                <p className="text-sm text-gray-700">事業内容: {exp.business || '●●'}</p>
                <p className="text-sm text-gray-700">資本金: {exp.capital || '●'}、チーム内（部署や課）の人数: {exp.teamSize || '●'}名</p>

                <div className="mt-2 border-t border-gray-100 text-sm text-gray-700">
                    <div className="grid grid-cols-2 font-semibold text-gray-500 mb-1">
                    <span className='bg-[#EEEEEE] text-center'>期間</span>
                    <span className='bg-[#EEEEEE] text-center'>職務内容</span>
                    </div>
                    <div className="grid grid-cols-2">
                    <span>{exp.periodFrom}～{exp.periodTo}</span>
                    <span>{exp.tasks || '入力した職務内容が記載されます。'}</span>
                    </div>

                </div>
            </div>
        ))}

        {/* Skills */}
        <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-md font-semibold mb-1">スキル・資格</h3>
            {skill ? (
                <p className="text-sm text-gray-700">{skill.skill} (ID: {skill.id})</p>
            ) : (
                <p>入力したスキルや資格が記載されます。</p>
            )}
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-md font-semibold mb-1">自己PR</h3>
            {profile ? (
                <p className="text-sm text-gray-700">{profile.profile} (ID: {profile.id})</p>
            ) : (
                <p>入力した自己PRが記載されます。</p>
            )}
        </div>
       

       
      </div>
    </div>
  );
}
