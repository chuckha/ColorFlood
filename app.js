const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const size = 50;
const cellWidth = 5;
const levelParameter = 'level';
const computerGuessFieldID = 'try-to-beat';
const levelFieldID = 'level';
const aboutModalID = 'about-modal';
const aboutLinkID = 'about-link';


function renderHistory(history) {
    const count = document.getElementById('count');
    count.innerText = history.length;
}

function bindAbout() {
    document.getElementById(aboutLinkID).addEventListener('click', () => {
        openAbout();
    })

    document.querySelectorAll(
        '.modal-background, .modal-close, .delete'
    ).forEach(($close) => {
        $close.addEventListener('click', () => {
            closeAbout();
        });
      });
    
      // Add a keyboard event to close all modals
      document.addEventListener('keydown', (event) => {
        const e = event || window.event;
    
        if (e.keyCode === 27) { // Escape key
            closeAbout();
        }
      });
}

function openAbout() {
    const aboutModal = document.getElementById(aboutModalID);
    aboutModal.classList.add('is-active');
}

function closeAbout() {
    const aboutModal = document.getElementById(aboutModalID);
    aboutModal.classList.remove('is-active');
}

function renderData(data) {
    data.forEach((row, j) => {
        row.forEach((col, i) => {
            const coords = coordinates(i,j);
            ctx.fillStyle = getColor(col);
            ctx.fillRect(coords.x, coords.y,size, size);
        })
    })
}

function getColor(x) {
    switch(x) {
        case 0: return 'red';
        case 1: return 'blue';
        case 2: return 'pink';
        case 3: return 'green';
        case 4: return 'yellow';
        default:
            return 'black';
    }
}

function coordinates(i,j) {
    return {x: i*size, y: j*size}
}

function start() {
    // TODO: error handling user input here
    const urlParams = new URLSearchParams(window.location.search);
    let level = urlParams.get(levelParameter)
    console.log("level", level)
    if (level === null || level == "") {
        level = 0
    }
    updateLevel(level);
    const game = JSON.parse(gameInit(parseInt(level, 10), cellWidth));
    updateTryToBeat(greedySolution());
    bindButtons();
    bindAbout();
    renderGame(game);
}

function updateTryToBeat(num) {
    console.log("num", num)
    document.getElementById(computerGuessFieldID).innerText = num;
}

function bindButtons() {
    const colors = ['red', 'blue', 'pink', 'green', 'yellow'];
    colors.forEach((color, idx) => {
        const btn = document.getElementById(color);
        btn.addEventListener('click', () => {
            const game = JSON.parse(apply(idx));
            renderGame(game);
        })
    })
}

function renderGame(game) {
    renderHistory(game.History);
    renderData(game.Cells);
}

function updateLevel(level) {
    document.getElementById(levelFieldID).value = level;
}
