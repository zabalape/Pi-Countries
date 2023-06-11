const {Countries} = require("../../db");
const data = require("./data");

const createdAtDb = async () => {
  try {
    const cache = await data();
    if (cache.length > 0) {
      for (const obj of cache) {
        await Countries.create({
          name: obj.name,
          image: obj.image,
          continent: obj.continent,
          subregion: obj.subregion,
          area: obj.area,
          population: obj.population,
        });
      }
      console.log("created");
    } else {
      console.log("No data to create");
    }
  } catch (error) {
    console.log("Failed to get data:", error);
  }
};

module.exports = createdAtDb;