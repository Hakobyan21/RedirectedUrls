//NPM MODULES
const { option } = require("../../connectSQL");
const knex = require('knex')(option);
const RequestFetch = require("../../requests/request");
const {checkUrls} = require("../service/url.service")



let data = [];
module.exports = class Data {
  static async getUrls(offset, limit) {

    knex.from('links').select('domain').limit(limit).offset(offset)
      .then((rows) => {
        
        for (let row of rows) {
          return row
        }


const psqldata = checkUrls(row)
})
.catch((err) => { console.log(err); throw err; })
.finally(() => {

knex.destroy();
});
}
}



