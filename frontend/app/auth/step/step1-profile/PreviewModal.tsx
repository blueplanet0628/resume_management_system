type Props = {
    onClose: () => void;
  };
  
  export default function PreviewModal({ onClose }: Props) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-auto">
          <h2 className="text-xl font-bold mb-4">プレビュー</h2>
          {/* You can render PDF or raw text here */}
          <p>ここに入力内容のプレビューが表示されます。</p>
  
          <div className="text-right mt-4">
            <button onClick={onClose} className="text-blue-600">閉じる</button>
          </div>
        </div>
      </div>
    );
  }
  