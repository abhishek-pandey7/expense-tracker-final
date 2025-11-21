import React from 'react'

export const Header = () => {
  return (
    <header className="app-header">
      <h2 className="brand">
        <span className="logo" aria-hidden="true">
          {/* wallet + rupee svg */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1.5" y="5" width="21" height="14" rx="2.5" fill="currentColor" opacity="0.12" />
            <path d="M3 8.5h14v7H3z" fill="currentColor" opacity="0.18" />
            <path d="M18 10.5h1.5a1 1 0 010 2H18v-2z" fill="#14b8a6" />
            <path d="M7.5 12a3 3 0 003 3h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          </svg>
        </span>
        Expense Tracker
      </h2>
      <p className="subtitle">Manage your finances with clarity</p>
    </header>
  )
}
