const request = require('request')
 
 const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=80a1a271719f36c620512f827283bca8&query=' + latitude + ',' + longitude;
    request({ url, json:true}, (error, { body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
            body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out and it feels like ' + 
              body.current.feelslike + ' degrees.'

            )
        }
    })
}

module.exports = forecast