"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

type ResumeData = {
  user?: {
    full_name?: string;
  };
  job?: {
    job?: string;
    id?: string | number;
  };
  experiences?: Array<{
    periodFrom?: string;
    periodTo?: string;
    company?: string;
    business?: string;
    capital?: string;
    teamSize?: string;
    tasks?: string;
  }>;
  skill?: {
    skill?: string;
    id?: string | number;
  };
  profile?: {
    profile?: string;
    id?: string | number;
  };
};

export default function PreviewPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ full_name?: string }>({ full_name: '●●●' });
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = format(new Date(), 'yyyy年M月d日');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('トークンがありません。ログインしてください。');
      setLoading(false);
      return;
    }

    fetch('http://localhost:9000/get-resume-data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('データの取得に失敗しました');
        return res.json();
      })
      .then((data) => {
        console.log(data.resume, 'data');
        setUser(data.user);
        setResumeData(data.resume ?? {});
      })
      .catch((err) => {
        console.error(err);
        setError('データの取得中にエラーが発生しました');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = () => {
    router.push('/auth/step/step1-profile');
  };

  if (loading) return <p className="text-center mt-10">読み込み中...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!resumeData) return <p className="text-center mt-10">表示する職務経歴書がありません。</p>;

  const {
    job = null,
    experiences = [],
    skill = null,
    profile = null,
  } = resumeData ?? {};

  return (
    <>
      <div className="bg-white max-w-4xl mx-auto border border-gray-300 shadow">
        <div className="flex justify-between items-start bg-black border-gray-200">
          <div className="text-lg m-4 font-semibold text-center w-full text-white">プレビュー</div>
        </div>

        <div className="p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-center font-bold text-lg w-full -ml-10">職務経歴書</h2>
          </div>
          <div className="text-sm text-right">
            <p>{today} 現在</p>
            <p>氏名: {user?.full_name || '●●●'}</p>
          </div>

          {/* Job Summary */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-md font-semibold mb-1">職務要約</h3>
            {job?.job ? (
              <p className="text-sm text-gray-700">{job.job} (ID: {job.id})</p>
            ) : (
              <p>入力した職務要約が記載されます。</p>
            )}
          </div>

          {/* Job Experiences */}
          <h3 className="text-md font-semibold text-gray-800 mb-1">職務内容</h3>
          {experiences.length > 0 ? (
            experiences.map((exp, i) => (
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
            ))
          ) : (
            <p>職務内容のデータがありません。</p>
          )}

          {/* Skills */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-md font-semibold mb-1">スキル・資格</h3>
            {skill?.skill ? (
              <p className="text-sm text-gray-700">{skill.skill} (ID: {skill.id})</p>
            ) : (
              <p>入力したスキルや資格が記載されます。</p>
            )}
          </div>

          {/* Self PR */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-md font-semibold mb-1">自己PR</h3>
            {profile?.profile ? (
              <p className="text-sm text-gray-700">{profile.profile} (ID: {profile.id})</p>
            ) : (
              <p>入力した自己PRが記載されます。</p>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleEdit}
        className="bg-[#FF733E] p-3 mt-4 mx-auto text-white rounded-3xl block"
      >
        職務経歴書を編集する
      </button>
    </>
  );
}
