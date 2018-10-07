'use strict'

const requestPromise = require('request-promise');

requestPromise('http://swapi.co/api/people/1')
.then(lukeResponseBody => {

    const vehiclePromises = JSON.parse(lukeResponseBody).vehicles.map(requestPromise)

    Promise.all(vehiclePromises)
    .then(vehicleResponseBodies => {

        vehicleResponseBodies.map(vehicleResponseBody => JSON.parse(vehicleResponseBody).name)
        .forEach(vehicleName => console.log(vehicleName))
    
    }).catch(error => { 
        console.log(`Exception while getting Luke's vehicles ${error}`)
    })

}).catch(error => {
    console.log(`Exception while getting Luke's details ${error}`);
})