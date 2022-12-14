const path = require('path');
const { StaticPool } = require('node-worker-threads-pool');

const filePath = path.join(__dirname + '/urls.model.js');

const pool = new StaticPool({
  size: 3,
  task: filePath,
  workerData: 'workerData!'
});


for (let i = 0; i < 1000; i++) {
  (async () => {
    const startTime = new Date();
    // const res = await pool.exec({start: i * 75, end: (i + 1) * 75});
    const res = await pool.exec({start: 1, end: 600});
    const endTime = new Date();

    // console.log(`Request result: ${i}`, res);
    // console.log((endTime - startTime) / 1000 + 's');
  })();
}

