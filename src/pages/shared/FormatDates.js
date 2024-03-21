function formatDateTimeValue(num) {
    return num / 10 > 1 ? `${num}` : `0${num}`;
}

export function FormatDateTime(date) {
    const day = formatDateTimeValue(date.getDate());
    const month = formatDateTimeValue(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = formatDateTimeValue(date.getHours());
    const minutes = formatDateTimeValue(date.getMinutes());
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function FormatDate(date) {
    const day = formatDateTimeValue(date.getDate());
    const month = formatDateTimeValue(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}


