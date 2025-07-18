'use client';

interface PdfContentProps {
  experiences: any[];
  skill: any;
  profile: any;
  job: any;
}

import { format } from 'date-fns';


export default function PdfContent({ experiences, skill, profile, job }: PdfContentProps) {
      const fullname = "fullName"; // Replace with actual full name from state or props   
      const today = format(new Date(), 'yyyy年M月d日');
  return (
    <div id="pdf-preview" className="p-8 text-black bg-white">
        <h2 className="text-center font-bold text-lg w-full -ml-10">職務経歴書</h2>

        <div className="text-sm text-right">
            <p>{today} 現在</p>
            <p>氏名: {fullname || '●●●'}</p>
        </div>

        <section className="mb-4 flex">
          <h2 className="font-bold mb-1">職務要約</h2>
          <p>{job?.job || '入力した職務要約が記載されます。'}</p>
        </section>

        <section className="mb-4 flex">
          <h2 className="font-bold mb-1">スキル・資格</h2>
          <p>{skill?.skill || '入力したスキルが記載されます。'}</p>
        </section>

        <section className='mb-4 flex'>
          <h2 className="font-bold mb-1">自己PR</h2>
          <p>{profile?.profile || '入力した自己PRが記載されます。'}</p>
        </section>


      <section className="mb-4 ">
        <h2 className="font-semibold">経験</h2>
        {experiences.map((exp, index) => (
          <div key={index} className="mb-2">
            <p>会社名: {exp.company}</p>
            <p>在籍期間: {exp.periodFrom} 〜 {exp.periodTo}</p>
            <p>事業内容: {exp.business}</p>
            <p>資本金: {exp.capital}</p>
            <p>チーム人数: {exp.teamSize}</p>
            <p>業務内容: {exp.tasks}</p>
            
          </div>
        ))}
      </section>

    
    </div>
  );
}
