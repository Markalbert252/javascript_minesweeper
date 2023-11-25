var cells = document.getElementsByClassName("cell");
var clickSound = document.getElementById("clickSound");
var gameOverSound = document.getElementById("gameOverSound");
var gameWinSound = document.getElementById("gameWinSound");

var mines = [];
var minesX = [];
var minesY = [];
var positionAroundMine = [];
var gameFinished = false;

//enter mine counts
var mineCounts = 4;

function minesBuild() {
    createMines(mineCounts);
    fixSameMinePositions();
    createPositionsAroundMine();
    console.log(mines);
}

function pressBtn(cell) {
    if (!gameFinished) {
        cell.className = "cell clicked";
        cell.setAttribute("value", 1);

        var userClick = Number(cell.id);

        if (clickMines(userClick)) {
            gameover();
        } else if (clickPositionsAroundMine(userClick)) {
            clickSound.play();
            cell.style.background = "red";
            cell.innerText = getMineCountsAroundUserClick(userClick);
            (getClickCounts() == (36 - mineCounts)) ? gamewin() : "";
        } else {
            clickSound.play();
            cell.style.background = "#27c8e8";
            (getClickCounts() == (36 - mineCounts)) ? gamewin() : "";
        }
    }
}

//create mines and add in mines_array
function createMines(counts) {
    for (var i = 0; i < counts; i++) {
        var x = Math.floor(Math.random() * 6) + 1;
        var y = Math.floor(Math.random() * 6) + 1;
        var mine = x + "" + y;
        mines.push(mine);
        minesX.push(x);
        minesY.push(y);
    }
}

//create positions around mines and add positions in positionAroundMine_array
function createPositionsAroundMine() {
    for (var i = 0; i < mines.length; i++) {
        var x = minesX[i];
        var y = minesY[i];
        var positions = minePositionsFormula(x, y);
        positionAroundMine.push(positions);
    }
}

//mine position formula(retrun array)
function minePositionsFormula(x, y) {
    var array = [];
    var p1 = (x - 1) + "" + (y - 1);
    var p2 = x + "" + (y - 1);
    var p3 = (x + 1) + "" + (y - 1);
    var p4 = (x - 1) + "" + y;
    var p5 = (x + 1) + "" + y;
    var p6 = (x - 1) + "" + (y + 1);
    var p7 = x + "" + (y + 1);
    var p8 = (x + 1) + "" + (y + 1);
    array.push(p1);
    array.push(p2);
    array.push(p3);
    array.push(p4);
    array.push(p5);
    array.push(p6);
    array.push(p7);
    array.push(p8);
    return array;
}

//calculating new positions if mines are in same positions
function fixSameMinePositions() {
    for (let i = 0; i < mines.length; i++) {
        var sameTime = 0;
        var mine = mines[i];
        for (let j = 0; j < mines.length; j++) {
            (mine == mines[j]) ? sameTime += 1 : "";
            if (sameTime == 2) {
                console.warn("mine position changed");
                var x = Math.floor(Math.random() * 6) + 1;
                var y = Math.floor(Math.random() * 6) + 1;
                mines[j] = x + "" + y;
                minesX[j] = x;
                minesY[j] = y;
                sameTime == 1;
            }
        }
    }
}

//check user click mine or not (return boolean)
function clickMines(userClick) {
    var clickMines = false;
    for (var i = 0; i < mines.length; i++) {
        (userClick == mines[i]) ? clickMines = true : "" ;
    }
    return clickMines;
}

//show mine positions
function showMinePositions(){
    for (let i = 0; i < mines.length; i++) {
        var mine = mines[i];
        for (let j = 0; j < 36; j++) {
            var cell = cells[j];
            (cell.id == mine ) ? cell.innerText = "BOOM" : "";
        }
    }
}

//check user click postions around mine or not (return boolean)
function clickPositionsAroundMine(userClick) {
    var clickPositions = false;
    for (var i = 0; i < positionAroundMine.length; i++) {
        for (let y = 0; y < positionAroundMine[i].length; y++) {
            var position = positionAroundMine[i][y];
            (userClick == position) ? clickPositions = true : "";
        }
    }
    return clickPositions;
}

//calculate mine counts around the cell that user clicks (return number or return mineCounts)
function getMineCountsAroundUserClick(userClick) {
    var mines = 0;
    for (var i = 0; i < positionAroundMine.length; i++) {
        for (let y = 0; y < positionAroundMine[i].length; y++) {
            var position = positionAroundMine[i][y];
            (userClick == position) ? mines += 1 : "";
        }
    }
    return mines;
}

//calculate that how many times user clicks the cell (return number)
function getClickCounts() {
    var counts = 0;
    for (let i = 0; i < 36; i++) {
        var cell = cells[i];
        var value = Number(cell.getAttribute("value"));
        counts += value;
    }
    return counts;
}

//game over
function gameover(){
    gameFinished = true;
    gameOverSound.play();
    for (let i = 0; i < 36; i++) {
        var cell = cells[i];
        cell.className = "cell clicked";
        cell.style.background = "red";
        cell.innerText = "";
    }
    document.getElementById("23").innerText = "G";
    document.getElementById("33").innerText = "A";
    document.getElementById("43").innerText = "M";
    document.getElementById("53").innerText = "E";
    document.getElementById("24").innerText = "O";
    document.getElementById("34").innerText = "V";
    document.getElementById("44").innerText = "E";
    document.getElementById("54").innerText = "R";

    showMinePositions();
}

//game win
function gamewin() {
    gameWinSound.play();
    gameFinished = true;
    for (let index = 0; index < 36; index++) {
        var cell = cells[index];
        cell.className = "cell clicked";
        cell.innerText = "";
        cell.style.background = "#27c8e8";
    }
    document.getElementById("23").innerText = "G";
    document.getElementById("33").innerText = "A";
    document.getElementById("43").innerText = "M";
    document.getElementById("53").innerText = "E";
    document.getElementById("24").innerText = "W";
    document.getElementById("34").innerText = "I";
    document.getElementById("44").innerText = "N";
    document.getElementById("54").innerText = "!";
}


