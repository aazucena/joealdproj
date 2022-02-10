const express = require('express');
const router = express.Router();
const table = require('../services/table');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await table.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting table `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await table.create(req.body));
  } catch (err) {
    console.error(`Error while creating table`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await table.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating table`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await table.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting row`, err.message);
    next(err);
  }
});

module.exports = router;

