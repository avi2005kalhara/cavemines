# CaveMines Web Game

A full-featured web-based Minesweeper-style game with login, registration, wallet system, MongoDB backend, and leaderboard.

---

## 🚀 Features
- Minesweeper-style game with random traps
- User registration & login system (JWT-based)
- Wallet system to place bets and earn winnings
- Leaderboard tracking recent plays
- MongoDB for user/game data

---

## 📁 Folder Structure

```
📦cavemines
├── 📁middleware
│   └── authMiddleware.js
├── 📁models
│   ├── Game.js
│   └── User.js
├── 📁public
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── style.css
│   └── script.js
├── 📁routes
│   ├── authRoutes.js
│   └── gameRoutes.js
├── 📁utils
│   └── connectDB.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

---

## 🔧 Installation

1. **Clone the repo**
```bash
git clone https://github.com/your-username/cavemines.git
cd cavemines
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/cavemines
JWT_SECRET=yourSuperSecretJWTKeyHere
```

4. **Start MongoDB** (make sure your MongoDB server is running)

5. **Run the server**
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to play.

---

## 📬 API Endpoints

### Auth
- `POST /api/auth/register` — register new user
- `POST /api/auth/login` — login and get JWT
- `GET /api/auth/wallet` — get user wallet balance *(requires JWT)*

### Game
- `POST /api/game/save` — save game result *(requires JWT)*
- `GET /api/game/leaderboard` — get recent game winners

---

## 🔐 Authentication
Use `Authorization: Bearer <token>` in headers for protected endpoints.

---

## 📄 License
MIT License

---

## 👤 Author
Built by [Your Name]. Replace this with your actual info!