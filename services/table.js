import query from './db.js'
import config from '../config.js'
import { emptyOrRows, getOffset } from '../helper.js'

export async function getMultiple(page = 1){
  const offset = getOffset(page, config.listPerPage);
  const rows = await query(
    `SELECT id, name, DOB FROM test_table LIMIT ${offset},${config.listPerPage}`
  );
  const data = emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

export async function create(testTable){
  const result = await query(
    `INSERT INTO test_table (name, DOB) VALUES (${testTable.name}, ${testTable.DOB})`
  );

  let message = 'Error in creating row';

  if (result.affectedRows) {
    message = 'table row created successfully';
  }

  return {message};
}

export async function update(id, testTable){
  const result = await query(
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

export async function remove(id){
  const result = await query(
    `DELETE FROM test_table WHERE id=${id}`
  );

  let message = 'Error in deleting row';

  if (result.affectedRows) {
    message = 'row deleted successfully';
  }

  return {message};
}

