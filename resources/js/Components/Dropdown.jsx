import { Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { createContext, useContext, useState } from "react";

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((v) => !v);
    };

    return (
        <DropDownContext.Provider
            value={{
                open,
                setOpen,
                toggleOpen,
            }}
        >
            <div
                className="
relative
"
            >
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div
                onClick={toggleOpen}
                className="
cursor-pointer
"
            >
                {children}
            </div>

            {open && (
                <div
                    className="
fixed

inset-0

z-[70]
"
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

    let alignment = "";

    if (align === "left") {
        alignment = "left-0";
    }

    if (align === "right") {
        alignment = "right-0";
    }

    let widthClass = "";

    if (width === "48") {
        widthClass = "w-48";
    }

    if (width === "56") {
        widthClass = "w-56";
    }

    return (
        <Transition
            show={open}
            enter="
transition
duration-300
"
            enterFrom="
opacity-0
translate-y-2
scale-[.98]
"
            enterTo="
opacity-100
translate-y-0
scale-100
"
            leave="
transition
duration-200
"
            leaveFrom="
opacity-100
"
            leaveTo="
opacity-0
translate-y-2
"
        >
            <div
                className={`

absolute

z-[80]

mt-4

${alignment}

${widthClass}

`}
                onClick={() => setOpen(false)}
            >
                <div
                    className={`

overflow-hidden

rounded-[22px]

border

border-secondary-100

bg-white/92

backdrop-blur-xl

shadow-[0_28px_80px_rgba(19,32,51,.12)]

p-2

${contentClasses}

`}
                >
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({
    className = "",

    children,

    ...props
}) => {
    return (
        <Link
            {...props}
            className={`

flex

items-center

w-full

rounded-[16px]

px-4

py-3

text-[14px]

font-medium

text-text

transition-all

duration-300

hover:bg-secondary-500

hover:text-white

${className}

`}
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;

Dropdown.Content = Content;

Dropdown.Link = DropdownLink;

export default Dropdown;
