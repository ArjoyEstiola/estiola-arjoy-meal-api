const express = require("express");

const app = express();

const PORT = 3000;

// Add your own products here. Each product needs: id, food, price
const products = [
    // {
    //     id: 1,
    //     food: "Adobo",
    //     price: 89
    // },
];

    //Retrieve all products
    app.get("/api/products", (req, res) => {
        res.json(products);
    });

    //Search products by food name (case-insensitive, partial match)
    //e.g. /api/products/search?q=chicken
    //NOTE: this must be declared BEFORE /api/products/:id, otherwise
    //Express would treat "search" as an :id value and this route
    //would never be reached.
    app.get("/api/products/search", (req, res) => {
        const query = (req.query.q || "").toLowerCase().trim();

        if(!query){
            return res.json(products);
        }

        const results = products.filter(product =>
            product.food.toLowerCase().includes(query)
        );

        res.json(results);
    });

    //Retrieve one product through id
    app.get("/api/products/:id", (req, res) => {
        const id = Number(req.params.id);
        const product = products.find(product =>
            product.id == id
        );

        if(!product){
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);
    });


   app.use(express.static(__dirname));
   app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);

   });
