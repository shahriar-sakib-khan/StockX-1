// src/hooks/useCurrentMonth.js
export default function useCurrentMonth() {
    const today = new Date();
    return {
        year: today.getFullYear(),
        month: today.getMonth() + 1, // JS months are 0-indexed
    };
}
