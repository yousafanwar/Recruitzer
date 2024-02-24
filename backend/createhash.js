import bcrypt from 'bcrypt';
import config from './config.js';

bcrypt.hash('pass', config.saltRounds, async function (err, hash) {
    console.log(hash);
});