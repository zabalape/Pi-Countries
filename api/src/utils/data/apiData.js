const axios = require('axios');
const { Countries } = require('../../db');

const apiRes = async () => {
  try {
    const response = await axios.get('http://localhost:5000/countries');
    const data = response.data;

    for (const country of data) {
      const {
        name,
        flags,
        continents,
        subregion,
        area,
        population
      } = country;

      await Countries.create({
        name: name.common,
        image: flags.svg,
        continent: continents[0],
        subregion: subregion || continents[0],
        area: area,
        population: population
      });
    }

    const result = await Countries.findAll();
    return result;
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
  }
}

module.exports = apiRes;
