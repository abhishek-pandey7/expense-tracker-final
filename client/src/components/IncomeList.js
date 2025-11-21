import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const IncomeList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const incomeTransactions = transactions.filter(transaction => transaction.amount > 0);

    return (
        <div className="transaction-card income-card">
            <h3 className="card-title">Income</h3>
            {incomeTransactions.length === 0 ? (
                <p className="empty-message">No income transactions yet</p>
            ) : (
                <ul className="list">
                    {incomeTransactions.map(transaction => (
                        <Transaction key={transaction._id} transaction={transaction} />
                    ))}
                </ul>
            )}
        </div>
    );
};
