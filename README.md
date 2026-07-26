
<div align="center">
  <img src="https://img.shields.io/badge/REACT-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/REDUX-593d88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/TAILWIND-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  
  <br/>
  <br/>

  <h1>💸 Splitly</h1>
  <p><b>A highly relational, logic-driven expense tracking and settlement engine.</b></p>
  
  <a href="https://awazii-splitly.netlify.app/"><strong>🛑 View Live Demo</strong></a> · 
  <a href="https://awazii.vercel.app/projects/splitly"><strong>Read the Case Study</strong></a>
</div>

<br/>

> **Splitly** is a strict client-side architecture experiment designed to handle complex, multi-way expense splitting and group debt settlements in real-time, utilizing a normalized Redux Toolkit state.

---

## 📸 Interface Preview

<img width="1906" height="904" alt="Screenshot 2026-07-14 083751" src="https://github.com/user-attachments/assets/b05d20d8-d8a6-4d92-9b04-2e05e95a44e8" />


---

## 🧠 Frontend Architecture & Logic

Unlike standard CRUD applications, Splitly focuses heavily on **client-side state management** and **mathematical logic** without relying on a backend.

### 1. Normalized Redux State
To prevent deeply nested, unmanageable data, the Redux store is completely normalized. Users, Groups, and Expenses are kept in separate "tables" (slices) and reference each other via IDs. This allows for instant updates across the UI without expensive re-renders or prop-drilling.

### 2. The Settlement Engine
The core of the application is a custom mathematical engine that calculates "who owes who." It takes an array of raw expenses, calculates the net balances of every user in a group, and outputs the most efficient payment routes to settle all debts.

### 3. Component Architecture
Built using standard React functional components with custom hooks to abstract away the Redux dispatch/selector logic, keeping the UI components completely decoupled from the state architecture.

---

## 🚀 Core Features

- **Dynamic Group Management:** Create groups and assign friends seamlessly.
- **Asymmetric Expense Splitting:** Split bills equally, by exact amounts, or by percentages.
- **Real-Time Balance Calculation:** Instantly updates global and group-specific balances upon adding a transaction.
- **Activity Feed:** A chronological ledger of all actions and transactions.
- **Fully Responsive UI:** Built with Tailwind CSS to provide a native-app feel on mobile devices.

---


  
