require("dotenv").config({ path: ".env" });
const port = parseInt(process.env.PORT) || 3004;
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const mongoose  = require("mongoose");
const upload = require('express-fileupload')
app.use(express.json());
app.use(cors());
app.use(upload());


const connectMongoose = mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
    (err) => {
      if (err) {
        return console.log({ Error: err.message });
      }
      console.log("Connected");
    }
  );
  const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
  console.log(DB);
//   connectMongoose();
app.use("/api", routes);

app.get("/*", (req, res) => {
    res.json({ status: 200, response: "wrong Route" });
});
app.listen(port,(err) => {
    if (err) {
        return console.log({ Error: err.message || `server not started` });
    }
    console.log(`server started at http://localhost:${port}`);
});
