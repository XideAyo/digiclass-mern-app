const express = require('express');
const dotenv = require("dotenv")
const cors = require("cors")
const notes = require('./data/notes');
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleWare');
const path = require("path")


const app = express();
dotenv.config();
connectDB();
app.use(express.json())
app.use(cors())

// ---------deployment------------

const dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is not running..");
  });
}

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`server started on port ${PORT}`))