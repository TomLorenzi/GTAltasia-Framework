window.onload = function (e) {
    window.addEventListener('message', (event) => {
        console.log(JSON.stringify(event.data))
        switch (event.data.type) {
            case 'moneyUpdate':
                const player = event.data.player;
                $('#cash').html(player.accounts.cash);
                $('#bank').html(player.accounts.bank);
                $('#black').html(player.accounts.black);
                break;
        }
    });
};