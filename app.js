const dm = require('./distance-matrix');
var schedule = require('node-schedule');

const origins = ['Paseo San Agustin 78, Lomas Verdes', 'Valencia 54, Insurgentes Mixcoac'];
const destinations = ['Montes Urales 424, Lomas de Chapultepec'];

var job = schedule.scheduleJob('20 9 * * 1,2,3,4,5', () => {
    dm.getEstimatedTravelingTimeMultiple(origins, destinations, 'now', 'best_guess').then((result) => {
        console.log('Result:', JSON.stringify(result, undefined, 3));
    }, (error) => {
        console.log('Error ocurred:', error);
    });
});
