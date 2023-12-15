const express= require("express");

const ProductManager = require("../src/ProductManager")

const app= express();

const productManager= new ProductManager("products.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get("/products", (req, res) => {

    const limit = parseInt(req.query.limit);

    const allProducts = productManager.getProducts();

    if (isNaN(limit)) {
        res.json({ products: allProducts });
    } else {
        const limitedProducts = allProducts.slice(0, limit);

        if (limitedProducts.length < limit) {
            res.json({ message: "No hay suficientes productos disponibles."});
        } else {
            res.json({ products: limitedProducts });
        }
    }
});



app.get("/products/:pid", (req, res) => {

    const { pid } = req.params;
    const product = productManager.getProductById(Number(pid));

    if (product !== "Producto no encontrado"){
        res.json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});


app.listen(8081, ()=>{
    console.log("Escuchando en el puerto 8081");
});
