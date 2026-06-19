/*
=========================================
DeskOS Window Manager
=========================================
*/

const appMap = {
    explorer: "explorer-window",
    notes: "notes-window",
    terminal: "terminal-window",
    calculator: "calculator-window",
    settings: "settings-window"
};

let highestLayer = 100;
let dragData = null;

/*
=========================================
Helpers
=========================================
*/

function getWindow(id) {
    return document.getElementById(id);
}

function focusWindow(win) {

    if (!win) return;

    highestLayer++;

    win.style.zIndex = highestLayer;
}

function openWindow(name) {

    const win =
        getWindow(appMap[name]);

    if (!win) return;

    win.classList.remove(
        "minimized"
    );

    win.classList.add(
        "active"
    );

    focusWindow(win);
}

function closeWindow(win) {

    win.classList.remove(
        "active"
    );
}

function minimizeWindow(win) {

    win.classList.add(
        "minimized"
    );
}

function maximizeWindow(win) {

    win.classList.toggle(
        "maximized"
    );

    focusWindow(win);
}

/*
=========================================
Desktop Icons
=========================================
*/

document
    .querySelectorAll(".desktop-icon")
    .forEach(icon => {

        icon.addEventListener(
            "dblclick",
            () => {

                openWindow(
                    icon.dataset.app
                );

            }
        );

    });

/*
=========================================
Taskbar Launchers
=========================================
*/

document
    .querySelectorAll(".task-launch")
    .forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                openWindow(
                    btn.dataset.app
                );

            }
        );

    });

/*
=========================================
Window Controls
=========================================
*/

document
    .querySelectorAll(".window")
    .forEach(win => {

        const closeBtn =
            win.querySelector(
                ".close-btn"
            );

        const minBtn =
            win.querySelector(
                ".min-btn"
            );

        const maxBtn =
            win.querySelector(
                ".max-btn"
            );

        closeBtn.addEventListener(
            "click",
            () => closeWindow(win)
        );

        minBtn.addEventListener(
            "click",
            () => minimizeWindow(win)
        );

        maxBtn.addEventListener(
            "click",
            () => maximizeWindow(win)
        );

        win.addEventListener(
            "mousedown",
            () => focusWindow(win)
        );

    });

/*
=========================================
Dragging
=========================================
*/

document
    .querySelectorAll(
        ".window-header"
    )
    .forEach(header => {

        header.addEventListener(
            "mousedown",
            e => {

                const win =
                    header.parentElement;

                if (
                    win.classList.contains(
                        "maximized"
                    )
                ) {
                    return;
                }

                focusWindow(win);

                dragData = {

                    win,

                    startX:
                        e.clientX,

                    startY:
                        e.clientY,

                    left:
                        win.offsetLeft,

                    top:
                        win.offsetTop
                };

            }
        );

    });

document.addEventListener(
    "mousemove",
    e => {

        if (!dragData) return;

        const moveX =
            e.clientX -
            dragData.startX;

        const moveY =
            e.clientY -
            dragData.startY;

        dragData.win.style.left =
            dragData.left +
            moveX +
            "px";

        dragData.win.style.top =
            dragData.top +
            moveY +
            "px";
    }
);

document.addEventListener(
    "mouseup",
    () => {

        dragData = null;

    }
);

/*
=========================================
Initial Positions
=========================================
*/

function arrangeWindows() {

    const layouts = [

        {
            id: "explorer-window",
            x: 180,
            y: 70
        },

        {
            id: "notes-window",
            x: 240,
            y: 110
        },

        {
            id: "terminal-window",
            x: 300,
            y: 150
        },

        {
            id: "calculator-window",
            x: 360,
            y: 90
        },

        {
            id: "settings-window",
            x: 420,
            y: 120
        }
    ];

    layouts.forEach(item => {

        const win =
            getWindow(item.id);

        if (!win) return;

        win.style.left =
            item.x + "px";

        win.style.top =
            item.y + "px";

    });

}

/*
=========================================
Startup Apps
=========================================
*/

window.addEventListener(
    "load",
    () => {

        arrangeWindows();

        setTimeout(() => {

            openWindow(
                "explorer"
            );

        }, 500);

    }
);

/*
=========================================
Global Access
=========================================
*/

window.DeskOS = {

    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow

};
