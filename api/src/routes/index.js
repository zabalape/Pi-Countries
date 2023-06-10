const { Router } = require("express");
const router = Router();
const sendData = require('../utils/data/sendData');
router.get('/countries', async (req, res) => {
  try {
    const countries = await sendData();
    res.send(countries);
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
    res.status(500).json({ error: 'Error al obtener los datos de la API' });
  }
});

module.exports = router;