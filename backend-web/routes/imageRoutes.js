const cloudinary = require('cloudinary');
const router = require('express').Router();
require('dotenv').config();

APIKEY = 653653665699681

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key: process.APIKEY,
  api_secret: process.H2AjLlIB0BqFJqdffYMWBS2vdTE
})

router.delete('/:public_id', async(req, res)=> {
  const {public_id} = req.params;
  try {
      await cloudinary.uploader.destroy(public_id);
      res.status(200).send();
  } catch (e) {
      res.status(400).send(e.message)
  }
})

module.exports = router;
// CLOUNAME = dmeso1jk6

// API SECRET = H2AjLlIB0BqFJqdffYMWBS2vdTE