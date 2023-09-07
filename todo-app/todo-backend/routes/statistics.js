const {getAsync} = require('../redis')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let todos = await getAsync('key');
    res.send({
      "added_todos": todos
    });
  });
  
module.exports = router;
