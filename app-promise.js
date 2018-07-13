const yargs = require("yargs");
const axios = require("axios");

const argv = yargs.
    option({
        a:{
            demand: true,
            alias: 'address',
            describe: 'address to fetch server',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

var encodedAddress = encodeURIComponent(argv.a);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeURL).then((response)=>{ // first promise (get location)
    if(response.data.status ==='ZERO_RESULTS'){
        throw new Error('unable to find new results')
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var address = response.data.results[0].formatted_address;
    console.log(`In ${address},`);
    var weatherURL = `https://api.darksky.net/forecast/28dff52ec36a7d2c13d7f382b8eca010/${lat},${lng}`
    return axios.get(weatherURL) //second promise (get weather from location)
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It is currently ${temperature} but it feels like ${apparentTemperature}`)
}).catch((e)=>{
    if(e.code==="ENOTFOUND"){
        console.log('unable to connect to API servers')
    } else {
        console.log(e.message);
    }
})