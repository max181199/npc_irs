var {
  get: get_db,
} = require('../../controllers').book

async function get({ startRow, endRow, sort }){
  return await get_db({
    limit: endRow - startRow,
    offset: startRow,
    sortBy:   sort[0] ? sort[0].colId : "id",
    sortDir:  sort[0] ? sort[0].sort : "ASC"
  })
}

module.exports.get = get