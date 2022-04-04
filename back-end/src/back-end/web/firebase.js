const { initializeApp } = require('firebase/app');
const { getDatabase, ref, update, get} = require('firebase/database');
const statusCodes = require('./status');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'get-tam.firebaseapp.com',
    projectId: 'get-tam',
    storageBucket: 'get-tam.appspot.com',
    messagingSenderId: '8679519646',
    appId: '1:8679519646:web:85204f21b7074c3bd1528f',
    measurementId: 'G-ZQYL5YN5TD'
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const blacklistRef = ref(database, 'blacklist');
const leaderboardRef = ref(database, 'Leaderboard');
const totalGamesPlayedRef = ref(database, 'TotalGamesPlayed');

async function getBlacklist() {
    const blacklist = await get(blacklistRef);
    if (!blacklist.exists()) return;

    return blacklist.val();
}

async function getLeaderboard() {
    const leaderboard = await get(leaderboardRef);
    if (!leaderboard.exists()) return;

    return leaderboard.val();
}

async function getTotalGamesPlayed() {
    const totalGamesPlayed = await get(totalGamesPlayedRef);
    if (!totalGamesPlayed.exists()) throw('TotalGamesPlayed does not exist.');

    return totalGamesPlayed.val();
}

function updateLeaderboard(user, score) { // TODO: Check if the new score deviates from the average by too much
    if (
        // Most of this is handled by the firebase back-end rules

        typeof(score) != 'number' ||
        score < 0 ||
        score === 0 ||
        score >= Infinity ||
        // All sorts of invalid number checks
        isNaN(score) || 
        score !== score ||
        score - 1 === score
    ) return statusCodes.BAD_DATA;

    let leaderboardUpdates = {};
    leaderboardUpdates[user] = score;

    try {
        update(leaderboardRef, leaderboardUpdates);
    } catch (err) {
        if (err.code == 'PERMISSION_DENIED') return statusCodes.UNAUTHORIZED;
        
        return statusCodes.FAILED;
    }

    return statusCodes.OKAY;
}

module.exports = { getBlacklist, getLeaderboard, updateLeaderboard, getTotalGamesPlayed };