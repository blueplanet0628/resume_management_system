"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useMultiTypeMessages } from "@/app/queries/query";
import { useMessage } from "@/app/queries/mutation";
// import { getRequiredPlansForUrl } from "@/content/seeker/url-plan-mapping";

import PlusIcon from "@/assets/svg/plus.svg";
import MessageBox from "@/components/box/message";

const Page = () => {
//   const planIds = getRequiredPlansForUrl(
//     "/confirm-scout/applying-reasons-assist"
//   );

  return (
    // <ProtectedPaidPage planIds={planIds}>
    <ApplyingReasonsAssistContent />
    // </ProtectedPaidPage>
  );
};

const ApplyingReasonsAssistContent = () => {
  const [activeReason, setActiveReason] = useState<string>();
  const [enterReasonMessages, setEnterReasonMessages] = useState<Array<any>>(
    []
  );
  const [afterJoinMessages, setAfterJoinMessages] = useState<Array<any>>([]);
  const [companyAgreePointMessages, setCompanyAgreedPointMessages] = useState<
    Array<any>
  >([]);
  const [currentUserId, setCurrentUserId] = useState(0);

  const { isSuccess: isSuccessGetting, data } = useMultiTypeMessages([
    "enter_reason",
    "after_join",
    "company_agree_point",
  ]);
  useEffect(() => {
    if (isSuccessGetting) {
      setEnterReasonMessages(data.list.enter_reason);
      setAfterJoinMessages(data.list.after_join);
      setCompanyAgreedPointMessages(data.list.company_agree_point);
      setCurrentUserId(data.userId);
    }
  }, [isSuccessGetting, data]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onToggleReasons = useCallback(
    (_reasonName: string) => () => {
      reset();
      setActiveReason((_old) =>
        _old == _reasonName ? undefined : _reasonName
      );
    },
    [reset]
  );
  const onSuccessMessage = useCallback((_data: any) => {
    const message = _data.message;
    const type = message.type;

    if (type == "enter_reason")
      setEnterReasonMessages((oldList) => [...oldList, message]);
    else if (type == "after_join")
      setAfterJoinMessages((oldList) => [...oldList, message]);
    else if (type == "company_agree_point")
      setCompanyAgreedPointMessages((oldList) => [...oldList, message]);
  }, []);
  const { mutate: sendMessage, isPending: sendingMessage } = useMessage(
    0,
    onSuccessMessage
  );
  const onSubmitMessage = useCallback(
    (type: string) => (_data: any) => {
      sendMessage({
        ..._data,
        type,
      });
      reset();
    },
    [sendMessage, reset]
  );

  return (
    <div className="py-[50px] w-full flex flex-col gap-[20px]">
      <section className="mb-[10px] w-full text-primary-default flex flex-col justify-start gap-[20px]">
        <h2 className="text-[28px] font-semibold">
          スカウト企業への志望理由作成補助
        </h2>
        <div className="text-base">
          スカウトを受け企業とのマッチングが成立後、その企業に対する志望理由を作成するサポートを行います。
        </div>
      </section>
      <div className="py-3 px-4 w-full rounded-xl border border-border-default text-base text-primary-default flex flex-col">
        <div
          onClick={onToggleReasons("enter_reason")}
          className="flex flex-row justify-between items-center cursor-pointer"
        >
          <span>なぜこの業界を進むのか?</span>
          <div className="w-[20px] h-[20px] rounded-full bg-gray-30 text-white flex flex-row items-center justify-center">
            {activeReason == "enter_reason" ? (
              <span className="w-[12px] h-0 border-t border-white" />
            ) : (
              <PlusIcon className="w-[12px] h-[12px] text-white" />
            )}
          </div>
        </div>
        {activeReason == "enter_reason" && (
          <>
            <div className="py-3 px-5 w-full h-0">
              <div className="border-t border-primary-default" />
            </div>
            {enterReasonMessages.map((_message) => (
              <div
                className={`my-2 px-5 flex flex-row ${
                  _message.senderId == currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
                key={`resigning-message-${_message.id}`}
              >
                <div
                  className={`px-3 py-4 w-9/10 rounded-xl whitespace-pre-line flex flex-col gap-3 ${
                    _message.senderId == currentUserId
                      ? "bg-primary-default text-white"
                      : "bg-[#eee] text-primary-default"
                  }`}
                >
                  {_message.senderId == currentUserId && (
                    <span>
                      {`${_message.sender?.firstName} ${_message.sender?.lastName}`}
                    </span>
                  )}
                  {_message.message}
                </div>
              </div>
            ))}
            <MessageBox
              control={control}
              errors={errors}
              isPending={sendingMessage}
              onSubmit={handleSubmit(onSubmitMessage("enter_reason"))}
            />
          </>
        )}
      </div>
      <div className="py-3 px-4 w-full rounded-xl border border-border-default text-base text-primary-default flex flex-col">
        <div
          onClick={onToggleReasons("after_join")}
          className="flex flex-row justify-between items-center cursor-pointer"
        >
          <span>入社後にやりたいこと・目標は？</span>
          <div className="w-[20px] h-[20px] rounded-full bg-gray-30 text-white flex flex-row items-center justify-center">
            {activeReason == "after_join" ? (
              <span className="w-[12px] h-0 border-t border-white" />
            ) : (
              <PlusIcon className="w-[12px] h-[12px] text-white" />
            )}
          </div>
        </div>
        {activeReason == "after_join" && (
          <>
            <div className="py-3 px-5 w-full h-0">
              <div className="border-t border-primary-default" />
            </div>
            {afterJoinMessages.map((_message) => (
              <div
                className={`my-2 px-5 flex flex-row ${
                  _message.senderId == currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
                key={`resigning-message-${_message.id}`}
              >
                <div
                  className={`px-3 py-4 w-9/10 rounded-xl whitespace-pre-line flex flex-col gap-3 ${
                    _message.senderId == currentUserId
                      ? "bg-primary-default text-white"
                      : "bg-[#eee] text-primary-default"
                  }`}
                >
                  {_message.senderId == currentUserId && (
                    <span>
                      {`${_message.sender?.firstName} ${_message.sender?.lastName}`}
                    </span>
                  )}
                  {_message.message}
                </div>
              </div>
            ))}
            <MessageBox
              control={control}
              errors={errors}
              isPending={sendingMessage}
              onSubmit={handleSubmit(onSubmitMessage("after_join"))}
            />
          </>
        )}
      </div>
      <div className="py-3 px-4 w-full rounded-xl border border-border-default text-base text-primary-default flex flex-col">
        <div
          onClick={onToggleReasons("company_agree_point")}
          className="flex flex-row justify-between items-center cursor-pointer"
        >
          <span>この企業のどの点に魅力を感じるか？</span>
          <div className="w-[20px] h-[20px] rounded-full bg-gray-30 text-white flex flex-row items-center justify-center">
            {activeReason == "company_agree_point" ? (
              <span className="w-[12px] h-0 border-t border-white" />
            ) : (
              <PlusIcon className="w-[12px] h-[12px] text-white" />
            )}
          </div>
        </div>
        {activeReason == "company_agree_point" && (
          <>
            <div className="py-3 px-5 w-full h-0">
              <div className="border-t border-primary-default" />
            </div>
            {companyAgreePointMessages.map((_message) => (
              <div
                className={`my-2 px-5 flex flex-row ${
                  _message.senderId == currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
                key={`resigning-message-${_message.id}`}
              >
                <div
                  className={`px-3 py-4 w-9/10 rounded-xl whitespace-pre-line flex flex-col gap-3 ${
                    _message.senderId == currentUserId
                      ? "bg-primary-default text-white"
                      : "bg-[#eee] text-primary-default"
                  }`}
                >
                  {_message.senderId == currentUserId && (
                    <span>
                      {`${_message.sender?.firstName} ${_message.sender?.lastName}`}
                    </span>
                  )}
                  {_message.message}
                </div>
              </div>
            ))}
            <MessageBox
              control={control}
              errors={errors}
              isPending={sendingMessage}
              onSubmit={handleSubmit(onSubmitMessage("company_agree_point"))}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
