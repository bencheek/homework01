"use strict"

const requestPromise = require("request-promise");

async function logVehicleNamesForPersonId(personId) {
    
    const personDetailBody = await requestPromise({url: "http://swapi.co/api/people/".concat(personId), json: true})
    const vehiclePromises = personDetailBody.vehicles.map(vehicleUrl => requestPromise({url: vehicleUrl, json: true}))
    const vehiclesDetail = await Promise.all(vehiclePromises)

    vehiclesDetail.forEach(vehicle => console.log(vehicle.name))
}

logVehicleNamesForPersonId(1).catch(error => console.error(`Incorrect status while getting data : ${error.message}`))