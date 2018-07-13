const request = require("request");

var geocodeAddress = (address) => {
    return new Promise ((resolve,reject) =>{

        let encodedAddress = encodeURIComponent(address);
        console.log(encodedAddress);
        
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        },
        (error, response, body) => {
            if (error) {
                reject('Unable to fetch from the servers');
            } else if (body.status === "OK") {
                console.log(body.status);
                resolve({
                    address : body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
            
        });
    })
        
    }
    
    geocodeAddress('11111').then((location) => {
    console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
    console.log(errorMessage);
})