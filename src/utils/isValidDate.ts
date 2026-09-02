export function isValidDate(dateString: string): boolean {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);

    if (!match) return false;

    const dayValue = match[1];
    const monthValue = match[2];
    const yearValue = match[3];

    if (!dayValue || !monthValue || !yearValue) return false;

    const day = parseInt(dayValue, 10);
    const month = parseInt(monthValue, 10) - 1;
    const year = parseInt(yearValue, 10);

    const date = new Date(year, month, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
    );
}