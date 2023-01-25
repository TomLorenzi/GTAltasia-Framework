const MySQL = exports.oxmysql;
const spawnPos = [-1045.23, -2750.55, 20.36]; //airport

const PlayerList = {};

onNet('altasia:connectedPlayer', async () => {
    const playerId = source
    const identifier = getSteamIdentifier(playerId)
    const result = await MySQL.query_async('SELECT * from user WHERE identifier = ?', [identifier]);
    let player = {};
    if (!result.length) {
        player.position = {
            x: spawnPos[0],
            y: spawnPos[1],
            z: spawnPos[2],
            heading: 10
        }
        await MySQL.insert('INSERT INTO user (identifier) VALUES (?)', [identifier])
    } else {
        player = result[0];
    }

    emitNet('altasia:playerIsReady', playerId, player)
});

onNet('altasia:syncPlayer', (player) => {
    const playerId = source;
    const identifier = GetPlayerIdentifier(playerId);
    MySQL.update(
        'UPDATE user SET name = ?, position = ?, accounts = ? WHERE identifier = ?',
        [player.name, JSON.stringify(player.coords), JSON.stringify(player.accounts), identifier]
    );
});

on('playerDropped', (reason) => {
    const player = source
    delete PlayerList[player]
})

on('playerConnecting', (name, setKickReason, deferrals) => {
    deferrals.defer()

    const player = global.source;

    setTimeout(() => {
        deferrals.update(`Bonjour ${name}. Vérification de votre ID Steam.`)

        const steamIdentifier = getSteamIdentifier(player);

        // pretend to be a wait
        setTimeout(() => {
            if (steamIdentifier === null) {
                deferrals.done("Vous n'êtes pas connecté à Steam.")
            } else {
                deferrals.done()
                PlayerList[player] = steamIdentifier
            }
        }, 0)
    }, 0)
})

function getSteamIdentifier(player) {
    for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
        const identifier = GetPlayerIdentifier(player, i);

        if (identifier.includes('steam:')) {
            return identifier;
        }
    }

    return null;
}

//Paycheck
/*setTick(async () => {
    for (const player of Object.keys(PlayerList)) {
        emitNet('altasia:updateMoney', player, 5000, 'bank', true)
    }
    await exports.altasia.delay(300000)
})*/