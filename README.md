
# 📚 Tomato — Food Delivery Website 

Tomato is a full-stack food delivery web application designed to provide users with a seamless experience for ordering their favorite meals online. Built using the MERN stack (MongoDB, Express, React, Node.js), Tomato features user authentication , Intuitive UI to browse restaurants, menus, and customize orders.Precise delivery location selection, ensuring efficient and accurate delivery services. 


## Badges


[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Authentication](https://img.shields.io/badge/Authentication-JWT%20%26%20Bcrypt-blue?style=for-the-badge)](https://jwt.io/)
[![Payment Gateway](https://img.shields.io/badge/Payment%20Gateway-Razorpay%20%2F%20Stripe-0A2540?style=for-the-badge)](https://razorpay.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-246FDB?style=for-the-badge)](https://nodemailer.com/about/)
[![Environment Variables](https://img.shields.io/badge/ENV-Environment%20Variables-orange?style=for-the-badge)](https://www.npmjs.com/package/dotenv)

## Tech Stack

**Client:** TailwindCSS, React, Redux

**Server:** Nodejs , Expressjs , MongoDB ### 🌟 Features

- **User Authentication** — Secure signup and login with JWT-based authentication.

- **Browse Foods & Menus** — Explore multiple Food with detailed menus and item descriptions.

- **Add to Cart & Order** — Easily add items to the cart, customize orders, and place secure orders.

- **Address Selection** — Easily enter and save your delivery address accurately for smooth order processing.

- **Responsive Design** — Fully responsive UI that works smoothly on mobile, tablet, and desktop devices.

- **Admin Dashboard** — Manage restaurants, menus, and orders efficiently (if implemented).

- **Order History** — Users can view past orders for quick reordering.


## ✅ Tables to created

- UserModel
- OrderModel
- LocationModel
- foodModel## API Reference

### Authentication Routes
#### Register User
```http
  POST /api/user/signup
```
| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `Name` | `string` | *Required*. The name of the user |
| `email` | `string` | *Required*. The email address of the user |
| `password` | `string` | *Required*. The password for the account |

#### login User
```http
  POST /api/user/login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | *Required*. The name of the email |
| `password` | `string` | *Required*. The name of the password |

### food Routes

#### add food
```http
  POST /api/food/add
```

| Parameter    | Type     | Description                                |
| :----------- | :------- | :----------------------------------------- |
| `name`       | `string` | *Required*. The name of the food item       |
| `description`| `string` | *Required*. A brief description of the item|
| `price`      | `number` | *Required*. The price of the food item      |
| `category`   | `string` | *Required*. The category of the food (e.g., Pizza, Burger, Dessert) |
| `image`      | `string` | *Required*. The image URL of the food item  |


#### food list
```http
  GET /api/food/list
```

#### remove food
```http
  POST /api/food/remove
```
| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `string` | *Required*. The unique ID of the food item to remove |


### Cart Routes

#### add to cart
```http
  POST /api/cart/add
```
| Parameter | Type     | Description                                          |
| :-------- | :------- | :--------------------------------------------------- |
| `userId`  | `string` | *Required*. The unique ID of the user adding the item to cart |
| `itemId`  | `string` | *Required*. The unique ID of the food item to add     |
| `quantity`| `number` | *Required*. The number of units of the food item      |


#### remove from cart
```http
  POST /api/cart/remove
```
| Parameter | Type     | Description                                                |
| :-------- | :------- | :--------------------------------------------------------- |
| `userId`  | `string` | *Required*. The unique ID of the user whose cart is being updated |
| `itemId`  | `string` | *Required*. The unique ID of the food item to remove (decrease quantity by 1) |



####  get cart
```http
  POST /api/cart/get
```
| Parameter | Type     | Description                                                |
| :-------- | :------- | :--------------------------------------------------------- |
| `userId`  | `string` | *Required*. The unique ID of the user whose cart data is being fetched |


### location Routes
#### get coordinates

```http
  POST /api/location/get-coordinates
```

| Parameter | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| `address` | `string` | *Required*. The full delivery address to fetch latitude and longitude coordinates |


### Order Routes
#### place order 

```http
  POST /api/order/place
```

| Parameter  | Type     | Description                                                                 |
| :--------- | :------- | :-------------------------------------------------------------------------- |
| `userId`   | `string` | *Required*. The unique ID of the user placing the order                     |
| `items`    | `array`  | *Required*. List of food items in the order, including `name`, `price`, and `quantity` |
| `amount`   | `number` | *Required*. The total order amount (excluding delivery charges)              |
| `address`  | `string` | *Required*. The delivery address for the order                              |


#### verify order 

```http
  POST /api/order/verify
```

| Parameter | Type      | Description                                                              |
| :-------- | :-------- | :----------------------------------------------------------------------- |
| `orderId` | `string`  | *Required*. The unique ID of the order to verify                         |
| `success` | `boolean` or `string` | *Required*. Indicates whether the payment was successful (`true` or `"true"`) |

#### users order 

```http
  POST /api/order/userorders
```

| Parameter | Type     | Description                                                |
| :-------- | :------- | :--------------------------------------------------------- |
| `userId`  | `string` | *Required*. The unique ID of the user whose orders are being fetched |

#### list order 

```http
  GET /api/order/list
```


#### status order 

```http
  GET /api/order/status
```

| Parameter  | Type     | Description                                                        |
| :--------- | :------- | :----------------------------------------------------------------- |
| `orderId`  | `string` | *Required*. The unique ID of the order whose status needs updating |
| `status`   | `string` | *Required*. The new status of the order (e.g., "Preparing", "Out for Delivery", "Delivered") |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI =`

`PORT = `

`JWT_SECRET = `

`STRIPE_SECRET_KEY =`

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Dependencies Installation 

### admin


```bash
  npm install 
```
```bash
  npm install axios
```
```bash
  npm i vite@latest
```
```bash
  npm i react
```
```bash
  npm i react-router-dom
```
```bash
  npm i react-toastify
```
```bash
  npm i -D @type/react
```
```bash
  npm i -D @type/react-dom
```
```bash
  npm i -D eslint
```

### backend

```bash
  npm install 
```
```bash
  npm install express
```
```bash
  npm i dotenv
```
```bash
  npm i axios
```
```bash
  npm i body-parser
```
```bash
  npm i bcryptjs
```
```bash
  npm i multer
```
```bash
  npm i stripe
```
```bash
  npm i @stripe/react-stripe-js
```
```bash
  npm i @stripe/stripe-js
```
```bash
  npm i jsonwebtoken
```
```bash
  npm i mongoose 
```
```bash
  npm i validator
```
```bash
  npm i cors 
```
```bash
  npm i -D nodemon
```

### frontend

```bash
  npm i vite@latest
```
```bash
  npm i react
```
```bash
  npm i @react-google-maps/api
```
```bash
  npm i @react-google-maps
```
```bash
  npm i @stripe/react-stripe-js
```
```bash
  npm i @stripe/stripe-js
```
```bash
  npm i axios
```
```bash
  npm i react-dom
```
```bash
  npm i react-router-dom
```
```bash
  npm i eslint
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/i-himanshu29/Food-Delivery-Website.git
```

#### Go to the admin directory

```bash
  cd admin
```

Install dependencies

```bash
  npm install vite@latest
```

Start the admin 

```bash
  npm run dev
```

#### Go to the server directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node ./server.js
```

#### Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install vite@latest
```

Start the server

```bash
  npm run dev
```
## Deployment

The **Project** is deployed on **Render**.
## 📽️ Demo

Check out the live demo of the project here:  
[![Project Demo](https://img.youtube.com/vi/mDcnvktReWs/0.jpg)](https://youtu.be/mDcnvktReWs)

> Click the thumbnail above to watch the demo on YouTube.
## Screenshots

#### Some S.S of Landing Page
![Landing Page SS-1](https://drive.google.com/uc?export=view&id=1IP8uPVNn8I4Y_U2VdLH9e8x4XjcizUxz)

![Landing Page SS-2](https://drive.google.com/uc?export=view&id=1l4mYv2Vyt_P_7ET8PcXWFz3eXv1A0BtS)

#### Signup SS

![Signup](https://drive.google.com/uc?export=view&id=1uIoPnVI5GziN6iskIB2Q7QrpqId1HYdL)

#### Login SS
![Login](https://drive.google.com/uc?export=view&id=10sfZ0XtN-BlQ8FvS6odCh-seq9O65EGu)

![Profile](https://drive.google.com/uc?export=view&id=13Sy2UBVfXrVNrFmMoMokVUYWx0CsMMVY)

![Course](https://drive.google.com/uc?export=view&id=11x2eN6HR5C1wtP-dGxed4stDzBeK8unZ6)

![Course](https://drive.google.com/uc?export=view&id=1YwzWMHWuvzrwpYNteoIVcIKMH50WqzA4)

![addCourse](https://drive.google.com/uc?export=view&id=1yeF47KelsFcpXalGM4r42Xg1NvUxDS_6)

## Roadmap

``` 
tomato-food-delivery/
│
├── 📁 backend/                      # Backend - Node.js + Express
│   ├── 📁 config/                   # Config files (DB, etc.)
│   ├── 📁 controllers/              # Route controllers
│   ├── 📁 middleware/               # Middleware functions
│   ├── 📁 models/                   # Mongoose models
│   ├── 📁 routes/                   # Express routes
│   ├── 📁 utils/                    # Utility functions
│   ├── 📄 server.js                 # Entry point for backend
│   └── 📄 package.json              # Backend dependencies
│
├── 📁 frontend/                     # Frontend - React app
│   ├── 📁 public/                   # Static files (index.html, favicon)
│   ├── 📁 src/
│   │   ├── 📁 assets/               # Images, icons, fonts
│   │   ├── 📁 components/           # Reusable React components
│   │   ├── 📁 contexts/             # React context providers
│   │   ├── 📁 pages/                # React pages/views
│   │   ├── 📁 services/             # API service calls
│   │   ├── 📁 styles/               # CSS / Tailwind files
│   │   ├── 📁 utils/                # Utility/helper functions
│   │   ├── 📄 App.js                # Main React component
│   │   ├── 📄 index.js              # React DOM rendering
│   │   └── 📄 package.json          # Frontend dependencies
│
├── 📄 .gitignore                   # Git ignore file
├── 📄 README.md                    # Project readme
└── 📄 README.so                    # (If used for editor version)
```
# Hi, I'm Himanshu Maurya! 👋


## 🚀 About Me
Hello, I'm Himanshu Maurya, a passionate Software Developer who loves building innovative and efficient software.


## 🛠 Skills
JavaScript , React.js , Tailwindcss , Next.js , Node.js , Express.js , MongoDB , PostgreSql , Redis , Kafka , Deployment , Docker , WebSocket , Testing , Git/GitHub , AWS , etc.


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.himanshumaurya.in/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ihimanshu29/)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/ihimanshu29)

