const express = require("express");
const { faker } = require("@faker-js/faker");

const app = express();

PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hola mi server en express");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola, soy una nueva ruta");
});

app.get("/categories", (req, res) => {
  res.send("endpoint de categories");
});

/* app.get("/products", (req, res) => {
  res.json([
    {
      name: "product 1",
      price: 1000,
    },
    {
      name: "product 2",
      price: 2000,
    },
  ]);
}); */

// endpoint con inyeccion de fake api faker
app.get("/products", (req, res) => {
  const products = [];
  const { size } = req.query; // Se extrae el size del req.query
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

app.get("/products/filter", (req,res)=> {
  res.send("yo soy un filter");
});

/* NOTA: Todos los endpoint espécificos deben ir antes de los endpoint
*  dinámicos para que no haya conflicto que tome el parámetro como 
*  dinámico
*/

// req.params
// endpoint con recepción de un parametro dinámico enviado en la url
app.get("/products/:id", (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  res.json({
    id,
    name: "product 2",
    price: 2000,
  });
});

// endpoint que recibe dos parámetros dinámicos
app.get("/categories/:categoryId/products/:productsId", (req, res) => {
  const { categoryId, productsId } = req.params;
  res.json({
    categoryId,
    productsId,
  });
});

// Query params
app.get("/users", (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send("No hat parámetros para mostrar");
  }
});

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));