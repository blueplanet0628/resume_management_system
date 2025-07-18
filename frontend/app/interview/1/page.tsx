"use client";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMultiTypeMessages } from "@/app/queries/query";
import { useMessage } from "@/app/queries/mutation";
import MessageBox from "@/components/box/message";
import PlusIcon from "@/assets/svg/plus.svg";

const ClientInterviewAdviceApplyingReasons = () => {
  const [activeReason, setActiveReason] = useState<string>();
  const [changingReasonMessages, setChangingReasonMessages] = useState<
    Array<any>
  >([]);
  const [resigningReasonMessages, setResigningReasonMessages] = useState<
    Array<any>
  >([]);
  const [futureTodoMessages, setFutureTodoMessages] = useState<Array<any>>([]);
  const [currentUserId, setCurrentUserId] = useState(0);

  const { isSuccess: isSuccessGetting, data } = useMultiTypeMessages([
    "reason_for_changing",
    "reason_for_resigning",
    "future_todo",
  ]);
  useEffect(() => {
    if (isSuccessGetting) {
      setChangingReasonMessages(data.list.reason_for_changing);
      setResigningReasonMessages(data.list.reason_for_resigning);
      setFutureTodoMessages(data.list.future_todo);
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
      setActiveReason(_reasonName);
    },
    [reset]
  );
  const onSuccessMessage = useCallback((_data: any) => {
    const message = _data.message;
    const type = message.type;
    if (type == "reason_for_changing")
      setChangingReasonMessages((oldList) => [...oldList, message]);
    else if (type == "reason_for_resigning")
      setResigningReasonMessages((oldList) => [...oldList, message]);
    else if (type == "future_todo")
      setFutureTodoMessages((oldList) => [...oldList, message]);
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
    <div className="w-full flex flex-col gap-[20px]">
      <section className="mb-[10px] w-full text-primary-default flex flex-col justify-start gap-[20px]">
        <h2 className="text-3xl">転職理由(志望理由)</h2>
        <div className="text-base">
          項目ごとにチャット形式でアドバイスを行い、最終的に選択した回答が、あなた独自の面接対策として完成し、印刷可能な形式でご利用いただけます。
        </div>
      </section>
      <div className="py-3 px-4 w-full rounded-xl border border-border-default text-base text-primary-default flex flex-col">
        <div
          onClick={onToggleReasons("reason_for_changing")}
          className="flex flex-row justify-between items-center cursor-pointer"
        >
          <span>転職理由(志望理由)</span>
          <div className="w-[20px] h-[20px] rounded-full bg-gray-30 text-white flex flex-row items-center justify-center">
            {activeReason == "reason_for_changing" ? (
              <span className="w-[12px] h-0 border-t border-white" />
            ) : (
              <PlusIcon className="w-[12px] h-[12px] text-white" />
            )}
          </div>
        </div>
        {activeReason == "reason_for_changing" && (
          <>
            <div className="py-3 px-5 w-full h-0">
              <div className="border-t border-primary-default" />
            </div>
            {changingReasonMessages.map((_message) => (
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
              onSubmit={handleSubmit(onSubmitMessage("reason_for_changing"))}
            />
          </>
        )}
      </div>
      <div className="py-3 px-4 w-full rounded-xl border border-border-default text-base text-primary-default flex flex-col">
        <div
          onClick={onToggleReasons("reason_for_resigning")}
          className="flex flex-row justify-between items-center cursor-pointer"
        >
          <span>退職理由</span>
          <div className="w-[20px] h-[20px] rounded-full bg-gray-30 text-white flex flex-row items-center justify-center">
            {activeReason == "reason_for_resigning" ? (
              <span className="w-[12px] h-0 border-t border-white" />
            ) : (
              <PlusIcon className="w-[12px] h-[12px] text-white" />
            )}
          </div>
        </div>
        {activeReason == "reason_for_resigning" && (
          <>
            <div className="py-3 px-5 w-full h-0">
              <div className="border-t border-primary-default" />
            </div>
            {resigningReasonMessages.map((_message) => (
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
              onSubmit={handleSubmit(onSubmitMessage("reason_for_resigning"))}
            />
          </>
        )}
      </div>
      <div className="py-3 px-4 w-full rounded-xl border border-border-default text-base text-primary-default flex flex-col">
        <div
          onClick={onToggleReasons("future_todo")}
          className="flex flex-row justify-between items-center cursor-pointer"
        >
          <span>今後やりたいこと</span>
          <div className="w-[20px] h-[20px] rounded-full bg-gray-30 text-white flex flex-row items-center justify-center">
            {activeReason == "future_todo" ? (
              <span className="w-[12px] h-0 border-t border-white" />
            ) : (
              <PlusIcon className="w-[12px] h-[12px] text-white" />
            )}
          </div>
        </div>
        {activeReason == "future_todo" && (
          <>
            <div className="py-3 px-5 w-full h-0">
              <div className="border-t border-primary-default" />
            </div>
            {futureTodoMessages.map((_message) => (
              <div
                className={`my-2 px-5 flex flex-row ${
                  _message.senderId == currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
                key={`future-todo-message-${_message.id}`}
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
              onSubmit={handleSubmit(onSubmitMessage("future_todo"))}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ClientInterviewAdviceApplyingReasons;
