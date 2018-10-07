'use strict'

const requestPromise = require('request-promise');

async function run() {
    
    const lukesDetailBody = await requestPromise('http://swapi.co/api/people/1')
    const vehiclePromises = JSON.parse(lukesDetailBody).vehicles.map(requestPromise)
    const vehiclesDetail = await Promise.all(vehiclePromises)

    vehiclesDetail.map(vehicle => JSON.parse(vehicle).name).forEach(vehicleName => console.log(vehicleName))
}

run().catch(error => console.log(`Incorrect status while getting data : ${error.statusCode}`))