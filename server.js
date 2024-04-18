const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tirth@009",
  database: "gamerStudio",
});

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

// Dynamic route for fetching data from any table
app.get("/getTableData/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  con.query(`SELECT * FROM ${tableName}`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/insertData/:tableName", (req, res) => {

});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});