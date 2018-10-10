"use strict"

const requestPromise = require("request-promise");

async function run() {
    
    const lukesDetailBody = await requestPromise({url: "http://swapi.co/api/people/1", json: true})
    const vehiclePromises = lukesDetailBody.vehicles.map(vehicleUrl => requestPromise({url: vehicleUrl, json: true}))
    const vehiclesDetail = await Promise.all(vehiclePromises)

    vehiclesDetail.map(vehicle => vehicle.name).forEach(vehicleName => console.log(vehicleName))
}

run().catch(error => console.error(`Incorrect status while getting data : ${error.message}`))