[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Go_VyaIE)
# 🧪 Senior Frontend Engineer Technical Assignment
## "Banking Dashboard Web App"
### 🧠 Objective
Build a simple Banking Web Application (called BeeBank) with the following features:

- User Login / Authentication
- Dashboard showing:
  - List of Bank Accounts
    - ```typescript
      interface IAccount {
        id: string;
        name: string;
        balance: number;
        type: 'current' | 'savings';
        accountNumber: string;
      }
      ```
  - List of Transactions per Account 
    - Transaction Date
    - Transaction Amount
    - Sender / Receiver
  - Ability to add a new transaction 
    - Create a simple UI for adding a transaction with Form-validation
    - Receiver / Sender (dropdown)
    - Transaction Amount
    - Transaction Date
    - Transaction Message
  - Ability to filter transactions by date or amount

### 📦 Backend
You can choose one of the following options for the backend:

- Use a Headless CMS like Strapi or Sanity 
- A custom JSON API using something like JSON Server / Express 
- A static JSON file if you prefer a simplified approach

Use whatever backend stack you're most comfortable with, as long as it's functional and allows the frontend to interact with the data in a realistic way.


### 💻 Frontend Requirements
- Use React or Next.js in combination with TypeScript
- Clean UI/UX (you can use any UI library like Material-UI, Ant Design, etc. or don't use any at all and style via CSS/SASS)
- State management (your choice: React Context, Redux, Zustand, etc.)
- Form validation for transactions 
- List view for transactions with sorting or filtering 
- Responsive and accessible design
- Code should be clean, modular, and easy to read

✅ Bonus: Use of server components (if using Next.js 13+ with App Router)


### 🧪 Evaluation Criteria
- Code quality: modularity, readability, reusability 
- Best practices: hooks, components, file structure, naming 
- State management: clear flow, proper usage of state 
- UX/UI: logical layout, responsiveness, usability 
- Performance: use of async patterns, memoization, etc.


### 🚀 How to Deliver
- Push the project to a GitHub repo and share the link 
- Include a README with:
  - Short description of your approach
  - How to run the project locally 
  - Assumptions or tradeoffs made
  - Time spent on the project
- Nice to have: Deploy a working version it via Vercel or Netlify and share the link

### ⏰ Estimated Time
Spend as much time as you feel is necessary to demonstrate your skills, but don't spend more than 4-6 hours on this assignment.
It's not necessary to complete the entire project, but please make sure to include enough functionality to showcase your abilities.
Don't overengineer the solution; focus on quality over quantity.

### ❗️ Important Notes
- This is a technical assignment, so focus on the code quality and best practices.
- You can use AI tools to assist you, but please make sure to understand the code and be able to explain it, as your skills are what we are evaluating.
