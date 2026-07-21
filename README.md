<div align="center">
  <img src="https://img.shields.io/badge/REACT-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/REDUX-593d88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/TAILWIND-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />

  <br/>
  <br/>
  <h1>💸 Splitly</h1>
  <p><b>An admin-driven expense tracking and settlement engine with proof-backed transactions.</b></p>

  <a href="https://awazii-splitly.netlify.app/"><strong>🛑 View Live Demo</strong></a> · 
  <a href="https://awazii.vercel.app/projects/splitly"><strong>Read the Case Study</strong></a>
</div>
<br/>

> **Splitly** is a strict client-side architecture experiment where an admin manages friends and groups (like a trip group), logs shared expenses with proof, and tracks who owes whom — updating a live global net balance plus per-friend net balances in real-time, all on a normalized Redux Toolkit state.

---

## 📸 Interface Preview
<img width="1906" height="904" alt="Screenshot 2026-07-14 083751" src="https://github.com/user-attachments/assets/b05d20d8-d8a6-4d92-9b04-2e05e95a44e8" />

---

## 🧠 Frontend Architecture & Logic

Unlike standard CRUD applications, Splitly focuses heavily on **client-side state management** and **mathematical logic** without relying on a backend.

### 1. Normalized Redux State
To prevent deeply nested, unmanageable data, the Redux store is completely normalized. Friends, Groups, and Expenses are kept in separate "tables" (slices) and reference each other via IDs. This allows for instant updates across the UI without expensive re-renders or prop-drilling.

### 2. The Settlement Engine
The core of the application is a custom mathematical engine that calculates "who owes who." It takes an array of raw expenses, recomputes each friend's net balance and the overall global net balance on every add, edit, or payback, and drives the settlement UI in real time.

### 3. Proof-Backed Transactions
Every expense and its corresponding settlement can carry proof documentation, so contributions and repayments are independently verifiable — no more disputes over who actually paid what.

### 4. Temporary Splitter
A standalone module for quick, one-off expense calculations — add up to 5 ad-hoc friends without creating real friends or groups, split the bill, and reset it whenever you want.

### 5. Moderation Layer
Friends can be banned from being added to new expenses or groups, while still remaining able to repay debts they already owe.

### 6. Component Architecture
Built using standard React functional components with custom hooks to abstract away the Redux dispatch/selector logic, alongside React Hook Form for multi-step expense creation, keeping the UI components completely decoupled from the state architecture.

---

## 🚀 Core Features

- **Admin-Driven Management:** One admin manages friends and groups (like a trip group) from a central dashboard.
- **Real-Time Balance Calculation:** Instantly updates global and per-friend net balances upon every expense or payback.
- **Multi-Dashboard Ecosystem:** Dedicated main, individual per-friend, and per-group dashboards.
- **Proof-Backed Transactions:** Attach proof to both an expense and its settling transaction for full transparency.
- **Temporary Splitter:** Calculate and settle a one-off expense with up to 5 ad-hoc friends, no group or friend creation required.
- **Ban System:** Restrict a friend from new expenses/groups while preserving their ability to pay back existing debts.
- **7-Day Expense Tracker & Live Analytics:** A rolling daily expense view plus a dedicated graphs page for spending trends.
- **Recent Activity Feed:** A chronological ledger of all actions and transactions across the app.
- **Search & Filter System:** Quickly find friends, groups, and expenses.
- **Fully Responsive UI:** Built with Tailwind CSS to provide a native-app feel on mobile devices.

  
