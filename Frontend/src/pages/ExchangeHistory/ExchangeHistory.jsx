import React, { useState } from 'react';
import styles from './ExchangeHistory.module.css';
import { FiSearch } from 'react-icons/fi';

const transactions = [
    { id: 1, type: 'Buy', cylinderCount: 5, amount: 1200, date: '2025-06-03T09:15:00', shop: 'Rahim Gas' },
    { id: 2, type: 'Sell', cylinderCount: 2, amount: 600, date: '2025-06-02T17:45:00', shop: 'Karim Traders' },
    { id: 3, type: 'Buy', cylinderCount: 4, amount: 1200, date: '2025-05-30T11:30:00', shop: 'Hasan Store' },
    { id: 4, type: 'Sell', cylinderCount: 3, amount: 1300, date: '2025-06-01T14:00:00', shop: 'Karim Traders' },
    { id: 5, type: 'Buy', cylinderCount: 1, amount: 650, date: '2025-05-28T10:00:00', shop: 'Meena Gas' }
];

const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
        date: date.toLocaleDateString(undefined, options),
        time,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
};

function ExchangeHistory() {
    const [filter, setFilter] = useState('default');
    const [search, setSearch] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    const years = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Step 1: filter logic
    let filteredTransactions = transactions.filter((t) => {
        const lowerSearch = search.toLowerCase();
        const { year: tYear, month: tMonth, day: tDay, date: readableDate } = formatDateTime(t.date);
        const searchMatchesDate = readableDate.toLowerCase().includes(lowerSearch);
        const searchMatchesShop = t.shop.toLowerCase().includes(lowerSearch);

        switch (filter) {
            case 'By Shop':
                return searchMatchesShop;
            case 'By Date':
                return (
                    (!year || +year === tYear) &&
                    (!month || +month === tMonth) &&
                    (!day || +day === tDay)
                );
            case 'By Buy':
                return t.type === 'Buy' && (searchMatchesShop || searchMatchesDate);
            case 'By Sell':
                return t.type === 'Sell' && (searchMatchesShop || searchMatchesDate);
            default:
                return searchMatchesShop || searchMatchesDate;
        }
    });

// ✅ Always sort by date ascending when filtering by date
    if (filter === 'By Date') {
        filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

// ✅ Also sort by date if search input is valid date
    const parsedDate = Date.parse(search);
    if (!isNaN(parsedDate)) {
        const searchDateOnly = new Date(parsedDate).toDateString();
        filteredTransactions = filteredTransactions
            .filter(t => new Date(t.date).toDateString() === searchDateOnly)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

// ✅ Sort by shop name for shop filter
    if (filter === 'By Shop') {
        filteredTransactions.sort((a, b) => a.shop.localeCompare(b.shop));
    }


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Exchange History</h1>

            <div className={styles.controls}>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.select}>
                    <option>Default</option>
                    <option>By Shop</option>
                    <option>By Date</option>
                    <option>By Sell</option>
                    <option>By Buy</option>
                </select>

                {filter === 'By Date' && (
                    <div className={styles.dateFilters}>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="">Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            <option value="">Month</option>
                            {monthNames.map((name, idx) => (
                                <option key={idx + 1} value={idx + 1}>{name}</option>
                            ))}
                        </select>

                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                            <option value="">Day</option>
                            {days.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                )}

                <div className={styles.searchBox}>
                    <FiSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search shop or date..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {filteredTransactions.map((transaction, index) => {
                const { date, time } = formatDateTime(transaction.date);
                const isBuy = transaction.type === 'Buy';

                return (
                    <div key={transaction.id}>
                        <div className={`${styles.card} ${isBuy ? styles.buy : styles.sell}`}>
                            <div className={styles.header}>
                                <span>{date}</span>
                                <span>{time}</span>
                            </div>
                            <h2 className={styles.centeredType}>{transaction.type}</h2>
                            <div className={styles.body}>
                                <p><strong>Cylinders:</strong> {transaction.cylinderCount}</p>
                                <p><strong>Amount:</strong> ৳{transaction.amount}</p>
                                <p><strong>Shop Name:</strong> {transaction.shop}</p>
                            </div>
                        </div>
                        {index < filteredTransactions.length - 1 && <div className={styles.separator}></div>}
                    </div>
                );
            })}
        </div>
    );
}

export default ExchangeHistory;
