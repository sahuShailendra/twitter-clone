const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth.Routes')
const postRoute = require('./routes/post.Routes')

const app = express()
// ✅ CORS setup
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
]
app.use(
  cors({
    origin: allowedOrigins, // frontend origin (Vite dev server)
    credentials: true, // allow cookies, JWT in cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use(express.json())  // for parsing application/json
app.use(cookieParser())  // for parsing cookies

// 🚀 Route Middlewares

app.use('/auth', authRoute)
app.use('/posts', postRoute)


module.exports = app;
