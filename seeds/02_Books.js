exports.seed = function seed(knex, Promise) {
  const tableName = 'books';

  const rows = [
    {
      author: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
      publisher: 'Columbidae',
      title: 'Pigeon',
      picture_url: 'http://pngimg.com/upload/pigeon_PNG3423.png',
      guid: '4c8d84f1-9e41-4e78-a254-0a5680cd19d5',
      isPublic: true,
    },

    {
      author: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
      publisher: 'Zenaida',
      title: 'Mourning dove',
      picture_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mourning_Dove_2006.jpg/220px-Mourning_Dove_2006.jpg',
      guid: 'ddb8a136-6df4-4cf3-98c6-d29b9da4fbc6',
      isPublic: false,
    }
  ];

  return knex(tableName)
    .del()
    .then(() => knex.insert(rows).into(tableName));
};