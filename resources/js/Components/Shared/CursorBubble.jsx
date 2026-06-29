import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorBubble() {
    // 1. Koordinat asli kursor
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // 2. Konfigurasi Spring (Pegas) untuk masing-masing gelembung
    // Gelembung 1 (Kepala) - Paling cepat merespon
    const spring1 = { damping: 20, stiffness: 300, mass: 0.1 };
    const x1 = useSpring(cursorX, spring1);
    const y1 = useSpring(cursorY, spring1);

    // Gelembung 2 (Tengah) - Sedikit tertinggal
    const spring2 = { damping: 20, stiffness: 200, mass: 0.4 };
    const x2 = useSpring(cursorX, spring2);
    const y2 = useSpring(cursorY, spring2);

    // Gelembung 3 (Ekor) - Paling lambat / paling tertinggal
    const spring3 = { damping: 20, stiffness: 100, mass: 0.8 };
    const x3 = useSpring(cursorX, spring3);
    const y3 = useSpring(cursorY, spring3);

    useEffect(() => {
        const moveCursor = (e) => {
            // Ukuran gelembung utama adalah w-5 h-5 (20px).
            // Kita kurangi 10px agar kursor tepat berada di tengah gelembung.
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    // Style dasar gelembung: Biru muda halus (Sky Blue), bulat, dengan efek blur bayangan tipis
    const baseBubbleClass =
        "pointer-events-none fixed top-0 left-0 rounded-full z-[9999] hidden md:block bg-gradient-to-br from-sky-300 to-white shadow-[0_0_8px_rgba(125,211,252,0.6)]";

    return (
        <>
            {/* Gelembung 3 (Ekor) - Paling kecil */}
            <motion.div
                className={`${baseBubbleClass} w-3 h-3`}
                style={{ x: x3, y: y3, opacity: 0.4 }}
            />

            {/* Gelembung 2 (Tengah) - Ukuran sedang */}
            <motion.div
                className={`${baseBubbleClass} w-4 h-4`}
                style={{ x: x2, y: y2, opacity: 0.7 }}
            />

            {/* Gelembung 1 (Utama/Kepala) - Paling besar sesuai gambar Anda */}
            <motion.div
                className={`${baseBubbleClass} w-5 h-5`}
                style={{ x: x1, y: y1, opacity: 0.9 }}
            />
        </>
    );
}
