# 🐝 BeeBank

A minimalistic banking app built with **Next.js 13+**, **Ant Design**, and **JSON Server**. Users can sign up, log in, view accounts and transactions, and add new ones with a responsive and clean UI.

---

## 🚀 Features

- User authentication (signup + login)
- Account listing and transactions
- Add new transactions with form validation
- Form logic separated using custom hooks
- `json-server` used as a mock RESTful backend
- LocalStorage fallback and session persistence

---

## 🛠️ Technologies

- [Next.js 13/14+ (App Router)](https://nextjs.org/)
- [Ant Design](https://ant.design/)
- [JSON Server](https://github.com/typicode/json-server)
- [Zod](https://github.com/colinhacks/zod) for schema validation
- [Day.js](https://day.js.org/) for date formatting

---

## Install dependencies

Navigate to the project directory and install the dependencies:

cd bee-bank
npm install

Start the JSON server
npm run api

Start the Frontend Application
npm run dev

## Assumptions or Tradeoffs Made

- No Persistent Backend: The project uses JSON Server for mock data, which is not a real backend. In a production environment, a real backend with a database would be necessary.

- No External State Management: The application does not use an external state management tool. Instead, it relies on React's built-in `useState` and `useEffect` hooks for managing component state. Given the simplicity of the app and the relatively low volume of data being managed, introducing an external state management solution would add unnecessary complexity. In a larger, more complex application, a state management tool could be beneficial for better scalability and maintainability.

- No Error Boundaries: The application does not currently use error boundaries for graceful error handling. In a production environment, handling unexpected errors would be essential.

- No Unit Testing: There are no unit tests implemented. Testing frameworks like Jest and React Testing Library could be integrated for better code quality and reliability.

## Time spent

The project was developed with the aim to build the functionality and demonstrating essential skills.
time spent was approximately **6 hours**.
