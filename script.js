const windowsOnDesk = document.querySelectorAll(".window");
const iconShortcuts = document.querySelectorAll(".desktop-icon");
const taskButtons = document.querySelectorAll(".task-launch");
const closeButtons = document.querySelectorAll(".close-btn");

let topLayer = 100;

/* =========================
   WINDOW MANAGEMENT
========================= */

function bringForward(win) {
    topLayer++;
    win.style.zIndex = topLayer;
}

function showWindow(id) {
    const win = document.getElementById(id);

    if (!win) return;

    win.classList.add("active");
    bringForward(win);
}

function hideWindow(win) {
    win.classList.remove("active");
}

iconShortcuts.forEach(icon => {
    icon.addEventListener("dblclick", () => {
        showWindow(icon.dataset.open);
    });
});

taskButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        showWindow(btn.dataset.open);
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        hideWindow(btn.closest(".window"));
    });
});

windowsOnDesk.forEach(win => {
    win.addEventListener("mousedown", () => {
        bringForward(win);
    });
});

/* =========================
   DRAG WINDOWS
========================= */

windowsOnDesk.forEach(win => {

    const head = win.querySelector(".window-header");

    let dragging = false;
    let grabX = 0;
    let grabY = 0;

    head.addEventListener("mousedown", e => {

        dragging = true;

        bringForward(win);

        grabX = e.clientX - win.offsetLeft;
        grabY = e.clientY - win.offsetTop;

    });

    document.addEventListener("mousemove", e => {

        if (!dragging) return;

        win.style.left = `${e.clientX - grabX}px`;
        win.style.top = `${e.clientY - grabY}px`;

    });

    document.addEventListener("mouseup", () => {
        dragging = false;
    });

});

/* =========================
   CLOCK
========================= */

const clockSpot = document.getElementById("task-clock");

function refreshClock() {

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");

    clockSpot.textContent = `${hours}:${mins}`;
}

refreshClock();
setInterval(refreshClock, 1000);

/* =========================
   NOTES
========================= */

const notePad = document.getElementById("notePad");

const oldNote = localStorage.getItem("deskos-note");

if (oldNote) {
    notePad.value = oldNote;
}

notePad.addEventListener("input", () => {

    localStorage.setItem(
        "deskos-note",
        notePad.value
    );

});

/* =========================
   CALCULATOR
========================= */

const calcScreen = document.getElementById("calc-screen");

document
    .querySelectorAll(".calc-grid button")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            const value = btn.textContent;

            if (value === "C") {
                calcScreen.value = "";
                return;
            }

            if (value === "=") {

                try {

                    calcScreen.value = eval(calcScreen.value);

                } catch {

                    calcScreen.value = "Error";

                    setTimeout(() => {
                        calcScreen.value = "";
                    }, 1200);
                }

                return;
            }

            calcScreen.value += value;

        });

    });

/* =========================
   TERMINAL
========================= */

const terminalInput =
    document.getElementById("terminal-input");

const terminalOutput =
    document.getElementById("terminal-output");

function printLine(text) {

    const row = document.createElement("div");

    row.textContent = text;

    terminalOutput.appendChild(row);

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;
}

function runCommand(command) {

    const cmd =
        command.trim().toLowerCase();

    if (!cmd) return;

    printLine(`$ ${command}`);

    switch (cmd) {

        case "help":

            printLine(
                "help, about, time, date, version, clear"
            );

            break;

        case "about":

            printLine(
                "DeskOS is a mini browser desktop."
            );

            break;

        case "version":

            printLine(
                "DeskOS v1.0"
            );

            break;

        case "time":

            printLine(
                new Date().toLocaleTimeString()
            );

            break;

        case "date":

            printLine(
                new Date().toDateString()
            );

            break;

        case "clear":

            terminalOutput.innerHTML = "";

            break;

        default:

            printLine(
                `'${cmd}' is not recognized`
            );

    }

}

terminalInput.addEventListener(
    "keydown",
    e => {

        if (e.key !== "Enter") return;

        runCommand(
            terminalInput.value
        );

        terminalInput.value = "";

    }
);

/* =========================
   WEATHER DEMO DATA
========================= */

const temp = document.getElementById("temp");
const sky = document.getElementById("sky");
const city = document.getElementById("city");

const weatherChoices = [
    {
        temp: "31°",
        sky: "Sunny"
    },
    {
        temp: "27°",
        sky: "Cloudy"
    },
    {
        temp: "24°",
        sky: "Rainy"
    },
    {
        temp: "29°",
        sky: "Partly Cloudy"
    }
];

const picked =
    weatherChoices[
        Math.floor(
            Math.random() *
            weatherChoices.length
        )
    ];

temp.textContent = picked.temp;
sky.textContent = picked.sky;
city.textContent = "Mumbai";

/* =========================
   STARTUP
========================= */

showWindow("notes-window");

setTimeout(() => {
    showWindow("weather-window");
}, 250);
