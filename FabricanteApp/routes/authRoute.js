const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


require('dotenv').config();

router.get('/hello', authMiddleware,(req,res)=>{
    res.send('Hello Routes');
});

router.post('/login',(req, res)=>{
    const user = req.body;

    if(!user.username || !user.password){
        return res.status(404).json({status:404, message:'Usuario y Contraseña son requeridos..'});
    }

    const sql = 'select * from usuario where username = ? AND password = ?';

    pool.query(sql, [user.username, user.password],(err, results)=>{
        if(err){
            return res.status(500).json({status:500, message:'Ocurrio un error de conexión con el servidor..'});
        }

        if(results.length === 0){
            return res.status(401).json({status:401, message:'Credenciales invalidas..'});
        }

        const token = jwt.sign(
            {username: user.username},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );

        res.status(200).json({satus:200,message:'Success',token:token});
    });
});

module.exports = router;