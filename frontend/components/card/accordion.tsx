import { useCallback, useState } from "react";

interface AccordionItemProps {
    question: string;
    answer: string;
}

const AccordionItem = ({
    question,
    answer
}: AccordionItemProps) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setOpen(old => !old);
    }, []);
    return (
        <div className="text-base flex flex-col items-start gap-4 relative select-none">
            <div className="px-4 py-5 w-full bg-white flex flex-row">
                <span className="mr-4 flex-none text-[#FF733E]">
                    Q
                </span>
                <span className="flex-1 text-gray-20">
                    {question}
                </span>
                <span onClick={toggleOpen} className="flex-none text-gray-20 cursor-pointer">
                    +
                </span>
            </div>
            {open && (
                <div className="px-4 w-full flex flex-row">
                    <span className="flex-none invisible">
                        Q
                    </span>
                    <span className="flex-1 text-font-10">
                        {answer}
                    </span>
                </div>
            )}
        </div>
    );
}

const AccordionCard = ({ content }: {
    content: AccordionItemProps[]
}) => {
    return (
        <div className="w-full flex flex-col gap-4">
            {
                content.map((_item, index) => (
                    <AccordionItem
                        {..._item}
                        key={`accordion-item-${index}`}
                    />
                ))
            }
        </div>
    );
}

export default AccordionCard;