export default function PreviewPDF({ userId, step }: { userId: string, step: number }) {
    return (
      <iframe
        src={`/api/pdf-preview?user_id=${userId}&step=${step}`}
        className="w-full h-[600px] border rounded-lg"
        title="PDF Preview"
      />
    );
  }
  