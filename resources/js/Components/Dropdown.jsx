import { Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { createContext, useContext, useState } from "react";

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((v) => !v);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen} className="cursor-pointer">
                {children}
            </div>

            {open && (
                <div
                    className="fixed inset-0 z-[70]"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
};

const Content = ({
    align = "right",
    width = "56",
    contentClasses = "",
    children,
}) => {
    const { open, setOpen } = useContext(DropDownContext);

    const alignment = align === "left" ? "left-0" : "right-0";
    const widthClass = width === "48" ? "w-48" : "w-56";

    return (
        <Transition
            show={open}
            enter="transition duration-300"
            enterFrom="opacity-0 translate-y-2 scale-[.98]"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 translate-y-2"
        >
            <div
                className={`absolute z-[80] mt-4 ${alignment} ${widthClass}`}
                onClick={() => setOpen(false)}
            >
                <div
                    className={`overflow-hidden rounded-[24px] border border-secondary-100 bg-white shadow-[0_30px_80px_rgba(19,32,51,.12)] ring-1 ring-primary-300/10 ${contentClasses}`}
                >
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({ className = "", children, ...props }) => {
    return (
        <Link
            {...props}
            className={`flex items-center gap-3 w-full rounded-[16px] px-4 py-3 text-[14px] font-medium text-secondary-700 transition-all duration-300 hover:bg-[linear-gradient(135deg,#F7D86A,#F2C94C)] hover:text-secondary-700 hover:shadow-[0_10px_30px_rgba(242,201,76,.18)] ${className}`}
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
