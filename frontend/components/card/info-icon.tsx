
interface Props {
    heading: string;
    desc: string;
    image: string;
}

const InfoIconCard = ({
    heading,
    desc,
    image
}: Props) => {
    return (
        <div className="pb-5">
            <div className="py-6 px-4 h-fit md:h-[180px] rounded-xl bg-gray-deep text-white flex flex-col items-start gap-2 relative">
                <span className="text-lg md:text-[22px] font-bold">
                    {heading}
                </span>
                <span className="text-base">
                    {desc}
                </span>
                <span className="absolute -bottom-4 left-6 w-10 h-4 bottom-triangle" />
            </div>
        </div>
    );
}

export default InfoIconCard;