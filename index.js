const express = require("express");
const app = express();
const products = require("./Data"); // Ensure you have the Data file in the correct path

const PORT = 3030;

app.get("/", (req, res) => {
  res.send("hello");
});

// JSON route
app.get("/api/phone", (req, res) => {
  const newItem = products.map((product) => {
    const { id, title, gmail } = product;
    return { id, title, gmail };
  });
  res.json(newItem);
});

// Param route by Gmail
app.get("/api/gmail/:gmail", (req, res) => {
  const { gmail } = req.params;
  const singleProduct = products.find((product) => product.meta.reviewerEmail === gmail);

  if (singleProduct) {
    res.json(singleProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

// Param route by ID
app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const singleProduct = products.find((product) => product.id === parseInt(id));

  if (singleProduct) {
    res.json(singleProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

// Query route
app.get("/api/find/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => 
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit));
  }

  res.json(sortedProducts);
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
