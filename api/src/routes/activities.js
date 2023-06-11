const { Router } = require('express');
const { Op } = require('sequelize');
const { Activities, Countries } = require('../db.js');
const isAuthenticated = require('../utils/controller/isAuthenticated.js');

const router = Router();

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const data = await Activities.findAll({});
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener los datos de la base de datos');
  }
});

router.get('/:name', isAuthenticated, async (req, res) => {
  const { name } = req.params;

  try {
    const activity = await Activities.findOne({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    if (!activity) {
      return res.status(404).send('No se encontró actividad con el nombre especificado');
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error('Error al encontrar la actividad por nombre:', error);
    res.status(500).send('Error al buscar la actividad por nombre');
  }
});

router.post('/', isAuthenticated, async (req, res) => {
  const { name, difficulty, length, season, countryId, userId } = req.body;

  try {
    const country = await Countries.findOne({ where: { id: countryId } });

    if (!country) {
      return res.status(404).send('No se encontró el país con el ID especificado');
    }

    const activity = await Activities.create({
      name,
      difficulty,
      length,
      season,
      countryId,
      userId
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error('Error al crear la actividad:', error);
    res.status(500).send('Error al crear la actividad');
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { name, difficulty, length, season, countryId } = req.body;

  try {
    const activity = await Activities.findByPk(id);

    if (!activity) {
      return res.status(404).send('No se encontró la actividad con el ID especificado');
    }

    // Actualizar los atributos de la actividad
    activity.name = name;
    activity.difficulty = difficulty;
    activity.length = length;
    activity.season = season;
    activity.countryId = countryId;

    // Guardar los cambios
    await activity.save();

    res.status(200).json(activity);
  } catch (error) {
    console.error('Error al actualizar la actividad:', error);
    res.status(500).send('Error al actualizar la actividad');
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await Activities.findByPk(id);

    if (!activity) {
      return res.status(404).send('No se encontró la actividad con el ID especificado');
    }

    // Eliminar la actividad
    await activity.destroy();

    res.status(200).send('Actividad eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar la actividad:', error);
    res.status(500).send('Error al eliminar la actividad');
  }
});

module.exports = router;
