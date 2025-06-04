// src/utils/generateIncomeData.js
export function generateDailyExpenseData(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const today = new Date();

    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const maxDate = year === currentYear && month === currentMonth
        ? today.getDate()
        : daysInMonth;

    return Array.from({ length: maxDate }, (_, i) => ({
        date: `${i + 1}`,
        expense: Math.floor(Math.random() * 500), // or any logic
    }));
}
