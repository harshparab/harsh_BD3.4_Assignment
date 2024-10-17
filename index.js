const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addItemsToCart(products, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });

  return cart;
}

// endpoint 1
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let result = addItemsToCart(cart, productId, name, price, quantity);

  res.json({ cartItems: result });
});

function updateQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }

  return cart;
}

// endpoint 2
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantity(cart, productId, quantity);

  res.json({ cartItems: result });
});

function removeProductFromCart(product, productId) {
  return product.productId !== productId;
}

// endpoint 3
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((product) =>
    removeProductFromCart(product, productId)
  );

  res.json({ cartItems: result });
});

// endpoint 4
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function fetchTotalCartQuantity(cart) {
  let totalQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }

  return { totalQuantity: totalQuantity };
}

// endpoint 5
app.get('/cart/total-quantity', (req, res) => {
  let result = fetchTotalCartQuantity(cart);

  res.json(result);
});

function fetchTotalPrice(cart) {
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].quantity * cart[i].price;
  }

  return { totalPrice: totalPrice };
}

// endpoint 6
app.get('/cart/total-price', (req, res) => {
  let result = fetchTotalPrice(cart);

  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
