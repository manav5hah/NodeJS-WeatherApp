const request = require('request')
const geocode = (address, callback)=>{
    const uri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFuYWtlMTMwOCIsImEiOiJjano4MDhkODQwb3lnM21wYTcwc215YmozIn0.czMyt3VPBeONaS1nbzq0Ig&limit=1'
    console.log(uri)
    request({ uri:uri, json:true }, (error, response) => {
            if(error)
            {
                callback(error, undefined)
            }
            else if(response.body.features.length === 0){
                callback('Unable to find the location!', undefined)
            }
            else{
                callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    place_name: response.body.features[0].place_name
                })
            }
        })
} 
module.exports = geocode