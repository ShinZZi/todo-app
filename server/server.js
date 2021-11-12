const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// ................ MIDDLEWARE ................ //
app.use(cors());

app.use("/", () => console.log("Okee"));

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
