import { useCallback } from "react";

interface InputProps {
    placeholder: string;
    type?: string;
    value: string;
    hasError?: boolean;
    rows?: number;
    className?: string;
    onChange: (newValue: string) => void;
}

const Textarea = ({
    placeholder,
    value,
    hasError,
    rows,
    className,
    onChange
}: InputProps) => {
    const onChangeValue = useCallback((e: any) => {
        onChange(e.target?.value ?? "");
    }, [onChange]);
    return (
        <textarea 
            value={value}
            placeholder={placeholder}
            onChange={onChangeValue}
            rows={rows ?? 5}
            className={`px-4 py-3 border border-border-default rounded-lg bg-white focus:outline-none focus:border-primary-active ${hasError && "border-red-20"} ${className ?? ""}`}
        ></textarea>
    );
}

export default Textarea;