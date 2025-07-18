import React from "react";

interface BusinessIconCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BusinessIconCard = ({
  number,
  icon,
  title,
  description,
}: BusinessIconCardProps) => {
  return (
    <div
      className="flex flex-col items-center justify-start bg-white rounded-2xl shadow-lg px-8 py-8 mx-auto"
      style={{ width: 340, minHeight: 340, maxWidth: "100%" }}
    >
      <div className="flex flex-row items-center w-full mb-6 mt-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span
          className="mx-4 text-orange-main text-3xl font-bold tracking-widest"
          style={{ letterSpacing: "0.1em" }}
        >
          {number}
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#FFF2E6] flex items-center justify-center mb-4">
          <span className="text-orange-main text-3xl">{icon}</span>
        </div>
        <div className="text-lg md:text-xl font-bold text-black text-center mb-2">
          {title}
        </div>
        <div className="text-base text-black text-center leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};

export default BusinessIconCard;
