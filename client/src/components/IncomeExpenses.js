import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const IncomeExpenses = ({ type }) => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  // If type is specified, show only that type
  if (type === 'income') {
    return (
      <div className="summary-card">
        <h4>Total Income</h4>
        <p className="money plus">₹{numberWithCommas(income)}</p>
      </div>
    );
  }

  if (type === 'expense') {
    return (
      <div className="summary-card">
        <h4>Total Expenses</h4>
        <p className="money minus">₹{numberWithCommas(expense)}</p>
      </div>
    );
  }

  // Default: show both (original behavior)
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">₹{numberWithCommas(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">₹{numberWithCommas(expense)}</p>
      </div>
    </div>
  )
}
