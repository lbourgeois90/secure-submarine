const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
     console.log(req.user.clearance_level);
     let clearance_level = req.user.clearance_level;
    
    pool.query(`SELECT "content" FROM "secret" WHERE "secrecy_level" <= ${clearance_level};`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;