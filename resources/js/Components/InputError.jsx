export default function InputError({ message, className = "", ...props }) {
    return message ? (
        <p
            {...props}
            className={
                "text-sm text-red-500 font-medium mt-1.5 pl-1 " + className
            }
        >
            {message}
        </p>
    ) : null;
}
