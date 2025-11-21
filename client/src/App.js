import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { IncomeList } from './components/IncomeList';
import { ExpenseList } from './components/ExpenseList';
import { AddTransaction } from './components/AddTransaction';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="app-layout">
        <div className="side-card income-summary-card">
          <IncomeExpenses type="income" />
          <IncomeList />
        </div>

        <div className="container">
          <Balance />
          <AddTransaction />
        </div>

        <div className="side-card expense-summary-card">
          <IncomeExpenses type="expense" />
          <ExpenseList />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;


