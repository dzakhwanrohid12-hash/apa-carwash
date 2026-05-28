export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`
                block
                mb-2

                text-[14px]

                font-semibold

                text-[#1F2937]

                ${className}
            `}
        >
            {value ?? children}
        </label>
    );
}
