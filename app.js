/*
=========================================
DeskOS Main Application
=========================================
*/

const bootScreen =
    document.getElementById(
        "boot-screen"
    );

const taskClock =
    document.getElementById(
        "task-clock"
    );

/*
=========================================
Boot Sequence
=========================================
*/

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            bootScreen.classList.add(
                "hidden"
            );

        }, 1800);

    }
);

/*
=========================================
Clock
=========================================
*/

function updateClock() {

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const mins =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    taskClock.textContent =
        `${hours}:${mins}`;
}

updateClock();

setInterval(
    updateClock,
    1000
);

/*
=========================================
Notes App
=========================================
*/

const notesEditor =
    document.getElementById(
        "notes-editor"
    );

const savedNotes =
    localStorage.getItem(
        "deskos-notes"
    );

if (
    notesEditor &&
    savedNotes
) {

    notesEditor.value =
        savedNotes;
}

notesEditor?.addEventListener(
    "input",
    () => {

        localStorage.setItem(
            "deskos-notes",
            notesEditor.value
        );

    }
);

/*
=========================================
Calculator
=========================================
*/

const calcScreen =
    document.getElementById(
        "calc-screen"
    );

const calcButtons =
    document.querySelectorAll(
        ".calc-grid button"
    );

calcButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            const value =
                btn.textContent;

            if (
                value === "C"
            ) {

                calcScreen.value = "";

                return;
            }

            if (
                value === "="
            ) {

                try {

                    const result =
                        Function(
                            "return " +
                            calcScreen.value
                        )();

                    calcScreen.value =
                        result;

                }
                catch {

                    calcScreen.value =
                        "Error";

                    setTimeout(
                        () => {

                            calcScreen.value =
                                "";

                        },
                        1200
                    );
                }

                return;
            }

            calcScreen.value +=
                value;

        }
    );

});

/*
=========================================
Wallpaper Engine
=========================================
*/

const wallpaperButtons =
    document.querySelectorAll(
        ".wall-btn"
    );

function applyWallpaper(
    name
) {

    document.body.classList.remove(
        "wall-aurora",
        "wall-sunset",
        "wall-space"
    );

    document.body.classList.add(
        "wall-" + name
    );

    localStorage.setItem(
        "deskos-wallpaper",
        name
    );
}

wallpaperButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            applyWallpaper(
                btn.dataset.wall
            );

        }
    );

});

const savedWallpaper =
    localStorage.getItem(
        "deskos-wallpaper"
    );

if (
    savedWallpaper
) {

    applyWallpaper(
        savedWallpaper
    );

}
else {

    applyWallpaper(
        "aurora"
    );

}

/*
=========================================
Explorer Refresh Hook
=========================================
*/

function refreshExplorer() {

    if (
        typeof drawFolder ===
        "function"
    ) {

        drawFolder(
            currentPath[0]
        );

    }

}

/*
=========================================
Refresh Explorer After FS Changes
=========================================
*/

const originalMkdir =
    fsMkdir;

fsMkdir = function(name) {

    const result =
        originalMkdir(name);

    refreshExplorer();

    return result;
};

const originalTouch =
    fsTouch;

fsTouch = function(name) {

    const result =
        originalTouch(name);

    refreshExplorer();

    return result;
};

const originalRm =
    fsRm;

fsRm = function(name) {

    const result =
        originalRm(name);

    refreshExplorer();

    return result;
};

/*
=========================================
Quick Launch Keys
=========================================
*/

document.addEventListener(
    "keydown",
    e => {

        if (
            e.ctrlKey &&
            e.key === "1"
        ) {

            DeskOS.openWindow(
                "explorer"
            );

        }

        if (
            e.ctrlKey &&
            e.key === "2"
        ) {

            DeskOS.openWindow(
                "notes"
            );

        }

        if (
            e.ctrlKey &&
            e.key === "3"
        ) {

            DeskOS.openWindow(
                "terminal"
            );

        }

        if (
            e.ctrlKey &&
            e.key === "4"
        ) {

            DeskOS.openWindow(
                "calculator"
            );

        }

        if (
            e.ctrlKey &&
            e.key === "5"
        ) {

            DeskOS.openWindow(
                "settings"
            );

        }

    }
);

/*
=========================================
Fun Startup Stats
=========================================
*/

function startupLog() {

    console.log(
        "%cDeskOS v2 Loaded",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "Window Manager Ready"
    );

    console.log(
        "Virtual File System Ready"
    );

    console.log(
        "DeskShell Ready"
    );

    console.log(
        "Wallpaper Engine Ready"
    );
}

startupLog();

/*
=========================================
Future App Loader
=========================================
*/

const installedApps = [

    "Explorer",
    "Notes",
    "Terminal",
    "Calculator",
    "Settings"

];

window.DeskOSApps =
    installedApps;

/*
=========================================
Version Info
=========================================
*/

window.DESKOS_VERSION =
    "2.0.0";
