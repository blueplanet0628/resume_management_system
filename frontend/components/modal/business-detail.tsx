/**
 * * Business modal
 */
import { forwardRef, useCallback, useRef } from "react";

import CustomModal from "./default";
import DefaultButton from "../button/default";
// import { MessageboxTextarea } from "../pure/input";

import SendIcon from "@/assets/svg/send.svg";
import { prefecturesJa } from "@/app/content/prefectures";

interface Props {
    detail: any;
    isOpen: boolean;
    closeLabel: string;
    confirmLabel: string;
    isSendingMessage: boolean;
    onClose: () => void;
    sendMessage: (_message: any) => void;
    onConfirm: () => void;
}

const BusinessDetailModal = ({
    detail,
    isOpen,
    closeLabel,
    confirmLabel,
    isSendingMessage,
    onClose,
    sendMessage,
    onConfirm,
}: Props) => {
    const messageRef = useRef<HTMLTextAreaElement | null>(null);

    const onMessage = useCallback(() => {
        if (!messageRef.current) return;
        const message = messageRef.current.value;
        if (!message) return;

        sendMessage({
            message,
            type: "conversation",
            receiverId: detail.userId,
        });
        onClose();
        messageRef.current.value = "";
    }, [sendMessage, detail, onClose]);
    return (
        <>
            <CustomModal isOpen={isOpen} onClose={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

                <div className="py-10 px-3 w-full flex flex-col z-100 items-center bg-white gap-4">

                    {
                        detail && (
                            <div className="px-10 w-full flex-1 flex flex-col gap-4 justify-start text-left">
                                <h4 className="text-base md:text-xl">
                                    {`株式会社${detail?.companyName ?? ""}`}
                                </h4>
                                <div className="w-full text-primary-default text-base flex flex-col justify-start">
                                    <span>
                                        {`職種：`}
                                    </span>
                                    <span>
                                        {`勤務地：${prefecturesJa[parseInt(detail.user.work_location ?? "1") - 1]}`}
                                    </span>
                                    <span className="w-full line-clamp-1">
                                        {`メッセージ：${
                                            detail.user.messagesSent.length > 0 ? detail.user.messagesSent[detail.user.messagesSent.length - 1].message : ""
                                        }`}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    <div className="px-6 py-3 w-full flex flex-col justify-start gap-3">
                        <span className="text-left">メッセージ</span>
                        <MessageboxTextarea
                            ref={messageRef}
                            placeholder=""
                            onSendMessage={onMessage}
                            isSendingMessage={isSendingMessage}
                        />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 md:gap-8">
                        <button
                            className={`px-8 py-2 border-border-default bg-[#868282] text-lg text-white flex items-center justify-center gap-x-2 rounded-lg  relative active:bg-primary-default hover:bg-gray-30`}
                            onClick={onClose}
                        >
                            {closeLabel}
                        </button>
                        <DefaultButton
                            onClick={onConfirm}
                            label={confirmLabel}
                            variant="primary"
                            rounded={false}
                            className="text-lg"
                        />
                    </div>
                </div>
            </CustomModal>
        </>
    )
}

export default BusinessDetailModal;

BusinessDetailModal.displayName = "BusinessDetailModal";

interface InputProps {
    placeholder: string;
    type?: string;
    hasError?: boolean;
    rows?: number;
    className?: string;
    isSendingMessage: boolean;
    onSendMessage: () => void;
}

const MessageboxTextarea = forwardRef<HTMLTextAreaElement, InputProps>(
    ({
        placeholder,
        hasError,
        rows,
        className,
        isSendingMessage,
        onSendMessage
    }, 
    ref
) => {
    // const inputRef = useRef<HTMLTextAreaElement | null>(null);
    return (
        <div className="w-full relative">
            <textarea 
                ref={ref}
                placeholder={placeholder}
                rows={rows ?? 5}
                className={`px-4 py-3 w-full border border-border-default rounded-lg focus:outline-none focus:border-primary-active ${hasError && "border-red-20"} ${className ?? ""}`}
            ></textarea>
            <button className="hover:text-orange-30"
                disabled={isSendingMessage}
                onClick={onSendMessage}
            >
                <SendIcon className="absolute right-2 bottom-4 w-8 h-6 cursor-pointer"/>
            </button>
        </div>
    );
});

MessageboxTextarea.displayName = "MessageboxTextarea";

