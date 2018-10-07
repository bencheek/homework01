"use strict"

const request = require('request');

function validateResponse(responseName, error, response) {
  if (error) {
    throw `Error while getting ${responseName} : ${error}`
  }

  if (response.statusCode != 200) {
    throw `Incorrect status while getting ${responseName} : ${response.statusCode}`
  }
}

function getVehicleName(vehicleUrl) {
  request(vehicleUrl, (error, response, vehicleResponseBody) => {
    validateResponse("Vehicle's Detail", error, response)
    console.log(JSON.parse(vehicleResponseBody).name)
  })
}

function processLukeResponse(error, response, lukesResponseBody) {
  
  validateResponse("Lukes's Detail", error, response)
  JSON.parse(lukesResponseBody).vehicles.map(getVehicleName)
  
}

request('http://swapi.co/api/people/1', processLukeResponse)

   

