const request = require('request')
const forecast = (coord, callback) => {
    const uri = 'https://api.darksky.net/forecast/741b6f0c182e5325df6ccbc1e8f7f4bb/'+coord.latitude+','+coord.longitude+'?units=auto'
    request({uri: uri, json:true}, (error, response) =>{
        if(error){
            callback('Unable to connect to the weather service!', undefined)
                }
                else if(response.body.error){
                    callback('Unable to fetch the location!', undefined)
                }
                else{
                    callback(undefined, response)
                }
    })
}

module.exports = forecast