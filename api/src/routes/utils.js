const { Router } = require('express');
const { User } = require('../db.js');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const router = Router();




router.post('/singup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const newUser = await User.create({
        username,
        password: await bcrypt.hash(password, 10),
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).send('Error al crear el usuario');
    }
  });

  
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const token = uuidv4();
  
      const loged = req.session.user = {
        id: user.id,
        token: token
      };
  
      res.status(200).json({ message: 'Inicio de sesión exitoso', loged });
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      res.status(500).json({ message: 'Error al buscar el usuario' });
    }
  });

  module.exports=router;