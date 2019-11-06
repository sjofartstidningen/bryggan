module.exports = {
  client: {
    service: {
      name: 'dropbox',
      localSchemaFile: './schema.json',
    },
    excludes: ['src/functions/**/*'],
  },
};
