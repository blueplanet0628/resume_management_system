import { Controller } from "react-hook-form";
import Textarea from "./input";

const MessageBox = ({
    control, errors, onSubmit, isPending
}: {
    control: any, errors: any, onSubmit: () => void, isPending: boolean
}) => {
    return (
        <div className="w-full h-fit max-h-90vh md:max-h-[400px] flex flex-col">
            <div className="flex-none w-full py-3 px-5">
                <div className="pt-3 w-full border-t border-primary-default flex flex-col gap-3">
                    <Controller
                        control={control}
                        name="message"
                        rules={{
                            required: "Required"
                        }}
                        render={({ field: { value, onChange }}) => (
                            <Textarea
                                value={value}
                                onChange={onChange}
                                placeholder="入力してください。"
                                hasError={errors.message?.message ? true : false}
                                className=""
                            />
                        )}
                    />
                    <button
                        className="py-0.5 border border-border-default rounded-sm hover:bg-gray-70 cursor-pointer"
                        disabled={isPending}
                        onClick={onSubmit}
                    >
                        送信
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MessageBox;