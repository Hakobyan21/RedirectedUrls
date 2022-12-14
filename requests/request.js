const async = require('async');
const fetch = require( 'node-fetch' );
const { parentPort, workerData } = require('worker_threads');
const axios = require('axios');


module.exports = class RequestFetch{
  static async getFetch(domains){
  }
}






// //  async.parallel([
// //     function(callback) {
// //         setTimeout(function() {
// //             const fetch1 = fetch('twitter.com', {
// //     method: 'HEAD',
// //     mode: 'no-cors'
// //   })
// //   .then((response) => {
// //     console.log("connected one");
// //   }, (err) => {
// //     console.log("InValid url"); // (currently fetch failed)
// //   })

          
// //           callback(null, 3);
// //         }, 0);
// //       },
// // ],

// // function(err, results) {
// // //   
  
// // });

