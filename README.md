# Made in Uganda Online Ltd Backend

This repository contains the backend codebase for Made in Uganda Online Ltd, a platform designed to showcase and sell products made in Uganda. The backend is responsible for handling API requests, managing the database, and implementing core functionalities such as authentication, product management, and order processing.

---

## Features

- Authentication:
  - User registration and login functionality.
  - Token-based authentication using JSON Web Tokens (JWT).

- Product Management:
  - APIs for creating, reading, updating, and deleting products.

- Order Management:
  - APIs for managing orders, including creation and retrieval.

- Cart Functionality:
  - Manage cart operations for users.

- User Management:
  - APIs for managing user profiles and roles.

---

## File Structure

The backend is organized as follows:

```
Backend-Integration
├── model
│   ├── carts.js
│   ├── order.js
│   ├── product.js
│   ├── User.js
├── routes
│   ├── auth.js
│   ├── cart.js
│   ├── orders.js
│   ├── products.js
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
```

### Explanation of Folders and Files:

- `model/`: Contains Mongoose models for the database schema.
  - `carts.js`: Schema for managing user carts.
  - `order.js`: Schema for order details.
  - `product.js`: Schema for product information.
  - `User.js`: Schema for user authentication and profile management.

- `routes/`: Contains route definitions for handling API endpoints.
  - `auth.js`: Routes for user authentication.
  - `cart.js`: Routes for cart operations.
  - `orders.js`: Routes for managing orders.
  - `products.js`: Routes for product CRUD operations.

- `app.js`: Entry point of the backend application, setting up middleware, routes, and database connections.

---

## Tech Stack

- Framework: Node.js with Express.js
- Database: MongoDB (using Mongoose for ORM)
- Authentication:JSON Web Tokens (JWT)
- Environment Management: dotenv

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/madeinuganda-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Backend-Integration
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables by creating a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:
   ```bash
   npm start
   ```

---

## API Endpoints

### Authentication (`auth.js`):
- POST `/api/auth/register` - Register a new user.
- POST `/api/auth/login` - Login and receive a token.

### Products (`products.js`):
- GET `/api/products` - Retrieve all products.
- POST `/api/products` - Create a new product.
- PUT `/api/products/:id` - Update product by ID.
- DELETE `/api/products/:id` - Delete product by ID.

### Orders (`orders.js`):
- GET `/api/orders` - Retrieve all orders.
- POST `/api/orders` - Create a new order.

### Cart (`cart.js`):
- GET `/api/cart` - Retrieve user's cart.
- POST `/api/cart` - Add item to cart.
- DELETE `/api/cart/:id` - Remove item from cart.

---

## Contribution

Contributions are welcome! Feel free to submit issues or pull requests for enhancements or bug fixes.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Contact

For further inquiries, please contact:

- Email:support@madeinuganda.com
- Website: [Made in Uganda Online Ltd](https://made-in-uganda-ltd.vercel.app/)
