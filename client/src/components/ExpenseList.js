import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const ExpenseList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const expenseTransactions = transactions.filter(transaction => transaction.amount < 0);

    return (
        <div className="transaction-card expense-card">
            <h3 className="card-title">Expenses</h3>
            {expenseTransactions.length === 0 ? (
                <p className="empty-message">No expense transactions yet</p>
            ) : (
                <ul className="list">
                    {expenseTransactions.map(transaction => (
                        <Transaction key={transaction._id} transaction={transaction} />
                    ))}
                </ul>
            )}
        </div>
    );
};
