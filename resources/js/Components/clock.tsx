import { useCallback, useRef } from "react";

const Clock = () => {
    const clockRef = useRef<HTMLSpanElement>(null);

    const clock = useCallback(() => {
        if (clockRef.current) {
            const date = new Date;
            const year = date.getFullYear();
            const month = date.getMonth();
            const months = new Array('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember');
            const d = date.getDate();
            const day = date.getDay();
            const days = new Array('Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu');
            let h: number | string = date.getHours();
            if (h < 10) {
                h = "0" + h;
            }
            let m: number | string = date.getMinutes();
            if (m < 10) {
                m = "0" + m;
            }
            let s: number | string = date.getSeconds();
            if (s < 10) {
                s = "0" + s;
            }
            const result = '' + days[day] + ', ' + d + ' ' + months[month] + ' ' + year + ' - ' + h + ':' + m + ':' + s;
            clockRef.current.textContent = `${result}`;
        }
    }, [])

    setInterval(clock, 1000);
    return (
        <span ref={clockRef} className="mx-0.5 h-6 text-center md:text-start">~</span>
    )
}

export default Clock;
