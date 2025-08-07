const express = require('express');
const app = express();
const PORT = 3000;

const productos = [];

app.use(express.json());

app.get('/bienvenida',(req, res)=>{
    res.send('Hola mundo de express, clase T539');
});

app.get('/productos',(req, res)=>{
    res.json({status:200,message:'Success', data: productos});
});

app.post('/productos',(req, res)=>{
    let producto = req.body;
    productos.push(producto);

    res.send('Registro agregado con exito.');
});

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});