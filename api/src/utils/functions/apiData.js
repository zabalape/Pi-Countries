const axios  = require("axios");


const dataApi = async () => {

    const data = await axios.get('http://localhost:5000/countries');
    const cache0 = data.data;
return cache0;

}

module.exports=dataApi;