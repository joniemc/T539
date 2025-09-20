const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;
const fabricanteRoute = require('./routes/fabricanteRoute');
const authRoute = require('./routes/authRoute');

app.use(cors());
app.use(express.json());

app.use('/api', fabricanteRoute);
app.use('/api', authRoute);

app.get('/api/gethash/:pass',async (req, res)=>{
    const pass = req.params.pass;
    const saltRound = 10;
    const hash = await bcrypt.hash(pass, saltRound);

    res.status(200).json({status:'200', message:'Success', data: hash});
});

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});