export function formatDateForSeparator(dateParameter) {
    const now = new Date();
    const d = dateParameter;

    const isSameDay = (d1, d2) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();

    const pad = (n) => n.toString().padStart(2, '0');
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    if (isSameDay(d, now)) return `сьогодні ${time}`;
    if (isSameDay(d, yesterday)) return `вчора ${time}`;
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${time}`;
}

export function formatRelativeDateTime(dateParameter) {
    const now = new Date();
    const date = dateParameter;

    const pad = (n) => n.toString().padStart(2, '0');
    const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    const isSameDay = (d1, d2) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    if (isSameDay(date, now)) {
        return `сьогодні ${time}`;
    } else if (isSameDay(date, yesterday)) {
        return `вчора ${time}`;
    } else {
        return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${time}`;
    }
}


export function checkNewDay(prevDate, currentDate) {
    return (
        prevDate.getFullYear() !== currentDate.getFullYear() ||
        prevDate.getMonth() !== currentDate.getMonth() ||
        prevDate.getDate() !== currentDate.getDate()
    );
}