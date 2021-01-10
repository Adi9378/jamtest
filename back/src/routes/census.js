const express = require('express');
const router = express.Router();
const censusCtrl = require('../controllers/census');
  
router.get('/column/total/:name', censusCtrl.columnTotalRow);
router.get('/column/:name', censusCtrl.columnData);
router.get('/columns', censusCtrl.columnList);

module.exports = router;


