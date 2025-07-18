'use client';

import { useState } from 'react';
import ExperienceInput from './ExperienceInput';
import StepNavigation from '../components/StepNavigation';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setExperiences } from '@/app/redux/experienceSlice';


export default function ExperienceForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [experiences, setExperiencesState] = useState([
    {
      id: Date.now(),
      company: '',
      periodFrom: '',
      periodTo: '',
      business: '',
      capital: '',
      teamSize: '',
      tasks: '',
    },
  ]);


  const addExperience = () => {
    setExperiencesState([
      ...experiences,
      {
        id: Date.now(),
        company: '',
        periodFrom: '',
        periodTo: '',
        business: '',
        capital: '',
        teamSize: '',
        tasks: '',
      },
    ]);
  };


  const updateExperience = (index: number, updated: Partial<typeof experiences[0]>) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], ...updated };
    setExperiencesState(newExperiences);
  };

  const handleSubmit = () => {

    router.push('/auth/step/step2-education');
  };

  const save = () => {
    dispatch(setExperiences(experiences));
    setExperiencesState([{  
      id: Date.now(),
      company: '',
      periodFrom: '',
      periodTo: '',
      business: '',
      capital: '',
      teamSize: '',
      tasks: '',
    }]);
      
  }

  const preview = () => {
    router.push('/auth/step/preview');
  }

  return (
    <div className="space-y-6 px-4 py-6">
      <StepNavigation current={0} />

      {experiences.map((exp, index) => (
        <ExperienceInput key={exp.id} index={index} experience={exp} onChange={updateExperience} />
      ))}

      <div className="flex justify-center">
        <button
          onClick={addExperience}
          className="text-sm bg-[#4D433F] p-1 rounded-full text-white"
        >
          ＋
        </button>
      </div>

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
        <button onClick={save} className="flex-1 rounded-br-xl bg-white border p-2">保存する</button>
      </div>

    </div>
  );
}
