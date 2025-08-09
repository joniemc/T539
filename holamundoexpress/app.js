const express = require('express');
const app = express();
const PORT = 3000;

let productos = [];

app.use(express.json());

app.get('/bienvenida',(req, res)=>{
    res.send('Hola mundo de express, clase T539');
});

app.get('/productos/:id',(req, res)=>{
    const id = parseInt(req.params.id);

    const producto = productos.find(prod => prod.id === id);

    if(producto){
        res.json({status:200, message:'Success', data: producto});
    }
    else{
        res.status(400).json({status:400, message:'Registro no encontrado'});
    }
});

app.get('/productos',(req, res)=>{
    res.json({status:200,message:'Success', data: productos});
});

app.post('/productos',(req, res)=>{
    let producto = req.body;
    productos.push(producto);

    res.send('Registro agregado con exito.');
});

app.put('/productos/:id',(req, res)=>{
    const id = parseInt(req.params.id);
    const producto = req.body;

    let exists = false;

    productos.forEach(prod => {
        if(prod.id === id){
            exists = true;
            prod.nombre = producto.nombre;
            prod.descripcion = producto.descripcion;  
        }
    });
    
    if(exists){
        res.json({status:200, message:'Actualizado exitosamente', data: producto});
    }
    else{
        res.status(400).json({status:400, message:'Registro no encontrado', data: null});
    }
});

app.delete('/productos/:id',(req, res)=>{
    const id = parseInt(req.params.id);

    const productosFiltrados = productos.filter(prod => prod.id !== id);

    if(productosFiltrados.length !== productos.length){
        productos = productosFiltrados;
        res.json({status:200, message:'Registro eliminado exitosamente'});
    }
    else{
        res.status(400).json({status:400, message:'Registro no encontrado'});
    }
});

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});