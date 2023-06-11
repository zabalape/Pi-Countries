const { Router } = require('express');
const { Op } = require('sequelize');
const { Countries } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await Countries.findAll({});
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener los datos de la base de datos');
  }
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const countries = await Countries.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    if (countries.length === 0) {
      return res.status(404).send('No se encontraron países con el nombre especificado');
    }

    res.status(200).json(countries);
  } catch (error) {
    console.error('Error al encontrar países por nombre:', error);
    res.status(500).send('Error al buscar países por nombre');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const country = await Countries.findOne({ where: { id: id } });

    if (!country) {
      return res.status(404).send('No se encontró país con el nombre especificado');
    }

    res.status(200).json(country);
  } catch (error) {
    console.error('Error al encontrar el país por nombre:', error);
    res.status(500).send('Error al buscar el país por nombre');
  }
});

module.exports = router;
