  # Project2SpiritX

  # 🏏 Spirit11 - Fantasy Cricket for MoraSpirit

Welcome to **Spirit11**, the ultimate fantasy cricket league for university cricket fans! Developed for **SpiritX**, this project allows users to build dream teams, analyze statistics, and compete on the leaderboard using real university cricket players.

---
## 🤝 Contributors
👨‍💻 **Syntax_404**  
Members - Rahavi Sirithar
          Suwasthiga Nagendramoorthy
          Parkkavi Sivakaran
          Shaamma Sajahan
          Arthikha Sooriyakumar
            
🎯 Developed for **SpiritX - MoraSpirit**  

---

## 🚀 Features

### 🔥 Admin Panel
- 📋 **Manage Players**: Create, update, and delete players while maintaining a dynamic player database.
- 📊 **Player Stats**: View detailed statistics for every player.
- 📈 **Tournament Summary**: Track overall runs, wickets, top scorers, and best bowlers.
- 🔒 **Secure Access**: Admin-only authentication with real-time updates.

### 🏆 User Interface
- 🔐 **User Authentication**: Sign up & log in with a secure system.
- 📜 **Players View**: Explore available players with their stats.
- 🏏 **Team Selection**: Draft your 11-player team under a budget of **Rs.9,000,000**.
- 💰 **Budget Tracker**: Monitor remaining budget and player costs.
- 📊 **Leaderboard**: Compete against others and climb the rankings.
- 📱 **Fully Responsive**: Seamless experience across all devices.

### 🤖 AI Chatbot - Spiriter
- 📢 **Player Insights**: Get real-time details on player stats.
- 🏅 **Best Team Suggestion**: AI-powered selection of the highest-scoring team.
- 🤷‍♂️ **Intelligent Responses**: Handles unknown queries gracefully.
- 🔒 **Data Protection**: Ensures no player points are revealed.

---

## ⚙️ Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT-based authentication
- **AI Chatbot**: Gemini API

---

## 📜 Rules & Restrictions 
✅ No custom point system allowed.  
✅ CRUD operations are created for all users, but they were only implemented on the newly created users.
✅ Points and values are dynamically calculated as per given logic.  

---

## 📌 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/your-repo/spirit11.git](https://github.com/RahaviSiri/SpiritX_Syntax404_02.git

Steps -
# For frontend
cd frontend

# Install dependencies
npm install axios react react-dom react-icons react-router-dom react-toastify

# Start the frontend
npm run dev

# For backend
cd backend

# Install dependencies
npm install bcrypt cloudinary cors dotenv express jsonwebtoken mongoose multer nodemon validator

# Start the backend server
npm run dev
```

---
Create an .env file in the backend folder and add the following data -
  MONGO_URI=your_mongodb_connection_string
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  ADMIN_EMAIL="spiritx@demo.com"
  ADMIN_PASS="12345"
  JWT_SECRET=your_jwt_secret_key
  GEMINI_API_KEY=your_gemini_api_key
  
---


