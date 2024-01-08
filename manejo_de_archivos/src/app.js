import ProductManager from './classes/ProductsManager.js';
import Product from './classes/products.js'

//Nueva instancia de ProductManager
const productoManager = new ProductManager();

//Instancias de Product
const producto1 = new Product(
    "Guitarra", 
    "Gibson Les paul", 
    580000, 
    "Sin imagen", 
    "gtr001", 
    4
);

const producto2 = new Product(
    "Guitarra-2",
    "Stratocaster Fender",
    450000,
    "Sin imagen",
    "gtr002",
    6
);

const producto3 = new Product(
    "saxo",
    "Dorado nuevo",
    780000,
    "Sin imagen",
    "air001",
    3
);

const producto4 = new Product(
    "Bajo",
    "Ibanez 5 cuerdas",
    550000,
    "Sin imagen",
    "gtr002",
    4
);

//Initilize
await productoManager.initialize();

//Agregar producto1 en ProductManager
await productoManager.addProduct(producto1);
await productoManager.addProduct(producto2);
await productoManager.addProduct(producto3);
await productoManager.addProduct(producto4);

//Traer todos los productos
await productoManager.getProducts();

//Traer produto por ID
await productoManager.getProductsById(2);

//Actualizar producto o parte de el por ID
await productoManager.updateProduct(2,{
    title: "Bajo"
});
await productoManager.updateProduct(1, {
    stock: 8
})

//Eliminar producto por ID
await productoManager.deleteProduct(2);