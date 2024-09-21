# 🌟 Online Banking System

[![Spring Boot](https://img.shields.io/badge/SpringBoot-Backend-brightgreen)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-Frontend-blue)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-orange)](https://www.mysql.com/)
[![Google OAuth2](https://img.shields.io/badge/GoogleOAuth2-Authentication-red)](https://developers.google.com/identity/protocols/oauth2)

## ✨ Description

The **Online Banking System** is a modern banking platform that provides users with a secure, intuitive, and full-featured digital banking experience. It enables users to manage their bank accounts, transfer funds, apply for cards, pay bills, and more, all within a user-friendly interface.

Built using **Spring Boot** for the backend, **React** for the frontend, and **Google OAuth2** for secure authentication, this project ensures smooth and secure banking operations for the user.

## 🚀 Technologies Used

- **Backend**: Spring Boot, MySQL, JPA
- **Frontend**: React, Tailwind CSS, Flowbite, React Icons, Sweet Alerts
- **Authentication**: Google OAuth2
- **Frontend Libraries**: Protected Routes, Context API

## 📚 Features Overview

### 🔐 Secure Authentication
- **Google OAuth2 Login**: Users log in using Google OAuth2 for secure and seamless authentication.
- **Protected Routes**: Access to certain parts of the application is restricted until the user logs in.

### 🏦 Account Management
- **Account Opening**: First-time users are redirected to an account application form after login, where they fill out necessary information to create an account.
- **Profile Page**: View personal details filled during account creation.

### 💳 Bank Accounts
- **Open New Accounts**: Users can open different types of accounts, such as:
  - Current Account
  - Savings Account
  - Student Account
  - NRI Account
  - (Total of 8 account types supported)

- **Account Details**: View details of all opened accounts including:
  - Account Number
  - IFSC Code
  - Available Funds
  - Transaction Pin Setup (for future transactions)

### 💸 Fund Transfers
- **Transfer Funds**: Transfer money between self accounts or to other accounts by entering:
  - Amount
  - Transaction Pin
- **Error Handling**: The system validates the account details and ensures sufficient funds. If an error occurs (e.g., insufficient funds), it will display the error using Sweet Alerts.

### 💳 Card Management
- **Apply for New Cards**: Users can apply for various types of cards:
  - Credit Card
  - Debit Card
  - Gift Card
  - Virtual Card
  - (Total of 8 card types supported)

- **Card Details**: View details of applied cards including:
  - Card Number
  - CVV
  - Expiry Date
  - Available Funds
  - Transaction Pin setup or updates

### 🧾 Bill Payments
- **Bill Payment Feature**: Users can pay bills in categories like:
  - Water
  - Mobile
  - Electricity
  - Internet
  - (Total of 8 different billing categories)

- Payments can be made via both **bank accounts** and **cards**, requiring transaction pins for validation.

### 📜 Transaction History
- **View Transaction History**: Users can see a history of all transactions.
- **Export Transactions**: Download transaction history in **PDF** or **CSV** formats.

### 🔐 Logout
- **Secure Logout**: Logging out will terminate the session from both frontend and backend, ensuring complete security.

## 🛠️ Installation

To set up this project locally, follow the steps below:

### Backend (Spring Boot)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/online-banking-system.git


Navigate to the project directory:

bash
Copy code
cd online-banking-system/backend
Set up the MySQL database:

Create a MySQL database and configure the connection in application.properties.
Run the Spring Boot application:

bash
Copy code
mvn spring-boot:run
Frontend (React)
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Run the React application:

bash
Copy code
npm start
Access the application: Open your browser and navigate to http://localhost:3000.

🧩 Contributing
Contributions are welcome! If you'd like to contribute, please follow the steps below:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.
Please read our Contributing Guidelines for more details.

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

🎯 Key Highlights for Resume
Project: Online Banking System
Backend: Spring Boot, MySQL, JPA
Frontend: React, Tailwind CSS, Flowbite, Sweet Alerts
Authentication: Google OAuth2 (for secure login)
Key Features: Secure login, bank account management, funds transfer, card management, bill payments, transaction history with export options.
Security: Protected routes, transaction pin validation, secure backend authentication.
vbnet
Copy code

### Notes:
- Simply copy the above text and paste it into a README.md file.
- Modify the URLs (e.g., GitHub link, etc.) and any additional specific details like database setup instructions as needed.
- This markdown structure is neat and will display beautifully on platforms like GitHub.

Let me know if you need any further adjustments!
