import React, { useState } from 'react';
import axios from 'axios';

const TransactionPage = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    amount: '',
    due: '',
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/transaction', formData);
      alert("Transaction saved!");
      setFormData({ shopName: '', amount: '', due: '' });
    } catch (err) {
      alert("Error saving transaction");
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/v1/transaction');
      setTransactions(res.data);
    } catch (err) {
      alert("Error fetching transactions");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <input name="due" type="number" placeholder="Due" value={formData.due} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>

      <hr />

      <button onClick={fetchTransactions}>
        {loading ? "Loading..." : "Show Transactions"}
      </button>

      {transactions.length > 0 && (
        <ul>
          {transactions.map((t) => (
            <li key={t._id}>
              <strong>{t.shopName}</strong> — Amount: {t.amount}, Due: {t.due}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionPage;
