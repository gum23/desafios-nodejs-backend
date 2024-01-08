import express from 'express';
import ProductManager from './classes/ProductsManager.js';

const app = express();
const PORT = 8080;

const productoManager = new ProductManager;

//Initilize
await productoManager.initialize();

//Traer todos los productos
app.get("/products", async (req, res) => {

    try {
        const limit  = req.query.limit;
        const limitNumber = parseInt(limit);
        const result = await productoManager.getProducts(limitNumber);

        res.send(result);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).send("Error interno del servidor");
    }
})

//Traer produto por ID
app.get("/product/:id", async (req, res) => {
    try {
        const param = req.params.id;
        const paramNumber = parseInt(param);
        const result = await productoManager.getProductsById(paramNumber);

        res.send(result);
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).send("Error interno del servidor");
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT} `);
});