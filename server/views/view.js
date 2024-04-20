const express = require("express");
const app = express();
app.set("view engine", "hbs");
app.set("views", __dirname);

app.get("/", (req, res) => {
    res.render("mail", { title: "hello ahmed" });
})
app.listen(4000, () => {
    console.log("view is running on port 4000");
});