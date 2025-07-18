"use client";

import { prefecturesJa } from "@/app/content/prefectures";

interface PropType {
    detail: any;
    isApplying?: boolean;
    isApplied?: boolean;
    onDetail: () => void;
    onApply: () => void;
}

export default function BusinessCard ({
    detail,
    isApplying,
    isApplied,
    onDetail, 
    onApply,
}: PropType) {
    return (
        <div className="py-4 mt-5 px-3 w-full border border-border-default rounded-lg md:rounded-xl flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="flex-1 flex flex-col gap-4 justify-start">
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
            <div className="w-full md:w-[205px] flex flex-row md:grid md:grid-flow-col md:grid-rows-2 gap-3">
                <button
                    onClick={onDetail}
                    className={`ml-6 px-8 py-3 flex items-center justify-center gap-x-2 rounded-lg border-primary-active border border-solid bg-white text-primary-active text-xs shadow-md relative truncate cursor-pointer hover:bg-orange-70 active:bg-orange-60 hover:text-primary-active`}
                >
                    詳細を見る
                </button>
                <button
                    onClick={onApply}
                    disabled={isApplying}
                    className={`ml-6 px-8 flex items-center justify-center gap-x-2 rounded-lg border-primary-default border border-solid bg-[#4D433F] text-white text-xs shadow-md relative truncate cursor-pointer hover:bg-border-default`}
                >
                    {
                        isApplied ? "応募を取り消す" : "応募する"
                    }
                </button>
            </div>
        </div>
    );
}