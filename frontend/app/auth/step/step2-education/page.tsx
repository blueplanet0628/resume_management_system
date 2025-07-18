'use client';

import { useState } from 'react';
import StepNavigation from '../components/StepNavigation';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSkill } from '@/app/redux/skillSlice';

export default function ExperienceForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  // state for skill
  const [skillText, setSkillText] = useState('');

  const handleSubmit = () => {
    router.push('/auth/step/step3-experience');
  };

  const save = () => {
    if (skillText.trim()) {
      const payload = {
        id: Date.now(),
        skill: skillText,
      };
      dispatch(setSkill(payload));
      setSkillText(''); // clear textarea
    }
  };

  const preview = () => {
    router.push('/auth/step/preview');
  };

  return (
    <div className="space-y-6 px-4 py-6">
      <StepNavigation current={1} />

      <textarea
        name="skill"
        id="skill"
        value={skillText}
        onChange={(e) => setSkillText(e.target.value)}
        className="w-full p-4 border bg-white border-[#4D433F] rounded-xl"
        placeholder="例: JavaScript、Photoshop、TOEIC 900点など"
      ></textarea>

      <button
        onClick={handleSubmit}
        className="flex-1 mb-0 bg-[#4D433F] rounded-t-xl w-full text-white p-2"
      >
        次へ進む
      </button>
      <div className="flex justify-between">
        <button onClick={preview} className="flex-1 rounded-bl-xl bg-white border p-2">
          プレビュー
        </button>
        <button onClick={save} className="flex-1 rounded-br-xl bg-white border p-2">
          保存する
        </button>
      </div>
    </div>
  );
}
