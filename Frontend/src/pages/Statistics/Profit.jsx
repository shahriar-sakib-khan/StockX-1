import React , {useState} from 'react';
import styles from './Statistics.module.css'
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {generateDailyIncomeData} from "./generateIncomeData.js";
import {generateDailyExpenseData} from "./generateExpenseData.js";

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

// const data = [
//     { name: '1', value: 10 },
//     { name: '2', value: 40 },
//     { name: '3', value: 25 },
//     { name: '4', value: 60 },
//     { name: '5', value: 35 },
//     { name: '6', value: 10 },
//     { name: '7', value: 40 },
//     { name: '8', value: 25 },
//     { name: '9', value: 60 }
// ];

const Profit = () =>{

    const today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const incomeData = generateDailyIncomeData(selectedMonth , selectedYear);
    const expenseData = generateDailyExpenseData(selectedMonth , selectedYear);

    const mergeData = incomeData.map((income) =>{
        const expense = expenseData.find(e => e.date === income.date);
        return {
            date: income.date,
            income: income.income,
            expense: expense?.expense || 0,
            profit: income.income - (expense?.expense || 0)
        };
    });

    return(
        <>
            <div className={styles.chart_container}>
                <h2>Profit</h2>
                <div className={styles.selector}>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    >
                        {monthNames.map((name , index) =>(
                            <option key={index} value={index+1}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                        {yearOptions.map((selectedYear) =>(
                            <option key={selectedYear} value={selectedYear}>
                                {selectedYear}
                            </option>
                        ))}
                    </select>


                </div>
                <ResponsiveContainer className={styles.chart}>
                    <AreaChart data={mergeData}  >
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="blue"
                            fill="white"
                            strokeWidth={3}
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="red"
                            fill="white"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default Profit;