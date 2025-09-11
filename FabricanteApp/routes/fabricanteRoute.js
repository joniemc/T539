const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/fabricantes',authMiddleware,(req,res)=>{
    const sql = "select id,nombre,descripcion from fabricante";

    pool.query(sql, (err, results)=>{
        if(err){
            res.status(500).json({status:500, message:'Error en la consulta..'});
        }
        else{
            res.status(200).json({status:200, message:'success', data:results});
        }
    });
});

router.post('/fabricantes',(req, res)=>{
    const fabricante = req.body;
    const sql = "insert into fabricante (nombre, descripcion) values(?,?)";
    pool.query(sql,[fabricante.nombre,fabricante.descripcion],(err, results)=>{
        if(err){
            res.status(500).json({status:500, message:'Error en la consulta..'});
        }
        else{

            fabricante.id = results.insertId;
            res.status(201).json({status:201,message:'success',data:fabricante});
        }
    });
});

router.put('/fabricantes',(req, res)=>{
    const fabricante = req.body;

    const sql = 'update fabricante set nombre = ?, descripcion=? where id = ?';

    pool.query(sql,[fabricante.nombre, fabricante.descripcion, fabricante.id],(err, results)=>{
        if(err){
            return res.status(500).json({status:500, message:'Error al actualizar..'});
        }
        
        if(results.affectedRows === 0){
            return res.status(404).json({status:404, message:'Registro no encontrado..'});
        }

        return res.status(200).json({status:200, message:'Success', data:fabricante});
    
    });

});

router.delete('/fabricantes/:id',(req, res)=>{
    const id = parseInt(req.params.id);

    const sql = 'delete from fabricante where id = ?';

    pool.query(sql,[id],(err, results)=>{
        if(err){
            return res.status(500).json({status:500, message:'Error al eliminar..'});
        }
        
        if(results.affectedRows === 0){
            return res.status(404).json({status:404, message:'Registro no encontrado..'});
        }

        return res.status(200).json({status:200, message:'Registro eliminado exitosamente..'});
    });
});

module.exports = router;