const fs = require('fs');
const path = require('path');
const Cart = require('./cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id){
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id ===id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p , JSON.stringify(updatedProducts),err=>{
          if(!err){
            Cart.deleteProduct(id,product.price)  
          }
      })
      cb(product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static deleteProduct(id,productPrice){
    fs.readFile(p,(err,fileContent)=>{
      if(err) {
        return;
      }
      const updatedCart = {...JSON.stringify(fileContent)}
      const product = updatedCart.products.find(prod => prod.id ===id)
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod =>prod.id!==id)
      updatedCart.totalPrice=updatedCart.totalPrice-productPrice*productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    })
  }
};
