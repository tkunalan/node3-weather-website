const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/d31d92f9cee934c563fe540c09d8d327/${latitude},${longitude}?lang=ta`

  // url: url
  request({url, json: true }, (error, { body }) => {
    if(error){
      callback("Can't connect to server!",undefined)
      // response.body.error
    }else if(body.error){
      //{
        //code: 400,
        //error: "Poorly formatted request",
      //}
      callback("Unable to find location!",undefined)

    }else{
      callback(undefined,{
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability
      })
    }
  })
}

module.exports = forecast
