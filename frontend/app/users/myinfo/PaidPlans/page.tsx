'use client';

import { FC } from 'react';

const PaidPlans: FC = () => {
  return (
    <>
      <h2 className="text-3xl mb-3">有料プラン</h2>
      <p className="text-xl text-gray-500 mb-6">有料プランに関するご案内になります。</p>
    <div className="bg-white p-6 rounded-md shadow mx-auto space-y-6 text-sm text-gray-700">

      <div className="space-y-4">
        {/* 職務経歴書の添削 */}
        <div className="flex rounded overflow-hidden border">
            <div className="bg-[#3a2b25] text-white text-sm font-semibold w-1/2 flex items-center justify-center p-4">
            職務経歴書の添削
            </div>
            <div className="bg-white w-1/2 p-4 text-right text-sm">
            <div className="text-gray-600">
                <span className="mr-2">50,000円</span>・マッチング<br />
                2件実施で <span className="text-2xl text-red-500 font-bold">0円</span>
            </div>
            </div>
        </div>

        {/* 面接アドバイス */}
        <div className="flex rounded overflow-hidden border">
            <div className="bg-[#3a2b25] text-white text-sm font-semibold w-1/2 flex items-center justify-center p-4">
            面接アドバイス
            </div>
            <div className="bg-white w-1/2 p-4 text-right text-sm">
            <div className="text-gray-600">
                各質問ごとの対策が可能
                <br />
                <span className="text-xs text-gray-500">(最初は一部無料開示可)</span>
            </div>
            </div>
        </div>
        </div>

      {/* Individual Items */}
      <div className="border rounded-md p-4 space-y-3">

      <div className="grid grid-cols-4 gap-2 text-center">
        {['転職理由・志望動機', '職務経歴書職種連携', '自己PR対策', '面接全般'].map((item) => (
          <div key={item} className="bg-gray-100 rounded py-2 px-3">{item}</div>
        ))}
      </div>
      <div className="text-right font-bold">各20,000円</div>
      </div>

      {/* 自己理解3点セット */}
      <div className="border rounded-md p-4 space-y-3">
        <div className="text-center text-xs font-semibold">自己理解3点セット</div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-gray-100 rounded py-2 px-3">転職理由</div>
          <div className="bg-gray-100 rounded py-2 px-3">職務経歴書</div>
          <div className="bg-gray-100 rounded py-2 px-3">自己PR</div>
        </div>
        <div className="text-right font-bold">50,000円</div>
      </div>

      {/* 面接アドバイスフルパッケージ */}
      <div className="border rounded-md p-4 space-y-3">
        <div className="text-center text-xs font-semibold">面接アドバイスフルパッケージ（全対策セット）</div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {['転職理由・志望動機', '職務経歴書職種連携', '自己PR対策', '面接全般'].map((item) => (
            <div key={item} className="bg-gray-100 rounded py-2 px-3">{item}</div>
          ))}
        </div>
        <div className="text-right font-bold">60,000円</div>
      </div>

      {/* 転職サポートプラン */}
      <div className="border rounded-md p-4 space-y-2">
        <div className="text-center text-xs font-semibold">転職サポートプラン</div>
        <div className="grid grid-cols-2 gap-1 text-center text-xs">
          <div className="bg-gray-100 rounded py-2 px-3">職務経歴書の添削</div>
          <div className="bg-gray-100 rounded py-2 px-3">面接アドバイスフルパッケージ</div>
        </div>
        <div className="text-right font-bold">110,000円</div>
        <p className="text-[10px] text-gray-500 mt-1">
          （職務経歴書添削＋面接アドバイスフルパッケージ含む）<br />
          弊社独自で書類選考が通過した場合、システム利用料金を全額返金！
        </p>
      </div>
    </div>
    </>
  );
};

export default PaidPlans;
