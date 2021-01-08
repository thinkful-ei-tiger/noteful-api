const express = require('express');
const FoldersService = require('../folders/folders-service');
const NotesService = require('./notes-service');
const notesRouter = express.Router();

notesRouter
  .route('/')
  .get((req, res, next) => {
    NotesService.getAllNotes(req.app.get('db'))
      .then((notes) => {
        if (notes) {
          res.send(notes);
        }
      })
      .catch(next);
  })
  .post((req, res, next) => {
    const { name, content, folderid } = req.body;
    const requiredFields = { name, folderid };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ error: `${key} is required` });
      }
    }
    FoldersService.getFolderById(req.app.get('db'), folderid).then((folder) => {
      if (!folder) {
        return res.status(400).json('Insert a valid FolderId');
      }
    });
    if (content) requiredFields.content = content;
    NotesService.insertNote(req.app.get('db'), requiredFields)
      .then((note) => {
        if (note) {
          res.status(201).location('api/notes/').json(note);
        }
      })
      .catch(next);
  });

notesRouter.route('/:id').get((req, res, next) => {
  const { id } = req.params;

  NotesService.getNotesById(req.app.get('db'), id)
    .then((note) => {
      if (!note) {
        return res.status(404).json({ error: `note doestn't exists` });
      }
      res.json(note);
    })
    .catch(next);
});

notesRouter.route('/folders/:id').get((req, res, next) => {
  const { id } = req.params;

  NotesService.getNotesByFolderId(req.app.get('db'), id)
    .then((note) => {
      if (!note) {
        return res.status(404).json({ error: `Not note found` });
      }
      res.send(note);
    })
    .catch(next);
});

module.exports = notesRouter;
