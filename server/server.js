const express = require("express");
const database = require("./config/database");
const cors = require("cors");


const app = express();

app.use(express.static("productsImages"));
app.use(cors());



app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);


    database.query("SELECT COUNT(*) as productsNumber FROM products", (err, data) => {
        const productsNumber = data[0].productsNumber;
        const numberOfPages = Math.ceil(productsNumber / limit);

        database.query("SELECT * FROM products LIMIT ? OFFSET ?", [limit, offset], (err, data) => {
            res.json({
                products: data,
                numberOfPages
            })
        })
    });

});


app.get("/product/:id", (req, res) => {
    const { id } = req.params;
    database.query("SELECT * FROM products WHERE id=?", [id], (err, data) => {
        res.json(data[0]);
    })
})
app.listen(5000, () => {
    console.log("server is running");
})