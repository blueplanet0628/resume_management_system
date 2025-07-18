'use client';
import { useRouter } from "next/navigation";


export default function Rightpage() {
    const router = useRouter();
    const next = () => {
        router.push('/interview/3/chat')
    }

  return (
    <>
      <h1 className="text-3xl">面接対策 </h1>
      <h2 className="text-xl mt-4 mb-5">ここでは想定される質問とあなたの職務経歴書をベースに、回答の添削やアドバイスを受けることができます。面接対策を開始するには、まず職務職務書を作成してください。</h2>
        <button onClick={next} className="border-none bg-[#FF733E] p-3 px-5 rounded-xl text-white flex justify-center items-center m-auto mt-10">職務経歴書を作成する</button>
    </>
  );
}
