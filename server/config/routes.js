const controllers = require('../controllers/index');

module.exports = (app) => {
    app.post('/team/score', controllers.team.score.post);
};