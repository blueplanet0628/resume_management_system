"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCaretRight } from "react-icons/fa";

import { useMultiTypeMessages } from "@/app/queries/query";
import { useMessage } from "@/app/queries/mutation";

import PlusIcon from "@/assets/svg/plus.svg";
import MessageBox from "@/components/box/message";
import ButtonWithIcon from "@/components/button/button-with-icon";
import { useMyResume } from "@/app/queries/query";


const Page = () => {
    const [activeReason, setActiveReason] = useState<string>();
    const [applyingReasonMessages, setApplyingReasonMessages] = useState<Array<any>>([]);
    const [otherQuestionsMessages, setOtherQuestionsMessages] = useState<Array<any>>([]);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [hasResume, setHasResume] = useState(false);

    const {
        isSuccess: isSuccessGetting,
        data
    } = useMultiTypeMessages(
        [
            "reason_for_applying",
            "other_questions",
        ]
    );

    const {
        data: resumeData,
        isSuccess: isResumeSuccess,
      } = useMyResume();
      
    useEffect(() => {
        if (isSuccessGetting) {
          setApplyingReasonMessages(data.list.reason_for_applying);
          setOtherQuestionsMessages(data.list.other_questions);
          setCurrentUserId(data.userId);
        }
      
        if (isResumeSuccess && resumeData) {
          setHasResume(true);
        }
      }, [isSuccessGetting, data, isResumeSuccess, resumeData]);

    const {
        control,
        handleSubmit,
        setValue, 
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            message: ""
        }
    });
    
    const onToggleReasons = useCallback((_reasonName: string) => () => {
        reset();
        setActiveReason(_old => _old == _reasonName ? undefined : _reasonName);
    }, [reset]);
    const onSuccessMessage = useCallback((_data: any) => {
        const message = _data.message;
        const type = message.type;
        console.log("success,", message)

        if (type == "reason_for_applying")
            setApplyingReasonMessages(oldList => [...oldList, message]);
        else if (type == "other_questions")
            setOtherQuestionsMessages(oldList => [...oldList, message]);
    }, []);
    const {
        mutate: sendMessage,
        isPending: sendingMessage
    } = useMessage(0, onSuccessMessage);
    const onSubmitMessage = useCallback((type: string) => (_data: any) => {
        sendMessage({
            ..._data,
            type
        });
        reset();
    }, [sendMessage, reset]);

    return (
        <div className="w-full flex flex-col gap-[20px]">
            <section className="mb-[10px] w-full text-primary-default flex flex-col justify-start gap-[20px]">
                <h2 className="text-[28px] font-semibold">
                    面接対策
                </h2>
                <div className="text-base">
                    {
                        hasResume ? "ここでは想定される質問とあなたの職務経歴書をベースに、回答の添削やアドバイスを受けることができます。下の質問をクリックして回答を入力すると、弊社とのやり取りや添削画面を閲覧できます。" : 
                        "ここでは想定される質問とあなたの職務経歴書をベースに、回答の添削やアドバイスを受けることができます。面接対策を開始するには、まず職務職務書を作成してください。"
                    }                    
                </div>
            </section>
            {
                hasResume || (
                    <div className="w-full flex flex-col items-center">
                        <ButtonWithIcon
                            href="/register-resume"
                            label="職務経歴書を作成する"
                            variant="primary"
                            disabled={false}
                            rounded={false}
                            Icon={FaCaretRight}
                            className="py-4 w-full md:w-64"
                        />
                    </div>
                )
            }
            {
                hasResume && (
                    <div className="py-3 px-4 w-full rounded-xl border border-border-default text-base text-primary-default flex flex-col">
                        <div
                            onClick={onToggleReasons("reason_for_applying")}
                            className="flex flex-row justify-between items-center cursor-pointer"
                        >
                            <span>
                                志望理由
                            </span>
                            <div 
                                className="w-[20px] h-[20px] rounded-full bg-gray-30 text-white flex flex-row items-center justify-center"
                            >
                                {
                                    activeReason == "reason_for_applying" ? (
                                        <span className="w-[12px] h-0 border-t border-white" />
                                    ) : (
                                        <PlusIcon className="w-[12px] h-[12px] text-white" />
                                    )
                                }
                            </div>
                        </div>
                        {
                            activeReason == "reason_for_applying" && 
                            (
                                <>
                                    <div className="py-3 px-5 w-full h-0">
                                        <div className="border-t border-primary-default" />
                                    </div>
                                    {
                                        applyingReasonMessages.map((_message) => (
                                            <div
                                                className={`my-2 px-5 flex flex-row ${
                                                    _message.senderId == currentUserId ? "justify-end" : "justify-start"
                                                }`}
                                                key={`resigning-message-${_message.id}`}
                                            >
                                                <div 
                                                    className={`px-3 py-4 w-9/10 rounded-xl whitespace-pre-line flex flex-col gap-3 ${
                                                        _message.senderId == currentUserId ? "bg-primary-default text-white" : "bg-[#eee] text-primary-default"
                                                    }`}
                                                >
                                                    {
                                                        _message.senderId == currentUserId && (
                                                            <span>
                                                                {`${_message.sender?.firstName} ${_message.sender?.lastName}`}
                                                            </span>
                                                        )
                                                    }
                                                    {
                                                        _message.message
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <MessageBox
                                        control={control}
                                        errors={errors}
                                        isPending={sendingMessage}
                                        onSubmit={handleSubmit(onSubmitMessage("reason_for_applying"))}
                                    />                        
                                </>
                            )
                        }    
                    </div>
                )
            }
            {/* <div className="py-3 px-4 w-full rounded-xl border border-border-default text-base text-primary-default flex flex-col">
                <div 
                    onClick={onToggleReasons("reason_for_applying2")}
                    className="flex flex-row justify-between items-center cursor-pointer"
                >
                    <span>
                        志望理由
                    </span>
                    <div 
                        className="w-[20px] h-[20px] rounded-full bg-gray-30 text-white flex flex-row items-center justify-center"
                    >
                        {
                            activeReason == "reason_for_applying2" ? (
                                <span className="w-[12px] h-0 border-t border-white" />
                            ) : (
                                <PlusIcon className="w-[12px] h-[12px] text-white" />
                            )
                        }
                    </div>
                </div>
                {
                    activeReason == "reason_for_applying2" && 
                    <MessageBox
                        control={control}
                        errors={errors}
                        onSubmit={() => {}}
                    />
                }
            </div> */}
            {
                hasResume && (
                    <div className="py-3 px-4 w-full rounded-xl border border-border-default text-base text-primary-default flex flex-col">
                        <div 
                            onClick={onToggleReasons("other_questions")}
                            className="flex flex-row justify-between items-center cursor-pointer"
                        >
                            <span>
                                その他、質問
                            </span>
                            <div 
                                className="w-[20px] h-[20px] rounded-full bg-gray-30 text-white flex flex-row items-center justify-center"
                            >
                                {
                                    activeReason == "other_questions" ? (
                                        <span className="w-[12px] h-0 border-t border-white" />
                                    ) : (
                                        <PlusIcon className="w-[12px] h-[12px] text-white" />
                                    )
                                }
                            </div>
                        </div>
                        {
                            activeReason == "other_questions" && 
                            (
                                <>
                                    <div className="py-3 px-5 w-full h-0">
                                        <div className="border-t border-primary-default" />
                                    </div>
                                    {
                                        otherQuestionsMessages.map((_message) => (
                                            <div
                                                className={`my-2 px-5 flex flex-row ${
                                                    _message.senderId == currentUserId ? "justify-end" : "justify-start"
                                                }`}
                                                key={`resigning-message-${_message.id}`}
                                            >
                                                <div 
                                                    className={`px-3 py-4 w-9/10 rounded-xl whitespace-pre-line flex flex-col gap-3 ${
                                                        _message.senderId == currentUserId ? "bg-primary-default text-white" : "bg-[#eee] text-primary-default"
                                                    }`}
                                                >
                                                    {
                                                        _message.senderId == currentUserId && (
                                                            <span>
                                                                {`${_message.sender?.firstName} ${_message.sender?.lastName}`}
                                                            </span>
                                                        )
                                                    }
                                                    {
                                                        _message.message
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <MessageBox
                                        control={control}
                                        errors={errors}
                                        isPending={sendingMessage}
                                        onSubmit={handleSubmit(onSubmitMessage("other_questions"))}
                                    />                        
                                </>
                            )
                        }    
                    </div>
                )
            }
        </div>
    );
}

export default Page;

