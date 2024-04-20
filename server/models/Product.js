const database = require("../config/database");

class Product {
    static getLimitedNumberOfProducts(limit, offset, callback) {
        const query = "SELECT * FROM products LIMIT ? OFFSET ?";
        database.query(query, [limit, offset], (err, data) => callback(err, data));
    }

    static getNumberOfProducts(callback) {
        const query = "SELECT COUNT(*) as productsNumber FROM products";
        database.query(query, (err, data) => callback(err, data));
    }

    static getById(ids, callback) {
        const query = "SELECT * FROM products WHERE id IN (?) ";
        database.query(query, [ids], (err, data) => callback(err, data));
    }

}

module.exports = Product;