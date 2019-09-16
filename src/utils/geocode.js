const request = require('request')

geoCode = (address, callback) => {
  //const uri = encodeURIComponent(address) // new jaffna => new%20jaffna
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGt1bmFsYW4iLCJhIjoiY2p6cGhpeWR0MHB0NDNjbW15NHo0bG5nNyJ9.K0XsQ3Gqv3ZHONyZeen35A&limit=1`

  request({url, json:true }, (error, {body}) => {
    if(error){
      callback('Unable to connect to location services',undefined)
    }else if(body.message){
      callback('Somthing went wrong!',undefined)
    }else if(body.features.length === 0){
      callback("Can't find location! Try again",undefined)
    } else {
      //callback(undefined,`${response.body.features[0].center[0]} ${response.body.features[0].center[1]}`)
      callback(undefined,{
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geoCode
