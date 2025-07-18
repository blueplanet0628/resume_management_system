type InfoCardProps = {
    lines: string[];
  };
  
  const InfoCard = ({ lines }: InfoCardProps) => (
    <div className="pb-5">
      <div className="p-6 rounded-xl bg-gray-deep text-white flex flex-col items-center gap-2 relative">
        {lines.map((line, idx) => (
          <span className="underlined" key={idx}>
            {line}
          </span>
        ))}
        <span className="absolute -bottom-4 left-6 w-10 h-4 bottom-triangle" />
      </div>
    </div>
  );
  
  export default InfoCard;
  