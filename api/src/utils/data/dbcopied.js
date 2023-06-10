const apiRes = require('./apiData');

const dbcopied = async () => {

    try {return await apiRes()} catch (e){e.message}

};


async function getDataFromDatabase() {
  try {
    const data = await apiRes();
    console.log(data); // Aquí puedes hacer lo que desees con los datos de la base de datos
  } catch (error) {
    console.error('Error al obtener los datos de la base de datos:', error);
  }
}



const a = typeof dbcopied + '-----------------\n\n\n\n' + getDataFromDatabase();

module.exports = a;