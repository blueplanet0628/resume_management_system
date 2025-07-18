import React from "react";

interface UnderlinedLabel {
  text: string;
  title: string;
}

interface InfoCardProps {
  contentList: UnderlinedLabel[];
  icon?: React.ReactNode;
  highlightTitle?: boolean;
  borderColor?: string;
}

const BusinessInfoCard = ({
  contentList,
  icon,
  highlightTitle = false,
  borderColor,
}: InfoCardProps) => {
  return (
    <div
      className="relative flex flex-col justify-center items-start"
      style={{
        width: "340px",
        height: "180px",
        marginBottom: "24px",
        borderRadius: "16px",
        background: "#3B322E",
        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.08)",
        border: borderColor ? `2px solid ${borderColor}` : undefined,
      }}
    >
      <div className="px-7 pt-7 pb-6 flex flex-col justify-center h-full w-full">
        {contentList.map((_item, index) => (
          <React.Fragment key={`content-card-${_item.text}-${index}`}>
            <div
              className={`font-bold mb-2 ${
                highlightTitle
                  ? "bg-[#2196F3] text-white px-2 py-1 rounded text-[18px]"
                  : "text-white text-[20px]"
              }`}
              style={{ lineHeight: "1.4", textAlign: "left" }}
            >
              {_item.title}
            </div>
            <div
              className="text-white text-[15px] opacity-90"
              style={{ lineHeight: "1.7", textAlign: "left" }}
            >
              {_item.text}
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Icon absolutely positioned in bottom-right, never overlaps text */}
      {icon && (
        <div
          className="absolute"
          style={{
            right: 24,
            bottom: 18,
            fontSize: 72,
            opacity: 0.13,
            pointerEvents: "none",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {icon}
        </div>
      )}
      {/* Speech bubble triangle */}
      <svg
        className="absolute left-8 -bottom-4"
        width="32"
        height="16"
        viewBox="0 0 32 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="0,0 32,0 16,16" fill="#3B322E" />
      </svg>
    </div>
  );
};

export default BusinessInfoCard;
