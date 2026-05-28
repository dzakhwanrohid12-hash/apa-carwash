import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "APA Car Wash";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // import.meta.glob TANPA { eager: true } sudah otomatis melakukan code-splitting & lazy loading di Vite!
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        // Progress bar bawaan Inertia yang menggantikan fungsi Suspense Loader
        color: "#F2C94C", // Warna primary-300 (Gold)
        showSpinner: true,
    },
});
