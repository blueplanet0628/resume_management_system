import React from "react";

interface IconCardProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}

const IconCard = ({
    title,
    description   
}: IconCardProps) => {
    return (
        <div className="px-4 py-8 rounded-xl bg-white flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2">
                <div className="flex-none w-12 h-12 rounded-full bg-orange-light text-primary-active flex flex-col items-center justify-center">
                </div>
                <span className="font-semibold text-lg">
                    {title}
                </span>
            </div>
            <div className="text-base">
                {description}
            </div>
        </div>
    );
}

export default IconCard;