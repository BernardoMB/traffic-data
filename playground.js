var parser = require('cron-parser');

/**
 * *    *    *    *    *    *
 * ┬    ┬    ┬    ┬    ┬    ┬
 * │    │    │    │    │    |
 * │    │    │    │    │    └ day of week (0 - 7, 0 or 7 is Sun)
 * │    │    │    │    └───── month of the year (1 - 12)
 * │    │    │    └────────── day of month (1 - 31)
 * │    │    └─────────────── hour (0 - 23)
 * │    └──────────────────── minute (0 - 59)
 * └───────────────────────── second (0 - 59, optional)
 * 
 * Run every day of the working week at 9:20: 20 9 * * 1,2,3,4,5
 * Run when the minute is 42: * 42 * * * *
 * Run every second: * * * * * *
 * Run every time the second is 5: 5 * * * * *
*/

try {
  var interval = parser.parseExpression('5 * * * * *');
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
