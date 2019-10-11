require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use("/v1/user", require("./routes/v1/user"));
app.use("/v1/advisor", require("./routes/v1/advisor"));
app.use("/v1/auth", require("./routes/v1/auth"));
app.use("/v1/training", require("./routes/v1/training"));
app.use("/v1/token", require("./routes/v1/token"));
app.use("/v1/pagseguro", require("./routes/v1/pagseguro"));
app.use("/v1/image", require("./routes/v1/image"));
app.use("/v1", require("./routes/v1/index"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor inicializado na porta ${PORT}`));
