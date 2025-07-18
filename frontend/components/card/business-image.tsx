import React from "react";

interface BusinessImageCardProps {
  image: string;
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

const BusinessImageCard = ({
  image,
  number,
  icon,
  title,
  description,
}: BusinessImageCardProps) => {
  return (
    <div
      className={`w-full flex md:flex-row flex-col items-center justify-start md:mb-8 mb-6 last:mb-0 relative`}
    >
      {/* Outer white card with shadow and rounded corners */}
      <div
        className={`relative flex w-full md:min-h-[220px] min-h-[340px] md:py-0 py-6 md:px-0 px-0 md:flex-row flex-col items-center md:items-stretch`}
      >
        {/* Image Card (desktop: left, mobile: top-right, overlapping) */}
        <div className=" md:w-[200px] md:h-[200px] w-[200px] h-[200px] md:static absolute md:translate-x-19 md:translate-y-0 md:top-auto md:right-auto top-[-10px]  right-0 z-20  flex-none">
          <div
            className="absolute top-0 left-0 z-10 "
            style={{ transform: "rotate(7deg)" }}
          >
            <img
              src={image}
              alt="card-img"
              className="w-full h-full object-cover z-20"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-[24px] shadow-[0_4px_24px_0_rgba(0,0,0,0.06)]  justify-center md:pl-20 pl-4 md:pr-8  py-0 md:items-start items-start md:mt-0 mt-16">
          <div className="flex flex-row items-center md:mb-2 mb-2">
            <span className="text-orange-main text-[2rem] font-bold mr-2 leading-none">
              {icon}
            </span>
            <span className="text-orange-main text-[2.2rem] font-bold leading-none">
              {number}
            </span>
          </div>
          <div className="font-bold text-black md:text-[1.2rem] text-[1.2rem] leading-tight md:mb-3 mb-2 whitespace-pre-line">
            {title}
          </div>
          <div className="text-[1rem] text-black opacity-90 leading-relaxed md:mb-0 mb-2">
            {description}
          </div>
        </div>
      </div>
      {/* Mobile: overlap image card on top right of content card */}
      <style jsx>{`
        @media (max-width: 768px) {
          .md\\:static {
            position: absolute !important;
            top: -40px !important;
            right: 16px !important;
            left: auto !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .md\\:pl-0 {
            padding-left: 0 !important;
          }
          .md\\:pr-8 {
            padding-right: 0 !important;
          }
          .md\\:py-8 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .md\\:mt-0 {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BusinessImageCard;
