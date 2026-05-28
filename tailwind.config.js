import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                display: ["Syne", ...defaultTheme.fontFamily.sans],
                mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
            },

            colors: {
                primary: {
                    50: "#FFFDF6",
                    100: "#FFF8E2",
                    200: "#F9E6A2",
                    300: "#F2C94C",
                    400: "#D4A91D",
                    500: "#B8860B",
                },

                secondary: {
                    50: "#F5F8FB",
                    100: "#E7EDF3",
                    200: "#D4DEE7",
                    300: "#93A6B9",

                    400: "#36546D",

                    500: "#214761",

                    600: "#18344A",

                    700: "#132033",
                },

                surface: {
                    DEFAULT: "#FBFCFD",

                    soft: "#F7F9FB",

                    muted: "#EEF3F7",
                },

                text: {
                    DEFAULT: "#132033",

                    muted: "#64748B",

                    soft: "#93A6B9",
                },

                success: "#2E7D32",

                danger: "#D14343",

                warning: "#D4A91D",
            },
        },
    },

    plugins: [forms],
};
