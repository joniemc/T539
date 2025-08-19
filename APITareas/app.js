const express = require('express');
const app = express();
PORT = 3000;

const tasks = [];
app.use(express.json());

app.get('/api/tasks',(req, res)=>{
    res.json({status:200,message:'Success',data: tasks});
});

app.post('/api/tasks',(req,res)=>{
    const task = req.body;
    task.id = IdAutoIncremental();
    task.status = 'Pendiente';

    if(!task.title || !task.description || !task.priority){
        return res.status(400).json({status:400,message:'title, description y priority son campos obligatorios'});
    }
    else{
        // agregar validación para tamaño del titulo
        //if(title){}
        
        // agregar la validación del priority, solo puede ser "alta", "media" o "baja
        //if(priority){}
        
        tasks.push(task);

        res.json({status:200,message:'Success',data: task});
    }
    
});
function IdAutoIncremental(){
    return 0;
}

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});