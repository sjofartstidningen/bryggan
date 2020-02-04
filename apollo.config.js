module.exports = {
  client: {
    service: {
      name: 'bryggan',
      url: 'http://localhost:9000/graphql',
    },
    excludes: ['src/functions/**/*'],
  },
};
