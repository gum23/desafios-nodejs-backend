const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
    this.path = './products.json';
    this.loadProducts();
  }

  async loadProducts() {
    try {
      await fs.access(this.path);
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`El archivo '${this.path}' no existe. Creando uno nuevo...`);
        await this.saveProducts();
      } else {
        console.log('Error al cargar productos:', error.message);
      }
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (error) {
      console.log('Error al guardar productos:', error.message);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    if (this.products.some((p) => p.code === code)) {
      console.log(`Ya existe un producto con el código: ${code}`);
      return;
    }

    const newProduct = { id: this.id++, title, description, price, thumbnail, code, stock };
    this.products.push(newProduct);

    await this.saveProducts();
    console.log('El producto se agregó correctamente');
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products.splice(index, 1);
      await this.saveProducts();
      console.log(`Producto con ID ${id} eliminado correctamente`);
    } else {
      console.log(`No se encontró un producto con ID ${id}`);
    }
  }

  async updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      await this.saveProducts();
      console.log(`Producto con ID ${id} actualizado correctamente`);
    } else {
      console.log(`No se encontró un producto con ID ${id}`);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product === undefined) {
      return 'Not Found!';
    } else {
      return product;
    }
  }
}

const producto = new ProductManager();

console.log(producto.getProducts());
console.log("----------------------------------------------------");
producto.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen","abc123", 25);
console.log("----------------------------------------------------");
console.log(producto.getProducts());
producto.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen","abc123", 25);
console.log("----------------------------------------------------");
console.log(producto.getProductsById(0));
console.log("----------------------------------------------------");
console.log(producto.getProductsById(2));
console.log("----------------------------------------------------");
producto.addProduct("otro producto", "otra prueba", 100, "tampoco tiene img", "def456", 50);
console.log("----------------------------------------------------");
producto.updateProduct(1, {price: 200, thumbnail: "Otra img" });
console.log("----------------------------------------------------");