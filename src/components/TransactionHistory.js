// TransactionHistory.js

import React, { useEffect, useState } from 'react';
import { getTransactionHistory } from '../services/api'; // Add this import

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    // Fetch user transaction history when the component mounts
    const fetchTransactionHistory = async () => {
      try {
        // Use the service function to get transaction history
        const transactionHistoryData = await getTransactionHistory();

        // Update state with the received data
        setTransactions(transactionHistoryData);
      } catch (error) {
        console.error('Error fetching transaction history:', error.message);
      }
    };

    // Call the fetchTransactionHistory function
    fetchTransactionHistory();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      {transactions ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {/* Display transaction details (e.g., date, amount, description) */}
              {transaction.date} - {transaction.amount} - {transaction.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading transaction history...</p>
      )}
    </div>
  );
};

export default TransactionHistory;
