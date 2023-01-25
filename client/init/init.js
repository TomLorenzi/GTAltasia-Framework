const listHudToHide = {
    1: true, //WANTED_STARS
    2: false, //WEAPON_ICON
    3: true, //CASH
    4: true, //MP_CASH
    5: false, //MP_MESSAGE
    6: false, //VEHICLE_NAME
    7: false, //AREA_NAME
    8: true, //VEHICLE_CLASS
    9: false, //STREET_NAME
    10: false, //HELP_TEXT
    11: false, //FLOATING_HELP_TEXT_1
    12: false, //FLOATING_HELP_TEXT_2
    13: true, //CASH_CHANGE
    14: false, //RETICLE
    15: false, //SUBTITLE_TEXT
    16: false, //RADIO_STATIONS
    17: true, //SAVING_GAME
    18: false, //GAME_STREAM
    19: false, //WEAPON_WHEEL
    20: false, //WEAPON_WHEEL_STATS
    21: false, //HUD_COMPONENTS
    22: false, //HUD_WEAPONS
};

exports('initPlayer', (player) => {
    const position = JSON.parse(player.position);
    exports.spawnmanager.spawnPlayer({
        x: position.x,
        y: position.y,
        z: position.z,
        heading: position.heading,
        model: 'a_m_m_skater_01'
    }, () => {
        ShutdownLoadingScreen()
        ShutdownLoadingScreenNui()
        SetMaxWantedLevel(0);
        SetCanAttackFriendly(PlayerPedId(), true, true);
        NetworkSetFriendlyFireOption(true);
        SetPlayerHealthRechargeMultiplier(PlayerId(), 0.0)

        hideHud();
        
        RemoveAllPickupsOfType(0xDF711959) //carbine rifle
        RemoveAllPickupsOfType(0xF9AFB48F) //pistol
        RemoveAllPickupsOfType(0xA9355DCD) //pumpshotgun

        removeCops()

        DisablePlayerVehicleRewards(PlayerId())

        exports.altasia.initMoney(player);

        emit('chat:addMessage', {
            args: [
                'Bienvenue sur Altasia !'
            ]
        });
    });
});

function hideHud() {
    setTick(() => {
        for (const [hudKey, isHidden] of Object.entries(listHudToHide)) {
            if (isHidden) {
                HideHudComponentThisFrame(parseInt(hudKey, 10))
            }
        }
    })
}

function removeCops() {
    for (let i = 1; i <= 15; i++) {
        EnableDispatchService(i, false)
    }
    RemoveVehiclesFromGeneratorsInArea(335.2616 - 300.0, -1432.455 - 300.0, 46.51 - 300.0, 335.2616 + 300.0, -1432.455 + 300.0, 46.51 + 300.0) //central los santos
	RemoveVehiclesFromGeneratorsInArea(441.8465 - 500.0, -987.99 - 500.0, 30.68 -500.0, 441.8465 + 500.0, -987.99 + 500.0, 30.68 + 500.0) //mission row
	RemoveVehiclesFromGeneratorsInArea(316.79 - 300.0, -592.36 - 300.0, 43.28 - 300.0, 316.79 + 300.0, -592.36 + 300.0, 43.28 + 300.0) //pillbox
	RemoveVehiclesFromGeneratorsInArea(-2150.44 - 500.0, 3075.99 - 500.0, 32.8 - 500.0, -2150.44 + 500.0, -3075.99 + 500.0, 32.8 + 500.0) //Militay
	RemoveVehiclesFromGeneratorsInArea(-1108.35 - 300.0, 4920.64 - 300.0, 217.2 - 300.0, -1108.35 + 300.0, 4920.64 + 300.0, 217.2 + 300.0) //Nudist
	RemoveVehiclesFromGeneratorsInArea(-458.24 - 300.0, 6019.81 - 300.0, 31.34 - 300.0, -458.24 + 300.0, 6019.81 + 300.0, 31.34 + 300.0) //Paleto
	RemoveVehiclesFromGeneratorsInArea(1854.82 - 300.0, 3679.4 - 300.0, 33.82 - 300.0, 1854.82 + 300.0, 3679.4 + 300.0, 33.82 + 300.0) //Sandy
	RemoveVehiclesFromGeneratorsInArea(-724.46 - 300.0, -1444.03 - 300.0, 5.0 - 300.0, -724.46 + 300.0, -1444.03 + 300.0, 5.0 + 300.0)
    setTick(async () => {
        const coords = GetEntityCoords(PlayerPedId())
        ClearAreaOfCops(
            coords[0],
            coords[1],
            coords[2],
            200,
            0
        )
        await exports.altasia.delay(1000)
    })
}