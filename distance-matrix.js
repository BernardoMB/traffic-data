const request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  

const csvWriter = createCsvWriter({  
  path: 'C:\\out.csv',
  header: [
    {id: 'origin', title: 'Origin'},
    {id: 'destination', title: 'Destination'},
    {id: 'duration', title: 'Duration'},
    {id: 'distance', title: 'Distance'},
    {id: 'time', title: 'Time'}
  ],
  append: true
});

const apiKey = 'AIzaSyAWEu5iJDVTWdFJ4jPz2sMZQx1Kq5Q5PAU';
const outputFormat = 'json';

var getEstimatedTravelingTime = (startingPointAddress, destinationAddress, departureTime, trafficModel) => {
    // Note: URLs must be properly encoded.
    const origins = encodeURIComponent(startingPointAddress); // The starting point for calculating travel distance and time.
    const destinations =  encodeURIComponent(destinationAddress); // Location to use as the finishing point for calculating travel distance and time.
    const departure_time = encodeURIComponent(departureTime); // now or Seconds since 1970
    const traffic_model = encodeURIComponent(trafficModel); // best_guess, pessimistic, optimistic
    const parameters= `origins=${origins}&destinations=${destinations}&departure_time=${departure_time}&traffic_model=${traffic_model}&key=${apiKey}`;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/${outputFormat}?${parameters}`;
    const requestObject = {
        url,
        json: true
    };
    return new Promise((resolve, reject) => {
        request(requestObject, (error, response, body) => {
            if (error) {
                console.log(JSON.stringify(error, undefined, 3));
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                const duration = body.rows[0].elements[0].duration.value;
                resolve(duration);
            }
        });
    });
};

var getEstimatedTravelingTimeMultiple = (startingPointAddresses, destinationAddresses, departureTime, trafficModel) => {
    let origins = '';
    startingPointAddresses.forEach(address => {
        const encodedAddress = encodeURIComponent(address);
        origins = `${origins}${encodedAddress}|`;
    });
    let destinations = '';
    destinationAddresses.forEach(address => {
        const encodedAddress = encodeURIComponent(address);
        destinations = `${destinations}${encodedAddress}|`;
    });
    const departure_time = encodeURIComponent(departureTime);
    const traffic_model = encodeURIComponent(trafficModel);
    const parameters= `origins=${origins}&destinations=${destinations}&departure_time=${departure_time}&traffic_model=${traffic_model}&key=${apiKey}`;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/${outputFormat}?${parameters}`;
    const requestObject = {
        url,
        json: true
    };
    return new Promise((resolve, reject) => {
        request(requestObject, (error, response, body) => {
            if (error) {
                console.log(JSON.stringify(error, undefined, 3));
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                const results = [];
                for (var i = 0; i < body.rows.length; i++) {
                    const origin = startingPointAddresses[i];
                    for (var j = 0; j < body.rows[i].elements.length; j++) {
                        const destination = destinationAddresses[j];
                        const duration = body.rows[i].elements[j].duration.value;
                        const distance = body.rows[i].elements[j].distance.value;
                        const time = new Date();
                        const entry = {
                            origin,
                            destination,
                            duration,
                            distance,
                            time
                        }
                        results.push(entry);
                    }
                }
                csvWriter.writeRecords(results).then(() => {
                    console.log('The CSV file was written successfully')
                }, (error) => {
                    console.log(error);
                });
                resolve(results);
            }
        });
    });
};

module.exports = {
    getEstimatedTravelingTime,
    getEstimatedTravelingTimeMultiple
};
