<h1 align=center>Jajan Admin Panel (Frontend)</h1>

## Description 📝
This repository hosts the frontend specifically designed as an Admin Panel for the Jajanan app. The panel is tailored to manage admin functions, enabling comprehensive control over user roles including Admins, Street Vendors, Customers, and other essential components within the system.

## Features 🌟
### Manage Admins
- List: Display all registered admin profiles within the system.
- Detail: Access detailed information about individual admin accounts.
- Add: Register new admin profiles into the system.
- Edit: Modify and update existing admin account details.
- Delete: Remove admin accounts from the system (soft and hard delete).

### Manage Street Vendor
- List: View a comprehensive catalog of registered street vendors.
- Detail: Access in-depth information about individual vendor profiles.
- Add: Incorporate new street vendors into the system.
- Edit: Modify and update existing vendor details.
- Delete: Remove street vendors from the system (soft and hard delete).

### Manage Customer
- List: Display a list of registered customers.
- Detail: Access specific information about individual customer profiles.
- Add: Register new customer profiles within the system.
- Edit: Modify and update existing customer information.
- Delete: Remove customers from the system (soft and hard delete).

### Manage Transaction 
- List: Display an overview of all transactions within the system.
- Detail: Access comprehensive details about individual transactions.

### Manage E-Wallet
#### Top-up
- List: View a log of e-wallet top-up transactions.
- Detail: Access detailed information about each top-up transaction.

#### Payouts
- List: Display a log of e-wallet payout transactions.
- Detail: Access comprehensive details about each payout transaction.

## How to Install and Run 📥
1. Clone this repository.
2. Open the terminal and change the directory to the cloned repository.
3. Run `npm install` or `yarn install` command in the terminal. This command will install all the required dependencies.
4. Set up the environment variables according to the configured infrastructure in `docker-compose.yml` file and prepare the backend application URL.
5. Run `npm dev` or `yarn dev` command in the terminal. This command will run the application in development mode.
6. Try the application from the specified host and port in your browser, i.e. `http://localhost:5173`.

## How to run the container that hosts the app 🐳
1. Clone this repository.
2. Open the terminal and change the directory to the cloned repository.
3. Set up the environment variables according to the configured infrastructure in `docker-compose.yml` file and prepare the backend application URL.
4. Run `docker-compose up -d --build` command in the terminal. This command will build and run the docker container.
5. Wait until the build and run process is complete.
7. Try the application from the specified host and port in your browser, i.e. `http://localhost:5173`.
