fx_version 'cerulean'
game 'gta5'

author 'Nira'
description 'Altasia framework'
version '1.0.0'

resource_type 'gametype' { name = 'Altasia game type' }

client_script {
    'main.js',
    'client/init/init.js',
    'client/money.js',
    'client/player.js',
    'client/death.js',
    'util.js'
}

/*shared_scripts {
    'config.lua',
    'config.weapons.lua',
}*/
ui_page 'hud/index.html'

files {
    'hud/index.html',
    'hud/js/index.js',
    'hud/css/style.css',
    'hud/img/logo.png',
}

server_scripts {
	'server/init.js',
    'server/util.js'
}