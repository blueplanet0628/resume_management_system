'use client';

type Props = {
  onClose: () => void;
  onNext: () => void;
};

export default function PublicConfirmModal({ onClose, onNext }: Props) {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white p-8 rounded-xl max-w-xl w-full text-center shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          スキルや経験の公開に関するご案内をご確認してください。
        </h2>
        <p className="text-sm mb-6 text-gray-600">
          個人情報を特定されない範囲でスキルや経験をシステム内に公開することに同意後、
          PDFの保存が行えます。下のボタンをクリックして確認後、同意を行ってください。
        </p>
        <button
          onClick={onNext}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
        >
          確認する ▶
        </button>
        
      </div>
    </div>
  );
}
