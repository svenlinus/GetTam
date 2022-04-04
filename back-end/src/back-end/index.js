const express = require('express');
const app = express();
const web = require('./web');
const statusCodes = require('./web/status');

app.use(express.json());

async function deviceBlacklisted(ip, user) {
    const blacklist = await web.getBlacklist();
    if (!blacklist) return;

    return blacklist.includes(ip) || blacklist.includes(user);
}

function getRequestIP(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

app.get('/blacklist', async(req, res) => {
    try {
        const blacklist = await web.getBlacklist();

        if (!blacklist) {
            console.error('The blacklist does not exist!');
            res.status(400).end('Unable to get the blacklist');

            return;
        }

        res.status(200).end(blacklist);
    } catch (err) {
        console.error(`An error occured while trying to get the blacklist: ${err}`);
        res.status(400).end('Unable to get the blacklist');
    }
});

app.get('/Leaderboard', async(req, res) => {
    try {
        const leaderboard = await web.getLeaderboard();

        if (!leaderboard) {
            console.error('The leaderboard does not exist!');
            res.status(400).end('Unable to get the leaderboard');

            return;
        }

        res.status(200).end(leaderboard);
    } catch (err) {
        console.error(`An error occured while trying to get the leaderboard: ${err}`);
        res.status(400).end('Unable to get the leaderboard');
    }
});

app.post('/Leaderboard', async(req, res) => {
    try {
        const body = req.body;

        if (
            !body ||
            !body.user ||
            !body.score
        ) {
            console.log(`Bad request body sent: ${body}`);
            res.status(400).end('Bad request body');

            return;
        }

        if (await deviceBlacklisted(getRequestIP(req), body.user)) {
            res.status(403).end('Blacklisted');
    
            return;
        }

        const status = web.updateLeaderboard(body.user, body.score);

        if (status == statusCodes.OKAY) res.status(200).end();
        else if (status == statusCodes.BAD_DATA) res.status(400).end('Bad data');
        else if (status == statusCodes.UNAUTHORIZED) res.status(403).end('Unauthorized');
        else if (status == statusCodes.FAILED) res.status(400).end('Unable to update the leaderboard.');
    } catch (err) {
        console.error(`An error occured while trying to update the leaderboard: ${err}`);
        res.status(400).end('Unable to update the leaderboard');
    }
});

app.get('/TotalGamesPlayed', (req, res) => {
    try {
        const totalGamesPlayed = web.getTotalGamesPlayed();

        if (!totalGamesPlayed) {
            console.error('The total games played does not exist!');
            res.status(400).end('Unable to get the total games played');

            return;
        }

        res.status(200).end(totalGamesPlayed);
    } catch (err) {
        console.error(`An error occured while trying to get the total games played: ${err}`);
        res.status(400).end('Unable to get the total games played');
    }
});
  
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`GetTam back-end running on port ${port}`);
});