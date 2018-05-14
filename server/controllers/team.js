const Team = require('../models/Team');

module.exports = {
    score: {
        post: (req, res) => {
            let teamData = req.body;
            
            Team.find({ name: teamData.name }).then(existingTeam => {
                /*if (existingUser.length === 0) {
                    User.create(userData)
                        .then(user => {
                            //TODO: check if user exist
                            res.status(200).send({ success: true, message: 'You successfully registered user now Please login' });
                        })
                        .catch(error => {
                            userData.error = error;
                            res.status(404).send({ error: error });
                        });

                    return;
                }*/

                res.status(403).send({ message: 'That username is already registered. Please pick another. '});
            })

        },
    }
};