const geocode = require("./geocode/geocode.js")
const weather = require("./weather/weather.js")

const yargs = require("yargs");


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

geocode.geocodeAddress(argv.a , (errorMessage , results) => {
    if(errorMessage){
        console.log(errorMessage)
    } else {
        console.log("Address:", results.address)
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) =>{
            if(errorMessage){
                console.log(errorMessage)
            } else {
                console.log(`It is currently ${weatherResults.temperature} but it feels like ${weatherResults.apparentTemperature}`)
            }
        })        
    }
})


