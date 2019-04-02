const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/044390138531d42acdfd322769c97890/'+latitude+','+longitude+'?units=si&lang=pl'
    request({url: url, json: true},(error, response) =>{
        if (error) {
            callback('Unable to connect wheather services', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: response.body.currently.summary,
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability
            })
        }
    })

}

module.exports = forecast