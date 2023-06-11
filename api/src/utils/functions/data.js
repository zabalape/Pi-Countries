const {Countries} = require("../../db");
const dataApi = require("./apiData");
const data = async () => {
    const data0 = await dataApi();
    const filteredObj = await data0.map((obj) => ({
        name : obj.name.common,
        image: obj.flags.svg,
        continent: obj.continents[0],
        subregion: obj.subregion || obj.continents[0],
        area: obj.area,
        population: obj.population
    }) );
    return filteredObj
   

}

module.exports=data;