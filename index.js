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
    const { id, firstName, gmail } = product;
    return { id, firstName, gmail };
  });
  res.json(newItem);
});

// Param route
app.get("/api/gmail/:gmail", (req, res) => {
  const { gmail } = req.params;
  const singleProduct = products.find((product) => product.gmail === gmail);
  
  if (singleProduct) {
    res.json(singleProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

//Param Examaple: 2
app.get("/api/product/:id", (req, res) => {
    const { id } = req.params;
    const singleProduct = products.find((product) => product.id === parseInt(id));
    
    if (singleProduct) {
      res.json(singleProduct);
    } else {
      res.status(404).send('Product not found');
    }
  });

app.get("/about", (req, res) => {
  res.send("About page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
