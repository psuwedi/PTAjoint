const express = require('express');
const router = express.Router();

const File = require('../../models/File');

const  appRoot = require('app-root-path');

router.post('/upload', (req, res, next) => {
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    uploadFile.mv(
      `${appRoot}/client/public/uploads/${fileName}`,
      function (err) {
        if (err) {
          return res.status(500).send(err)
        }
      },
    );

    const newFile = new File({
        name: fileName,
        path: `${appRoot}/client/public/uploads/${fileName}`,
    });

    // Save newly uploaded file to the DB
    newFile.save()
        .then( file => res.json(file))
        .catch(err => console.log("Error saving file, please try again"));
  })
  

  router.get('/', (req, res) => {
    File.find()
    .sort({ createdAt: -1 })
    .then( files => res.json(files))
});
 // end of get files endpoint 

  module.exports = router;