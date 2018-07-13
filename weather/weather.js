const request = require('request');


var getWeather = (lat,lng,callback) => {
    request({
            url: `https://api.darksky.net/forecast/28dff52ec36a7d2c13d7f382b8eca010/${lat},${lng}`,
            json: true
        }, 
        (error, response, body) => {
            if(!error && response.statusCode === 200){
                callback(undefined ,{
                    temperature : body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                })
            } else {
                callback("unable to fetch weather");
            }
        }
    )
}

module.exports = {
    getWeather
}