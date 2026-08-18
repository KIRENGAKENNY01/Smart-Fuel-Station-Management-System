# Smart Fuel Station Management System

## Overview
The Smart Fuel Station Management System is a comprehensive platform built with a microservices architecture. It allows fuel stations to manage their operations efficiently, including station details, fuel inventory, transactions, reports, and notifications.

## Architecture
The system consists of the following components, orchestrated using npm workspaces:
- **API Gateway**: Entry point for all client requests.
- **Frontend**: User interface for the system.
- **Microservices**:
  - `auth-service`: Handles user authentication and authorization.
  - `station-service`: Manages fuel station data.
  - `fuel-service`: Manages fuel inventory and pricing.
  - `transaction-service`: Processes and logs fuel transactions.
  - `report-service`: Generates operational and financial reports.
  - `notification-service`: Sends out alerts and notifications.
- **Shared**: Shared utilities and configurations across services.

## Prerequisites
- Node.js
- npm

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Database Seeding (Optional):**
   ```bash
   npm run seed
   ```

3. **Run the application:**
   You can run all services concurrently using:
   ```bash
   npm run dev
   ```

   Alternatively, you can run individual services:
   - `npm run dev:auth`
   - `npm run dev:gateway`
   - `npm run dev:station`
   - `npm run dev:fuel`
   - `npm run dev:transaction`
   - `npm run dev:report`
   - `npm run dev:notification`
   - `npm run dev:frontend`

## License
ISC License
