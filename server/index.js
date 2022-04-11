const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");
//middleware

app.use(cors());
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//   // dbParams.connectionString = process.env.DATABASE_URL;
//   // dbParams.ssl = { rejectUnauthorized: false };
//   //server static content
//   //npm run build
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/employee", require("./routes/employees"));

// app.use("/form", require("./routes/employees"));
// app.use("/templates/dark", require("./routes/account"));
// app.use("/templates/lbd", require("./routes/account"));
// app.use("/templates/md", require("./routes/account"));
// app.use("/templates/gm", require("./routes/account"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
