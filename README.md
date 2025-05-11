# Food App

## 🍽️ Node.js REST API for a Restaurant App using Express, MongoDB, and JWT – includes auth, CRUD, and admin features 🔐📦

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* TypeScript
* JWT Auth

https://food-app-node-js.onrender.com/
https://dashboard.render.com/web/srv-d0brjpqdbo4c73d2nfhg
https://cloud.mongodb.com/v2/68177773f846444eda975a16#/metrics/replicaSet/681778a38156945c9a36e0f2/explorer/food-app/users/find


# Dependencies

### Express - https://www.npmjs.com/package/express
    npm i express

### Nodemon - https://www.npmjs.com/package/nodemon
    npm i -g nodemon

### Colors - https://www.npmjs.com/package/colors
    npm i colors

### Morgan - https://www.npmjs.com/package/morgan
    npm i morgan

### Cors - https://www.npmjs.com/package/cors
    npm i cors

### Dotenv - https://www.npmjs.com/package/dotenv
    npm i dotenv

### Mongoose - https://www.npmjs.com/package/mongoose, https://mongoosejs.com/docs/guide.html
    npm i mongoose

### Bcryptjs - https://www.npmjs.com/package/bcryptjs
    npm i bcryptjs

### JsonWebToken - https://www.npmjs.com/package/jsonwebtoken
    npm i jsonwebtoken

## 🔐 Auth Endpoints

| Method | Endpoint                     | Description         |
|--------|------------------------------|---------------------|
| POST   | `/api/v1/auth/auth/register` | Register a new user |
| POST   | `/api/v1/auth/auth/login`    | Login existing user |

---

## 👤 User Endpoints

| Method | Endpoint                       | Description         |
|--------|--------------------------------|---------------------|
| GET    | `/api/v1/user`                 | Get user by ID      |
| PUT    | `/api/v1/user`                 | Update user details |
| POST   | `/api/v1/user/update-password` | Update password     |
| POST   | `/api/v1/user/reset-password`  | Reset password      |

---

## 🍽️ Restaurant Endpoints

| Method | Endpoint                 | Description          |
|--------|--------------------------|----------------------|
| POST   | `/api/v1/restaurant`     | Create a restaurant  |
| GET    | `/api/v1/restaurant`     | Get all restaurants  |
| GET    | `/api/v1/restaurant/:id` | Get restaurant by ID |
| DELETE | `/api/v1/restaurant/:id` | Delete restaurant    |

---

## 📂 Category Endpoints

| Method | Endpoint               | Description        |
|--------|------------------------|--------------------|
| POST   | `/api/v1/category`     | Create a category  |
| GET    | `/api/v1/category`     | Get all categories |
| GET    | `/api/v1/category/:id` | Get category by ID |
| PUT    | `/api/v1/category/:id` | Update category    |
| DELETE | `/api/v1/category/:id` | Delete category    |

---

## 🍔 Food Endpoints

| Method | Endpoint                      | Description                |
|--------|-------------------------------|----------------------------|
| POST   | `/api/v1/food`                | Create a food item         |
| GET    | `/api/v1/food`                | Get all food items         |
| GET    | `/api/v1/food/:id`            | Get food by ID             |
| GET    | `/api/v1/food/restaurant/:id` | Get foods by restaurant ID |
| PUT    | `/api/v1/food/:id`            | Update food item           |
| DELETE | `/api/v1/food/:id`            | Delete food item           |

---

## 🛒 Order Endpoints

| Method | Endpoint                   | Description                 |
|--------|----------------------------|-----------------------------|
| POST   | `/api/v1/order`            | Place an order              |
| GET    | `/api/v1/order`            | Get all orders              |
| GET    | `/api/v1/order/:id`        | Get order by ID             |
| GET    | `/api/v1/order/user`       | Get orders by user ID       |
| PUT    | `/api/v1/order/status/:id` | Update order status (admin) |
| DELETE | `/api/v1/order/:id`        | Delete an order (admin)     |

---
