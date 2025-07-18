interface CheckProps {
    checked: boolean;
    label: string | any;
    name?: string;
    onClick: () => void;
    disabled?: boolean;
}

const CheckInput = (props: CheckProps) => {
    return (
        <div className="flex flex-row items-center gap-2">
            <input
                type="checkbox"
                id={props.name ?? "checkbox"}
                checked={props.checked}
                onChange={props.onClick}
                className={`relative peer shrink-0 appearance-none w-5 h-5 border border-border-default rounded-sm ${props.checked ? "bg-orange-deep" : "bg-white"} checked:bg-ornage-deep checked:border-0 focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-orange-deep disabled:border-primary-disable disabled:bg-primary-disable`}
            />
            <label htmlFor={props.name ?? "checkbox"}>
                {props.label}
            </label>
            <svg
                className="
                    absolute 
                    w-5 h-5 mt-1
                    hidden peer-checked:block
                    pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
    );
}

const CheckInputConditions = (props: CheckProps) => {
    return (
        <div className="flex flex-row items-center gap-2 relative">
            <input
                type="checkbox"
                id={props.name ?? "checkbox"}
                checked={props.checked}
                onChange={props.onClick}
                disabled={props.disabled}
                className={`relative peer shrink-0 appearance-none w-5 h-5 border border-border-default rounded-sm bg-gray-80 checked:bg-ornage-deep checked:border-0 focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-orange-deep disabled:border-primary-disable disabled:bg-gray-60`}
            />
            <label htmlFor={props.name ?? "checkbox"}>
                {props.label}
            </label>
            <svg
                className="absolute mt-1 w-5 h-5 text-primary-active hidden peer-checked:block pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
    );
}

export default CheckInput;
export { CheckInputConditions };