const express = require('express');

const app = express();

PORT = 3000

app.get('/', (req,res)=> {
    res.send("Hola mi server en express")
})

app.get('/nueva-ruta', (req,res)=> {
    res.send("Hola, soy una nueva ruta")
})

app.get('/categories', (req,res)=> {
    res.send("endpoint de categories")
})

app.get('/products', (req,res)=> {
    res.json({
        name: 'product 1',
        price: 1000
    })
})



app.listen(PORT, ()=> console.log(`Listen on port ${PORT}`) )