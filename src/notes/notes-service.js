const NotesService = {
  getAllNotes(knex) {
    return knex('notes').select('*');
  },
  getNotesByFolderId(knex, folderId) {
    return knex('notes').where('folderid', folderId);
  },
  getNotesById(knex, id) {
    return knex('notes').where('id', id).first();
  },
  insertNote(knex, note) {
    return knex('notes')
      .insert(note)
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
  deleteNote(knex, id) {
    return knex('notes').where('id', id).delete();
  }
};
module.exports = NotesService;
