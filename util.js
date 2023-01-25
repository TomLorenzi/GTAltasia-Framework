const Util = {};

Util.Delay = function(ms) {
    return new Promise(res => setTimeout(res, ms));
}

exports('delay', Util.Delay);