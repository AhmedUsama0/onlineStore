const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.static("productsImages"));
app.use(express.json());
app.use(routes);


app.listen(5000, () => {
    console.log("server is running");
})