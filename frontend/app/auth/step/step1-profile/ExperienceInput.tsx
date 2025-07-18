'use client';

import React from 'react';

// Define Experience type
export type Experience = {
  company: string;
  periodFrom: string;
  periodTo: string;
  business: string;
  capital: string;
  teamSize: string;
  tasks: string;
};

type Props = {
  index: number;
  experience: Experience;
  onChange: (index: number, updated: Partial<Experience>) => void;
};

export default function ExperienceInput({ index, experience, onChange }: Props) {
  const handleChange = (field: keyof Experience, value: string) => {
    onChange(index, { [field]: value });
  };

  return (
    <div className="space-y-4 p-4">
      <label className="block">
        会社名
        <input
          className="w-full border rounded p-2"
          placeholder="会社名を入力してください"
          value={experience.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </label>

      <label>在籍期間</label>
      <div className="flex items-center gap-4">
        <input
          className="w-full border rounded p-2"
          placeholder="年/月"
          value={experience.periodFrom}
          onChange={(e) => handleChange('periodFrom', e.target.value)}
        />
        <span>~</span>
        <input
          className="w-full border rounded p-2"
          placeholder="年/月"
          value={experience.periodTo}
          onChange={(e) => handleChange('periodTo', e.target.value)}
        />
      </div>

      <label className="block">
        事業内容
        <input
          className="w-full border rounded p-2"
          placeholder="事業内容を入力してください"
          value={experience.business}
          onChange={(e) => handleChange('business', e.target.value)}
        />
      </label>

      <label className="block">
        資本金
        <input
          className="w-full border rounded p-2"
          placeholder="資本金を入力してください"
          value={experience.capital}
          onChange={(e) => handleChange('capital', e.target.value)}
        />
      </label>

      <label className="block">
        チーム人数
        <input
          className="w-full border rounded p-2"
          placeholder="人数を入力してください"
          value={experience.teamSize}
          onChange={(e) => handleChange('teamSize', e.target.value)}
        />
      </label>

      <label className="block">
        業務内容
        <textarea
          className="w-full border rounded p-2"
          placeholder="細かい経験を入力してください"
          value={experience.tasks}
          onChange={(e) => handleChange('tasks', e.target.value)}
        />
      </label>
    </div>
  );
}
