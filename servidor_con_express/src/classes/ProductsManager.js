import * as methods from "../utils/methods.js";
// import Product from './products.js'

class ProductManager {
  constructor() {
    this.products = [];
  }

  async initialize() {
    await methods.ensureExistFile();
    this.products = await methods.readFile();
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    try {
      const prodById = this.products.find((p) => p.id === product.id )
      
      if (prodById) {
        console.log(`El producto \"${prodById.title}\" ya existe`);
        
        prodById.stock += product.stock;

        await methods.writeFile(this.products);
        console.log(
          `Cantidad actualizada para ${prodById.title}. Nuevo stock: ${prodById.stock}`
        );
      } else {
        this.products.push(product);

        await methods.writeFile(this.products);
        console.log(`Producto agregado exitosamente: ${product.title}`);
      }

    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          `El archivo ${PATH} no existe. Creando archivo y agregando el producto ${product.title}`
        );

        await methods.writeFile([product]);
        console.log(
          `Se ha creado el archivo ${PATH} y se agregó el producto ${product.title}`
        );
      } else {
        console.log("Error", error);
      }
    }
  }

  async getProducts(limit) {
    if (limit) {
      const newArr = this.products.slice(0, limit);
      return newArr
    } else {
      return this.products;
    }
  }

  async getProductsById(id) {
    let product = this.products.find((product) => product.id === id);

    if (product == undefined) {
      return {"Error en el pedido": "El producto no existe"};
    } else {
      return product;
    }
  }

  async updateProduct(id, product) {
    const i = this.products.findIndex((prod) => prod.id === id);
    
    if (i !== -1) {
      await methods.updateProduct(i, product, this.products)

      await methods.writeFile(this.products);
      console.log(`El producto se actualizó correctamente`);
    } else {
      console.log("Product not found");
    }
  }

  async deleteProduct(id) {
    const i = this.products.findIndex((prod) => prod.id === id );

    if (i !== -1) {
      this.products.splice(i, 1);

      await methods.writeFile(this.products);
      console.log(`El producto de id: ${id} fué eliminado correctamente`);
    } else {
      console.log(`El id: ${id} ingresado no coincide con ningun producto`);
    }

  }
}

export default ProductManager;
