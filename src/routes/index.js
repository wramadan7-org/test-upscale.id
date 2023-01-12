const { Router } = require('express');
const taskRoute = require('./v1/taskRoute');

const router = Router();

const defaultRoute = [
  {
    path: '/tasks',
    route: taskRoute,
  },
];

defaultRoute.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
