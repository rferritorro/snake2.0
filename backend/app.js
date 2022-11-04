const express = require("express");
const conectarDB = require("./db/conn");
const cors = require("cors");
const app = express();

app.use(cors());
conectarDB();

const port = 2500;

//cargar models
require('./app');
require('./models/users.model');
require('./models/highscore_normal.model');
require('./models/highscore_avant.model');
require('./models/highscore_pro.model');


app.use(express.json());
app.use(require("./routes"));

app.get('/', function(req, res) {
  res.send("{Message: THE APPLICATION IS RUNNING}");
})

app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
  });