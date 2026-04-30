# ExpenseTracker

A simple expense tracking application with an Angular frontend and a .NET backend.

> This project is currently in an early (barebones) stage.

## Features

- Add Expense Types
- Add Expenses
- Basic configuration management

More features will be added over time.

---

## Tech Stack

**Frontend**
- Angular

**Backend**
- .NET (ASP.NET Core Web API)

---

## Getting Started

Follow these instructions to clone and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

---

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
ng serve
```

App will be available at:  
http://localhost:4200

---

## Environment Configuration

Update `src/environments/environment.ts`:

For development use "environment.development.ts"
```ts
export const environment = {
  production: false,
  apiUrl: 'http://your-api-url/api'
};
```

For production
```ts
export const environment = {
  production: true,
  apiUrl: 'http://your-api-url/api'
};
```

The app will know to use 

---

## Useful Commands

### Angular

```bash
ng serve          # Run dev server
ng build          # Build project
ng generate component <name>
```

---

## Roadmap (Planned Features)

- Edit/Delete expenses
- User authentication
- Expense categories filtering
- Dashboard & analytics
- Persistent storage improvements

---

## Notes

This is a learning / in-progress project. Expect breaking changes and incomplete features.

---

## Contributing

Feel free to fork the repo and experiment. Contributions are welcome once the project stabilizes.