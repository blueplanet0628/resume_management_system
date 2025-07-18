'use client';

import { useState } from 'react';
import StepNavigation from '../components/StepNavigation';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setJob } from '@/app/redux/jobSlice';
import { RootState } from '@/app/redux/store';
import { format } from 'date-fns';

export default function ExperienceForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const experiences = useSelector((state: RootState) => state.experience.data);
  const skill = useSelector((state: RootState) => state.skill.data);
  const profile = useSelector((state: RootState) => state.profile.data);
  const job = useSelector((state: RootState) => state.job.data);

  const today = format(new Date(), 'yyyy年M月d日');
  const fullname = '●●●'; // Replace with actual name from profile state if needed

  const [jobText, setJobText] = useState(job?.job || '');

  const handleSubmit = async () => {
    // Here, you can call a function to store all collected redux data into Firestore
    // e.g., await submitToFirestore({ experiences, skill, profile, job });
    router.push('/auth/step/step6-download');
  };

  return (
    <div className="space-y-6 px-4 py-6">
      <StepNavigation current={4} />

      <div className="p-6 bg-white">
        <div className="flex justify-between mb-6">
          <h2 className="text-center font-bold text-lg w-full -ml-10">職務経歴書</h2>
        </div>
        <div className="text-sm text-right">
          <p>{today} 現在</p>
          <p>氏名: {fullname}</p>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-md font-semibold mb-1">職務要約</h3>
          {jobText ? (
                <p className="text-sm text-gray-700">{jobText}</p>
            ) : (
                <p>入力した職務要約が記載されます。</p>
            )}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-md font-semibold mb-1">職務内容</h3>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-6 border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-700">{exp.periodFrom}～{exp.periodTo}</p>
              <p className="text-sm text-gray-700">会社名: {exp.company || '●●'}</p>
              <p className="text-sm text-gray-700">事業内容: {exp.business || '●●'}</p>
              <p className="text-sm text-gray-700">資本金: {exp.capital || '●'}、チーム内人数: {exp.teamSize || '●'}名</p>
              <div className="mt-2 border-t border-gray-100 text-sm text-gray-700">
                <div className="grid grid-cols-2 font-semibold text-gray-500 mb-1">
                  <span className="bg-[#EEEEEE] text-center">期間</span>
                  <span className="bg-[#EEEEEE] text-center">職務内容</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>{exp.periodFrom}～{exp.periodTo}</span>
                  <span>{exp.tasks || '入力した職務内容が記載されます。'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-md font-semibold mb-1">スキル・資格</h3>
          {skill ? (
            <p className="text-sm text-gray-700">{skill.skill}</p>
          ) : (
            <p>入力したスキルや資格が記載されます。</p>
          )}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-md font-semibold mb-1">自己PR</h3>
          {profile ? (
            <p className="text-sm text-gray-700">{profile.profile}</p>
          ) : (
            <p>入力した自己PRが記載されます。</p>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="flex mb-0 mt-6 bg-[#FF733E] rounded-xl w-40 justify-center items-center mx-auto text-white p-2"
      >
        登録する
      </button>
    </div>
  );
}
