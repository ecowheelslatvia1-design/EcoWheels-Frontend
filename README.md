# Cycle E-commerce Frontend

Frontend application for Cycle E-commerce Website built with React.

## Features

- Product listing with filters (category, search, featured)
- Product details page
- Shopping cart functionality
- User authentication (login/register)
- Responsive design
- Modern UI/UX

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── ProductCard/
│   │   ├── ProductList/
│   │   ├── ProductDetails/
│   │   ├── Cart/
│   │   ├── Loading/
│   │   └── Message/
│   ├── pages/
│   │   ├── Home/
│   │   ├── ProductDetail/
│   │   ├── CartPage/
│   │   ├── Login/
│   │   └── Register/
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
