const dm = require('./distance-matrix.js');

/* dm.getEstimatedTravelingTime('Paseo San Agustin 78, Lomas Verdes', 'Montes Urales 424, Lomas de Chapultepec', 'now', 'best_guess').then((result) => {
    console.log('Duration:', result);
}, (error) => {
    console.log('Error ocurred:', error);
}); */

dm.getEstimatedTravelingTimeMultiple(['Paseo San Agustin 78, Lomas Verdes', 'Valencia 54, Insurgentes Mixcoac'], ['Montes Urales 424, Lomas de Chapultepec'], 'now', 'best_guess').then((result) => {
    console.log('Result:', JSON.stringify(result, undefined, 3));
}, (error) => {
    console.log('Error ocurred:', error);
});
