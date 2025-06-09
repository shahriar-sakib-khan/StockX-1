import React , {useState} from 'react';
import styles from './Statistics.module.css'
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {generateDailyIncomeData} from "./generateIncomeData.js";

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

const Income_chart = () =>{

    const today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const data = generateDailyIncomeData(selectedYear, selectedMonth);



    return(
        <>
            <div className={styles.chart_container}>
                <h2>Income</h2>
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
                    <AreaChart data={data}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="blue"
                            fill="rgba(0,123,255,0.3)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default Income_chart;