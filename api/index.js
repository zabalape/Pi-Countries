const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');

const PORT = 3001;
const createdAtDb = require("./src/utils/functions/copydb");

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}, `);
  })
}).catch(error => console.error(error))

setTimeout(() => {createdAtDb()}, 5000)
