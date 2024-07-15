# Node.js MySQL Sequelize API

This is a Node.js project that demonstrates authentication, CRUD operations, and password management (change password, forgot password, reset password) using MySQL and Sequelize ORM.

## Features

- User registration with JWT token generation
- User login with JWT token generation
- User password management (change password, forgot password, reset password)
- CRUD operations for posts
- Sequelize ORM for database interaction
- Environment configuration using `.env`
- Input validation using `express-validator`

## Requirements

- Node.js
- MySQL

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/node-sql.git
   cd node-sql
   2.Install the dependencies:
   ```

```bash
   npm install
   npm run dev

Folder Structure

.
├── config
│   ├── config.json
├── controllers
│   ├── authController.js
│   └── postController.js
├── middlewares
│   ├── authMiddleware.js
├── migrations
│   └── ...
├── models
│   ├── index.js
│   ├── user.js
│   └── post.js
├── routes
│   ├── auth.js
│   └── post.js
├── seeders
│   └── ...
├── validations
│   ├── authValidation.js
│   └── postValidation.js
├── .env
├── .gitignore
├── README.md
├── app.js
└── package.json
```
