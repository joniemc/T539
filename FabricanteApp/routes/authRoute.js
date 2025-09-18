const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


require('dotenv').config();

router.get('/hello', authMiddleware,(req,res)=>{
    res.send('Hello Routes');
});

router.post('/login',async (req, res)=>{
    const user = req.body;

    if(!user.username || !user.password){
        return res.status(404).json({status:404, message:'Usuario y Contraseña son requeridos..'});
    }

    const sql = 'select * from usuario where username = ?';

    pool.query(sql, [user.username],async (err, results)=>{
        if(err){
            return res.status(500).json({status:500, message:'Ocurrio un error de conexión con el servidor..'});
        }

        if(results.length === 0){
            return res.status(401).json({status:401, message:'Credenciales invalidas..'});
        }

        //validación de contraseña
        let cUser = results[0];
        const isMatch = await bcrypt.compare(user.password, cUser.password);

        if(!isMatch){
            return res.status(401).json({status:401, message:'Credenciales invalidas..'});
        }
        // FIN de la validacipón de la contraseña
        
        const token = jwt.sign(
            {username: user.username},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );

        res.status(200).json({satus:200,message:'Success',token:token});
    });
});

router.post('/user', authMiddleware, async (req, res)=>{
    const user = req.body;
    if(!user.username || !user.password){
        return res.status(400).json({status:400, message:'username y password son requeridos..'});
    }

    const sql = 'insert into usuario (username,password) values(?,?)';

    const saltRound = 10;
    const passEncrypt = await bcrypt.hash(user.password, saltRound);

    pool.query(sql,[user.username, passEncrypt],(err,results)=>{
        // Completar el insert a base de datos en la tabla usuario, 
        // El password deberia estar encriptado.
    });

});

module.exports = router;