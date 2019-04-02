const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/044390138531d42acdfd322769c97890/'+latitude+','+longitude+'?units=si&lang=pl'
    request({url, json: true},(error, {body}) =>{
        if (error) {
            callback('Unable to connect wheather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
            // callback(undefined, {
            //     summary: response.body.currently.summary,
            //     temperature: response.body.currently.temperature,
            //     precipProbability: response.body.currently.precipProbability
            // })
        }
    })

}

module.exports = forecast