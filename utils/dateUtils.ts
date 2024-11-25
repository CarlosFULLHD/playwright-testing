export function calculateOneMonthFromToday(): Date {
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    return nextMonthDate;
}

export function formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatDateForDisplay(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const currentYear = new Date().getFullYear();
    const givenYear = date.getFullYear();

    return currentYear !== givenYear ? `${formattedDate} ${givenYear}` : formattedDate;
}

