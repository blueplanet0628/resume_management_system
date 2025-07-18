import NextIcon from "@/assets/svg/right.svg";

interface StepCardProps {
    stepTitle: string;
    imageSrc: string;
    title: string;
    desc: string;
    showNext: boolean;
}

const StepCard = (
    {
        stepTitle,
        imageSrc,
        title,
        desc,
        showNext
    }: StepCardProps
) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="py-1 px-3 bg-[#FF733E] rounded-2xl bg-primary-active text-white text-sm">
                {stepTitle}
            </div>
            <div className="p-4 w-full rounded-xl bg-gray-cool flex flex-col items-center justify-center relative">
                <img src={imageSrc} className="h-24 object-cover" alt="" />
                <div className="absolute -right-6 h-full md:flex flex-col justify-center text-border-gray1 hidden">
                    <NextIcon className="w-4 h-6" />
                </div>
            </div>
            <span className="text-base md:text-lg font-semibold">
                {title}
            </span>
            <span className="text-center text-base font-light">
                {desc}
            </span>
        </div>
    )
}

export default StepCard;