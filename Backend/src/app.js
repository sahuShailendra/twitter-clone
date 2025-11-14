const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth.Routes')
const postRoute = require('./routes/post.Routes')

const app = express()
// ✅ CORS setup

app.use(
  cors({
    origin: 'https://twitter-clone-peach-mu.vercel.app' , // frontend origin (Vite dev server)
    credentials: true, // allow cookies, JWT in cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
  })
);
// app.options('*', cors());
app.use(express.json())  // for parsing application/json
app.use(cookieParser())  // for parsing cookies

// 🚀 Route Middlewares

app.use('/auth', authRoute)
app.use('/posts', postRoute)


module.exports = app;
