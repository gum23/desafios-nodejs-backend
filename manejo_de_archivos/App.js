import Product from "./classes/products.js";
import ProductManager from "./classes/ProductManager.js";

const productManager = new ProductManager();

const producto1 = new Product(
  "Guitarra", 
  "Gibson Les paul", 
  580000, 
  "Sin imagen", 
  "gtr001", 
  4, 
  []
);
const producto2 = new Product(
  "Guitarra",
  "Stratocaster Fender",
  450000,
  "Sin imagen",
  "gtr002",
  2,
  []
);
const producto3 = new Product(
  "Bateria",
  "Tama 5 cuerpos",
  958000,
  "Sin imagen",
  "bta001",
  1,
  []
);
const producto4 = new Product(
  "Bajo",
  "Ibanez 5 cuerdas",
  550000,
  "Sin imagen",
  "bss001",
  3,
  []
);

await productManager.initialize();


await productManager.addProduct(producto1);
await productManager.addProduct(producto2);
await productManager.addProduct(producto3);
await productManager.addProduct(producto4);


await productManager.deleteProd(2);


await productManager.getProducts();


await productManager.updateProd(3, {
  title: "Saxo",
  description: "Dorado nuevo",
  price: 780000,
  thumbnail: "No hay imagen",
  code: "air001",
  stock: 2,
});

setTimeout(async () => {
  await productManager.getProducts();
}, 5000);

await productManager.getProdById(2);
await productManager.getProdById(3);