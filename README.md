# Booking App

This is a full-stack booking application built with:

- **Node.js & Express** for the backend (in the `api` folder)
- **React (Vite)** for the frontend (in the `front` folder)

---

## 📁 Project Structure

root/ │ ├── api/ # Express backend │ └── ... │ ├── front/ # React frontend using Vite │ └── ...


---

## 🔧 Environment Configuration

Create a `.env` file inside the `api` folder with the following structure:

```env
# Server
PORT=8000
NODE_ENV=dev

# App URLs
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:8000

# Database (configure with your own DB credentials)
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT
JWT_AT_SECRET=your_access_token_secret
JWT_EXPIRE=50m
JWT_VERIFICATION_SECRET=your_verification_secret

# SMTP (email service config)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email_user
SMTP_PASSWORD=your_email_password
EMAIL_FROM_NAME="Booking APP"
EMAIL_FROM_ADDRESS=your_email@example.com
```

## 🧪 Getting Started
Backend (API)

Navigate to the api folder: ```cd api```

Install dependencies: ```npm install```

Start the server: ```npm run dev```


Frontend (Client)

Navigate to the front folder: ```cd front```

Install dependencies: ```npm install```

Start the server: ```npm run dev```


### 📬 API & Client Communication
Make sure the URLs in the .env file match the development URLs:

Client: http://localhost:5173

Server: http://localhost:8000
