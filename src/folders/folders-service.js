const FoldersService = {
  getAllFolders(knex) {
    return knex('folders').select('*');
  },
  insertFolder(knex, values) {
    return knex('folders')
      .insert(values)
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
  getFolderById(knex, id) {
    return knex('folders').where('id', id).first();
  }
};
module.exports = FoldersService;
