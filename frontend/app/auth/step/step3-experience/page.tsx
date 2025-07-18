'use client';

import { useState } from 'react';
import StepNavigation from '../components/StepNavigation';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/app/redux/profileSlice';

export default function ExperienceForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  // state for skill
  const [profileText, setProfileText] = useState('');

  const handleSubmit = () => {
    router.push('/auth/step/step4-preference');
  };

  const save = () => {
    if (profileText.trim()) {
      const payload = {
        id: Date.now(),
        profile: profileText,
      };
      dispatch(setProfile(payload));
      setProfileText(''); // clear textarea
    }
  };

  const preview = () => {
    router.push('/auth/step/preview');
  };

  return (
    <div className="space-y-6 px-4 py-6">
      <StepNavigation current={2} />

      <textarea
        name="profile"
        id="profile"
        value={profileText}
        onChange={(e) => setProfileText(e.target.value)}
        className="w-full p-4 border bg-white border-[#4D433F] rounded-xl"
        placeholder="あなたの強みや、これまでの経験を基に入力してください"
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
