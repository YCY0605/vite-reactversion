function clock() {
    var now = new Date();
    var clockString = now.toLocaleTimeString();
    var dayString = now.toLocaleDateString();
    document.getElementById("clock").innerText = clockString;
    document.getElementById("day").innerText = dayString;
}

setInterval(clock, 100);

clock();
