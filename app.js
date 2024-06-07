const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const postsRouter = require("./routers/postsRouter");
const errorHandler = require("./middleware/errorHandler");
const notFoundHandler = require("./middleware/notFoundHandler");

app.use(express.json());

app.use("/posts", postsRouter);

app.use(errorHandler);

app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
