"use strict"

const requestPromise = require("request-promise");

requestPromise({url: "http://swapi.co/api/people/1", json: true})
.then(lukeResponseBody => {

    const vehiclePromises = lukeResponseBody.vehicles.map(vehicleUrl => requestPromise({url : vehicleUrl, json: true}))

    Promise.all(vehiclePromises)
    .then(vehicleResponseBodies => {
        
        vehicleResponseBodies.map(vehicleResponseBody => vehicleResponseBody.name)
        .forEach(vehicleName => console.log(vehicleName))
    
    }).catch(error => { 
        console.error(`Exception while getting Luke's vehicles ${error.message}`)
    })

}).catch(error => {
    console.error(`Exception while getting Luke's details ${error.message}`);
})