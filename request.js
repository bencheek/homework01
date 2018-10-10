"use strict"

const request = require("request");

function validateResponse(responseName, error, response) {
  if (error) {
    throw Error(`Error while getting ${responseName} : ${error}`)
  }

  if (response.statusCode !== 200) {
    throw Error(`Incorrect status while getting ${responseName} : ${response.statusCode}`)
  }
}

function getVehicleName(vehicleUrl) {
  request({url: vehicleUrl, json: true}, (error, response, vehicleResponseBody) => {
    validateResponse("Vehicle's Detail", error, response)
    console.log(vehicleResponseBody.name)
  })
}

function processLukeResponse(error, response, lukesResponseBody) {
  
  validateResponse("Lukes's Detail", error, response)
  lukesResponseBody.vehicles.map(getVehicleName)
  
}

request({ url: "http://swapi.co/api/people/1", json: true }, processLukeResponse)

   

