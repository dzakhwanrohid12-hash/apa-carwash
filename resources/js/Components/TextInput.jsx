import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref,
) {
    const localRef = useRef();
    useImperativeHandle(ref, () => ({
        focus() {
            localRef.current?.focus();
        },
    }));
    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);
    return (
        <input
            {...props}
            ref={localRef}
            type={type}
            className={`w-full h-[56px] px-6 rounded-[18px] bg-[#FBFCFD] border border-[#E6EDF4] text-[#132033] placeholder:text-[#94A3B8] transition duration-300 outline-none hover:border-[#14B8A6]/30 focus:border-[#F2C94C] focus:ring-4 focus:ring-[#F2C94C]/10 ${className}`}
        />
    );
});
