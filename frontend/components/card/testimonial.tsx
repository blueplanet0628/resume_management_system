import React, { ReactNode, useState } from "react";
import DownIcon from "@/assets/svg/down.svg";

interface TestimonialCardProps {
    caseId: string;
    tags: string[];
    requirements: string[];
    sayings: string[];
    avatar: string;
    title: string;
    shortDesc: ReactNode;
    hasLongDesc: boolean;
    longDesc: ReactNode;
    commentTitle: string;
    commentDesc: ReactNode;
}

const TestimonialCard = ({
    caseId,
    tags,
    requirements,
    sayings,
    avatar,
    title,
    shortDesc,
    hasLongDesc,
    longDesc,
    commentTitle,
    commentDesc,
}: TestimonialCardProps) => {
    const [showLong, setShowLong] = useState(false);

    return (
        <div className="flex flex-col gap=8">
            <div className="rounded-xl overflow-hidden flex flex-col">
                <div className="p-3 bg-[#FF9871] text-primary-active flex flex-row items-center gap-3">
                    <div className="flex-none w-12 h-12 bg-white flex flex-col items-center justify-center rounded-full">
                        <span className="text-xs font-light text-[#FF733E]">
                            Case
                        </span>
                        <span className="-mt-2 text-lg text-[#FF733E]">
                            {caseId}
                        </span>
                    </div>
                    {
                        tags.map((_tag, index) => (
                            <div 
                                className="py-1 px-2 rounded-full  bg-[#FFD6C6] opacity-60 text-[#FF733E]"
                                key={`tag-${_tag}-${index}`}
                            >
                                {_tag}
                            </div>
                        ))
                    }
                </div>
                <div className="py-4 pr-4 bg-secondary-20 flex flex-col gap-1 relative">
                    {
                        requirements.map((_item, index) => (
                            <div 
                                className="px-2 py-1 z-100 w-fit bg-[#989290] text-white"
                                key={`requirement-${_item}-${index}`}
                            >
                                {_item}
                            </div>
                        ))
                    }
                    <div className="w-32 flex flex-row justify-center">
                        <DownIcon className="w-4 h-3" />
                    </div>
                    {
                        sayings.map((_item, index) => (
                            <div className="py-2 pl-3 pr-5 z-100 w-fit bg-[#FF733E] text-white"
                                key={`saying-${_item}-${index}`}
                            >
                                {_item}
                            </div>
                        ))
                    }
                    <div className="right-4 top-4 bottom-4 absolute">
                        <img src={avatar}
                            className="right-0 h-full aspect-square rounded-full object-cover"
                            alt=""
                        />
                    </div>
                </div>
                <div className="p-4 rounded-b-xl bg-white text-black flex flex-col gap-5 items-center">
                    <h4 className="text-lg text-center">
                        {title}
                    </h4>
                    <span className="text-base">
                        {showLong ? longDesc : shortDesc}
                    </span>
                    {
                        !showLong && hasLongDesc && (
                            <div className="-mt-8 py-4 w-full rounded-full bg-[#4D433F] text-white text-center text-sm relative cursor-pointer hover:opacity-80"
                                onClick={() => setShowLong(true)}
                            >
                                <span className="absolute -top-5 left-0 w-full h-5 blur-lg bg-white" />
                                <span className="absolute top-3.5 left-4 w-6 h-6 rounded-full bg-white flex flex-col items-center justify-center">
                                    <DownIcon className="w-4 h-4 text-black" />
                                </span>
                                <span>
                                    続きを読む
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="mt-8 pt-6 pb-10 px-3 rounded-md bg-[#F2F2F2] relative">
                <span className="absolute -top-2 w-full text-center font-bold text-[13px]">
                    {commentTitle}
                </span>
                {commentDesc}
            </div>
        </div>
    );
}

export default TestimonialCard;