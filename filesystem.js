/*
=========================================
DeskOS Virtual File System
=========================================
*/

const drive = {

    Desktop: {

        "welcome.txt":
`Welcome to DeskOS v2

This is a virtual operating system
running entirely in your browser.

Try opening the terminal and run:

help
ls
neofetch
`,

        "todo.txt":
`Things to build:

- Music Player
- Paint App
- Browser
- App Store
`
    },

    Projects: {

        Robotics: {

            "robot-notes.txt":
`Robot chassis redesign
Motor testing
Sensor calibration
`

        },

        WebApps: {

            "idea.txt":
`Build a browser OS
using only HTML CSS JS`
        }

    },

    Downloads: {

        "wallpaper.png":
            "[image file]",

        "music.mp3":
            "[audio file]"
    },

    Pictures: {

        "sunset.jpg":
            "[image file]",

        "space.png":
            "[image file]"
    }
};

/*
=========================================
Current Location
=========================================
*/

let currentPath = ["Desktop"];

/*
=========================================
Helpers
=========================================
*/

function getFolder(path = currentPath) {

    let place = drive;

    for (const part of path) {

        if (
            typeof place[part] === "object"
        ) {
            place = place[part];
        }
    }

    return place;
}

function pathString() {

    return "/" + currentPath.join("/");
}

/*
=========================================
Explorer Rendering
=========================================
*/

function drawFolder(folderName = "Desktop") {

    const fileArea =
        document.getElementById("file-list");

    if (!fileArea) return;

    fileArea.innerHTML = "";

    const folder = drive[folderName];

    if (!folder) return;

    Object.keys(folder).forEach(item => {

        const card =
            document.createElement("div");

        card.className = "file-card";

        if (
            typeof folder[item] === "object"
        ) {
            card.innerHTML =
                `📁 ${item}`;
        }
        else {
            card.innerHTML =
                `📄 ${item}`;
        }

        fileArea.appendChild(card);

    });

}

/*
=========================================
Terminal Commands
=========================================
*/

function fsLs() {

    const folder =
        getFolder();

    return Object.keys(folder)
        .join("    ");
}

function fsPwd() {

    return pathString();
}

function fsCd(folderName) {

    if (!folderName)
        return "Usage: cd folder";

    if (folderName === "..") {

        if (
            currentPath.length > 1
        ) {
            currentPath.pop();
        }

        return pathString();
    }

    const current =
        getFolder();

    if (
        current[folderName] &&
        typeof current[folderName]
            === "object"
    ) {

        currentPath.push(folderName);

        return pathString();
    }

    return "Folder not found";
}

function fsCat(fileName) {

    if (!fileName)
        return "Usage: cat file";

    const current =
        getFolder();

    if (
        current[fileName] &&
        typeof current[fileName]
            === "string"
    ) {
        return current[fileName];
    }

    return "File not found";
}

function fsMkdir(name) {

    if (!name)
        return "Usage: mkdir folder";

    const current =
        getFolder();

    if (current[name]) {
        return "Already exists";
    }

    current[name] = {};

    return `Created ${name}`;
}

function fsTouch(name) {

    if (!name)
        return "Usage: touch file";

    const current =
        getFolder();

    if (current[name]) {
        return "Already exists";
    }

    current[name] = "";

    return `Created ${name}`;
}

function fsRm(name) {

    if (!name)
        return "Usage: rm item";

    const current =
        getFolder();

    if (!current[name]) {
        return "Not found";
    }

    delete current[name];

    return `Deleted ${name}`;
}

/*
=========================================
Explorer Sidebar
=========================================
*/

document
    .querySelectorAll(".folder-item")
    .forEach(folder => {

        folder.addEventListener(
            "click",
            () => {

                drawFolder(
                    folder.textContent
                );

            }
        );

    });

/*
=========================================
Startup
=========================================
*/

window.addEventListener(
    "load",
    () => {

        drawFolder();

    }
);
