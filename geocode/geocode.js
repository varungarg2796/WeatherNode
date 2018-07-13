
const request = require("request");

var geocodeAddress = (address , callback) => {
    let encodedAddress = encodeURIComponent(address);
    console.log(encodedAddress);

    request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        },
        (error, response, body) => {
            //console.log('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //console.log(JSON.stringify(body,undefined,2)); // Print the HTML for the Google homepage.

            if (error) {
                callback('Unable to fetch from the servers');
                callback('Could not find any results.')
            } else if (body.status === "OK") {
                console.log(body.status);
                
                callback (undefined , {
                    address : body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }

        });
}



module.exports = {
    geocodeAddress
}