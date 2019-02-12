var parser = require('cron-parser');

/**
 * *    *    *    *    *    *
 * ┬    ┬    ┬    ┬    ┬    ┬
 * │    │    │    │    │    |
 * │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 * │    │    │    │    └───── month (1 - 12)
 * │    │    │    └────────── day of month (1 - 31)
 * │    │    └─────────────── hour (0 - 23)
 * │    └──────────────────── minute (0 - 59)
 * └───────────────────────── second (0 - 59, optional)
*/

try {
  //var interval = parser.parseExpression('20 9 * * 1,2,3,4,5'); // Every day of the working week at 9:20
  //var interval = parser.parseExpression('* * * * * *'); // Every second
  var interval = parser.parseExpression('5 * * * * *'); // Every time second is 5
  console.log('Date: ', interval.next().toString());
  console.log('Date: ', interval.next().toString());
  console.log('Date: ', interval.prev().toString());
  console.log('Date: ', interval.prev().toString());
  console.log('Date: ', interval.next().toString());
  console.log('Date: ', interval.next().toString());
  console.log('Date: ', interval.next().toString());
  console.log('Date: ', interval.next().toString());
  console.log('Date: ', interval.next().toString());
} catch (err) {
  console.log('Error: ' + err.message);
}