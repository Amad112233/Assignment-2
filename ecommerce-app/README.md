# A2 — E‑Commerce App (MySQL, React Native + Express)

This repository matches the assignment requirements (5–7 screens, auth, cart, orders, MySQL).

## Repository Structure
```
A2/
└── ecommerce-app/
    ├── frontend/          # React Native Expo app
    ├── backend/           # Express.js server (MySQL)
    ├── ecommerce.sql      # Database schema + seed
    └── README.md
```

## Prerequisites
- Node.js LTS
- XAMPP (start **Apache** and **MySQL**)
- Expo CLI (`npm i -g expo-cli`) or `npx expo`

---

## Database Setup (XAMPP / MySQL)
1. Start **Apache** and **MySQL** in XAMPP.
2. Open **phpMyAdmin** → Import → choose `ecommerce.sql` (from this repo).
   - This creates database `ecommerce` and demo data.
3. (Optional) Update MySQL credentials if your root user has a password.

---

## Backend (Express + MySQL)
```bash
cd backend
cp .env.example .env
# If you set a MySQL password for root, update DB_PASSWORD in .env
npm install
npm run dev
# Server on http://localhost:3000
```

### API Base
`http://localhost:3000/api`

### Key Endpoints
- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
- **Products**: `GET /api/products`, `GET /api/products/:id`, `GET /api/products/categories`
- **Cart** (JWT): `GET /api/cart`, `POST /api/cart`, `PUT /api/cart/:productId`, `DELETE /api/cart/:productId`
- **Orders** (JWT): `POST /api/orders`, `GET /api/orders`
- **Users** (JWT): `GET /api/users/me`, `PUT /api/users/me`

**Demo user:** `demo@example.com` / `password`

---

## Frontend (React Native + Expo)
```bash
cd frontend
npm install
npm start
# or: npx expo start
```

> If running on a physical device, replace `http://localhost:3000` in `src/services/api.js` with your **local IP** (e.g., `http://192.168.0.5:3000`).

### Implemented Screens
- **Home** (grid/list of products + search)
- **Product Details**
- **Cart**
- **Checkout**
- **Order Confirmation**
- **Profile**
- **Categories/Filter**

### Libraries
- React Navigation (bottom tabs + stack)
- React Native Paper (UI)
- React Native Animatable (animations)
- Axios (HTTP)

---

## Frontend–Backend Flow Example
1. On first load, app logs in demo user (Profile/Cart needs token).
2. Add item to cart → `POST /api/cart`.
3. Checkout → `POST /api/orders` (moves cart to order + clears cart).
4. See Order Confirmation screen with order id.

---

## Screenshots (add your own)
Create screenshots of each screen and place them in a `/screenshots` folder, then reference them here.

---

## Notes
- Keep JWT safe; stored in memory for demo.
- Adjust CORS if accessing from a different host.
- Extend validation and error handling as needed.
