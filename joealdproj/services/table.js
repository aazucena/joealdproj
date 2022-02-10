const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, DOB FROM test_table LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(testTable){
  const result = await db.query(
    `INSERT INTO test_table 
    (name, DOB) 
    VALUES 
    (${testTable.name}, ${testTable.DOB})`
  );

  let message = 'Error in creating row';

  if (result.affectedRows) {
    message = 'table row created successfully';
  }

  return {message};
}

async function update(id, testTable){
  const result = await db.query(
    `UPDATE test_table 
    SET name="${testTable.name}", DOB=${testTable.DOB} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating table';

  if (result.affectedRows) {
    message = 'table updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM test_table WHERE id=${id}`
  );

  let message = 'Error in deleting row';

  if (result.affectedRows) {
    message = 'row deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
