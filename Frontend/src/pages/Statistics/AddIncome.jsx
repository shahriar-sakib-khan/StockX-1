// src/components/Statistics/AddIncome.jsx
import React, { useState } from 'react';
import styles from './Statistics.module.css';

const AddIncome = ({ onAdd }) => {
    const today = new Date();
    const [date, setDate] = useState(today.getDate());
    const [income, setIncome] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!income || isNaN(income)) return alert("Valid income din");

        onAdd({ date: String(date), income: parseFloat(income) });
        setIncome('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.incomeForm}>
            <label>
                তারিখ:
                <input
                    type="number"
                    value={date}
                    min="1"
                    max="31"
                    onChange={(e) => setDate(e.target.value)}
                />
            </label>

            <label>
                ইনকাম:
                <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="৳ টাকার পরিমাণ"
                />
            </label>

            <button type="submit">Add</button>
        </form>
    );
};

export default AddIncome;
