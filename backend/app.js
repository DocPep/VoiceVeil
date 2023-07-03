require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/post', postRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Connected to port: ${PORT}`);
}); 