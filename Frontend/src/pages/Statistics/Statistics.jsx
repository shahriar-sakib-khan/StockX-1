import React from 'react';
import styles from './Statistics.module.css'
import Income_chart from './Income_chart.jsx';
import Expense_chart from "./Expense_chart.jsx";
import Profit from './Profit.jsx'
import Profit_2 from './Profit_2.jsx'


const Statistics = () => {



    return(
        <>
            <div className={styles.main_container}>
                < Income_chart  />
                < Expense_chart  />
                < Profit_2/>
            </div>
        </>
    );
};

export default Statistics;