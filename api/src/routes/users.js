const { Router } = require('express');
const { User } = require('../db.js');
const bcrypt = require('bcrypt');
const isAuthenticated = require('../utils/controller/isAuthenticated.js');

const router = Router();


router.get('/', isAuthenticated, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
});

router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('No se encontró usuario con el ID especificado');
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).send('Error al obtener el usuario');
  }
});

router.post('/', isAuthenticated, async (req, res) => {
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

router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('No se encontró usuario con el ID especificado');
    }

    await user.update({
      name,
      password: await bcrypt.hash(password, 10),
    });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).send('Error al actualizar el usuario');
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('No se encontró usuario con el ID especificado');
    }

    await user.destroy();

    res.status(200).send('Usuario eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).send('Error al eliminar el usuario');
  }
});


module.exports = router;
