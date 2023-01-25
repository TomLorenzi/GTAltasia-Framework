Delay = (ms) => new Promise(res => setTimeout(res, ms));

exports('delay', Delay)