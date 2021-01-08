const express = require('express');
const FoldersService = require('./folders-service');
const foldersRouter = express.Router();

foldersRouter
  .route('/')
  .get((req, res, next) => {
    FoldersService.getAllFolders(req.app.get('db'))
      .then((folders) => {
        if (folders) {
          res.send(folders);
        }
      })
      .catch(next);
  })
  .post((req, res, next) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'A name is required' });
    }
    FoldersService.insertFolder(req.app.get('db'), { name })
      .then((folder) => {
        if (folder) {
          res.status(201).location('api/folders/').json(folder);
        }
      })
      .catch(next);
  });
module.exports = foldersRouter;
