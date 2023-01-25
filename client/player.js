const Player = {
    id: null,
    name: null,
    identifier: null,
    position: {},
    accounts: {},
    isPlayerAlive: true
};

exports('getCurrentPlayer', () => {
    return Player;
});

exports('setPlayer', (player) => {
    Player.id = player.id;
    Player.name = player.name;
    Player.identifier = player.identifier;
    Player.position = JSON.parse(player.position);
    Player.accounts = JSON.parse(player.accounts);
});

exports('startPlayerSync', () => {
    setTick(async () => {
        exports.altasia.syncPlayer();
        await exports.altasia.delay(30000)
    });
});

exports('syncPlayer', () => {
    const playerPed = PlayerPedId()
    const playerCoords = GetEntityCoords(playerPed);
    const playerHeading = GetEntityHeading(playerPed)
    const coords = {
        x: Math.round(playerCoords[0] * 100) / 100,
        y: Math.round(playerCoords[1] * 100) / 100,
        z: Math.round(playerCoords[2] * 100) / 100,
        heading: Math.round(playerHeading * 100) / 100
    }
    setCoords(coords)
    emitNet('altasia:syncPlayer', Player);
});

function setCoords(coords) {
    Player.coords = coords;
}
exports('setPlayerCoords', setCoords);

function setAccounts(accounts) {
    Player.accounts = accounts;
}
exports('setPlayerAccounts', setAccounts);

function setName(name) {
    Player.name = name;
}
exports('setPlayerName', setName);

function setIsPlayerAlive(isPlayerAlive) {
    Player.isPlayerAlive = isPlayerAlive;
}
exports('setIsPlayerAlive', setIsPlayerAlive);