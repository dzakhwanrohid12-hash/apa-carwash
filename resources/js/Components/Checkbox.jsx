export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={`
                w-5
                h-5

                rounded-lg

                border-[#DCE7ED]

                text-[#14B8A6]

                focus:ring-[#14B8A6]/20

                transition

                ${className}
            `}
        />
    );
}
