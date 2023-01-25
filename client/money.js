/**
 * @param {integer} ammount 
 * @param {string} account
 * @param {boolean} isAddition 
 */
function updateMoney(ammount, account, isAddition) {
    const player = exports.altasia.getCurrentPlayer();
    if (isAddition) {
        player.accounts[account] += ammount;
    } else {
        player.accounts[account] -= ammount;
    }
    exports.altasia.setPlayerAccounts(player.accounts);

    SendNuiMessage(JSON.stringify({
        type: 'moneyUpdate',
        player: player
    }));
}

onNet('altasia:updateMoney', (ammount, account, isAddition) => {
    updateMoney(ammount, account, isAddition)
})

exports('initMoney', (player) => {
    initPaycheck()
})

exports('updateMoney', updateMoney);

function initPaycheck() {
    setTick(async () => {
        await exports.altasia.delay(300000)
        updateMoney(5000, 'bank', true)
    })
}