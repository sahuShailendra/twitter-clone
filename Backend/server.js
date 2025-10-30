require('dotenv').config()
const connectDB = require('./src/db/db')
const app = require('./src/app')

const PORT = process.env.PORT 
connectDB()

app.listen(PORT, ()=>{
    console.log("Server is running on port http://localhost:3000");
})
