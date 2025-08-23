const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const libros = [];

const ESTADOS = ['disponible','prestado','reservado','daniado'];

function ValidarAtributosLibro(libro){
    if(!libro){
        return false;
    }

    if(!libro.id || !libro.titulo || !libro.autor || !libro.anioPublicacion || !libro.estado){
        return false;
    }

    if(!ESTADOS.includes(libro.estado)){
        return false;
    }

    return true;
}

app.get('/libros', (req,res)=>{
    res.json({status:200, message:'Success', data: libros});
});

app.post('/libros', (req,res)=>{
    const libro = req.body;
    
    if(!ValidarAtributosLibro(libro)){
        res.status(400).json({status: 400, message: 'Error con la entrada de datos..'});
    }
    else{
        libros.push(libro);

        res.status(201).json({status: 201, message: 'Success', data: libro});
    }
});

app.put('/libros/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const libro = req.body;

    let isExist = false;

    if(!libro || !id){
        res.status(400).json({status:400, message: 'No cumple con las validaciones'});
    }

    if(libro.estado){
        if(ESTADOS.includes(libro.estado)){
            
        }
    }

    libro.forEach(lib => {
        if(lib.id === id){
            isExist = true;
            lib.titulo = libro.titulo;
            lib.autor = libro.autor;
            lib.anioPublicacion = libro.anioPublicacion;
            lib.estado = libro.estado;
        }
    });

    if(isExist){
        res.status(200).json({status:200, message: 'Registro actualizado con exito', data: libro});
    }else{
        res.status(404).json({status:404, message: 'Registro no existe'});
    }


});

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});