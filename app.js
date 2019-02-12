const dm = require('./distance-matrix.js');
var schedule = require('node-schedule');
 
/* dm.getEstimatedTravelingTime('Paseo San Agustin 78, Lomas Verdes', 'Montes Urales 424, Lomas de Chapultepec', 'now', 'best_guess').then((result) => {
    console.log('Duration:', result);
}, (error) => {
    console.log('Error ocurred:', error);
}); */

/* dm.getEstimatedTravelingTimeMultiple(['Paseo San Agustin 78, Lomas Verdes', 'Valencia 54, Insurgentes Mixcoac'], ['Montes Urales 424, Lomas de Chapultepec'], 'now', 'best_guess').then((result) => {
    console.log('Result:', JSON.stringify(result, undefined, 3));
}, (error) => {
    console.log('Error ocurred:', error);
}); */

/**
 * Cron node-schedule
 * *(second [optional]) *(minute) *(hour) *(day of the month) *(month of the year) *(day of the week)
 * Run when the minute is 42: * 42 * * * *
*/
var job = schedule.scheduleJob('20 9 * * 1,2,3,4,5', () => {
    dm.getEstimatedTravelingTimeMultiple(['Paseo San Agustin 78, Lomas Verdes', 'Valencia 54, Insurgentes Mixcoac'], ['Montes Urales 424, Lomas de Chapultepec'], 'now', 'best_guess').then((result) => {
        console.log('Result:', JSON.stringify(result, undefined, 3));
    }, (error) => {
        console.log('Error ocurred:', error);
    });
});
