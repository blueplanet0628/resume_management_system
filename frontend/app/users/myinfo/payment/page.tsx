'use client';

import { useState } from 'react';

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'bank'>('credit');

  // Credit card fields
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');

  // Bank transfer fields
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('ログイントークンが見つかりません。再度ログインしてください。');
      return;
    }
    const formData = new FormData();
    formData.append('paymentMethod', paymentMethod);
    if (paymentMethod === 'credit') {
      formData.append('cardNumber', cardNumber);
      formData.append('cardHolder', cardName);
      formData.append('cardExpiry', expiry);
      formData.append('cardCvv', cvc);
    } else {
      formData.append('bankName', bankName);
      formData.append('branchName', branchName);
      formData.append('accountType', accountType);
      formData.append('accountNumber', accountNumber);
      formData.append('accountHolder', accountHolder);
    }
    try {
      console.log(formData, 'form');

      const response = await fetch('http://localhost:9000/payment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Do NOT set Content-Type here!
        },
        body: formData,
      });

      if (response.ok) {
        alert('保存しました');
      } else {
        const error = await response.json();
        alert(`保存に失敗しました: ${error.detail}`);
      }
    } catch (err) {
      console.error(err);
      alert('予期せぬエラーが発生しました。');
    }
  };

  const inputStyle =
    'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400';

  return (
    <form onSubmit={handleSubmit} className="mx-auto p-6 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">支払い情報登録・変更</h1>
        <p className="text-sm text-gray-600 mt-1">
          マイプランの支払いに関する情報の登録や変更が行えます。
        </p>
      </div>

      {/* Plan Info Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm text-left bg-gray-50">
          <tbody>
            <tr className="border-b">
              <th className="px-4 py-3 text-gray-600 w-1/3">プラン名</th>
              <td className="px-4 py-3 font-semibold text-gray-800">自由契約3本パック</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-3 text-gray-600">月額費用</th>
              <td className="px-4 py-3 font-semibold text-gray-800">月額10,000円</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-3 text-gray-600">契約開始日</th>
              <td className="px-4 py-3 text-gray-800">2025年5月20日</td>
            </tr>
            <tr>
              <th className="px-4 py-3 text-gray-600">次回請求日</th>
              <td className="px-4 py-3 text-gray-800">2025年6月20日</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Method Selection */}
      <div>
        <h2 className="text-base font-semibold text-red-600 mb-4">支払い方法の選択</h2>

        <div className="space-y-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
          <label className="flex items-center gap-3 text-gray-800">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'credit'}
              onChange={() => setPaymentMethod('credit')}
              className="accent-orange-500"
            />
            クレジットカード
          </label>

          <label className="flex items-center gap-3 text-gray-800">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
              className="accent-orange-500"
            />
            銀行振込
          </label>

          {/* Credit Card Form */}
          {paymentMethod === 'credit' && (
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="カード番号を入力してください"
                className={inputStyle}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="有効期限 MM/YY"
                  className={`${inputStyle} w-1/2`}
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="セキュリティコード"
                  className={`${inputStyle} w-1/2`}
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="カード名義人（半角ローマ字）"
                className={inputStyle}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
          )}

          {/* Bank Transfer Form */}
          {paymentMethod === 'bank' && (
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="金融機関名を入力してください"
                className={inputStyle}
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <input
                type="text"
                placeholder="支店名を入力してください"
                className={inputStyle}
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
              />
              <select
                className={inputStyle}
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="">預金種別を選択してください</option>
                <option value="普通">普通</option>
                <option value="当座">当座</option>
              </select>
              <input
                type="text"
                placeholder="口座番号を入力してください"
                className={inputStyle}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="口座名義（カナ）"
                className={inputStyle}
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-[#FF6F3F] hover:bg-[#ff5a1f] text-white font-semibold py-2 px-6 rounded-full text-base inline-flex items-center transition duration-200"
        >
          保存する
          <span className="ml-2 text-sm">▶</span>
        </button>
      </div>
    </form>
  );
}
