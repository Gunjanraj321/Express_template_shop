const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getProducts = (req, res, next) => {
  req.user
  .getProducts()
  .then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log(err))
};

exports.postAddProduct = (req, res, next) => {
  const title= req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  Product.create({
    title: title ,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(res=>{
    // console.log(res)
    console.log('created product')
    res.redirect('/admin/product')
  })
  .catch(err=>console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({where : {id:prodId}})
  // Product.findAll({where: {id:prodId}})
  .then(products =>{
    const product = products[0];
    if (!product) {
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product[0]
  });
    
  })
  .catch(err=>console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedimageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findAll({where: {id:prodId}})
    .then(product =>{
      product.title = updatedTitle,
      product.price = updatedPrice,
      product.imageUrl = updatedimageUrl,
      product.description = updatedDesc
      return product[0].save();
    })
    .then(res => console.log("updated"))
    .catch(err=>console.log(err))
  res.redirect('/admin/products');
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({where: {id:prodId}})
  res.redirect('/admin/products');
};
