'use strict';

var nextPlayer = "x",
    gameOver = false,
    numMoves = 0;

function reset() {
    drawBoard();
    nextPlayer = "x";
    gameOver = false;
    numMoves = 0;
    announce("");
    document.getElementById("reset").style.display = "none";
}

function getElement(r, c) {
    return document.getElementById(r.toString() + c.toString());
}

function action(r, c) {
    if (validateMove(r, c)) {
        numMoves++;
        var e = getElement(r, c);
        e.innerHTML = nextPlayer;
        nextPlayer = (nextPlayer === "x") ? "o" : "x";
        gameOver = isGameOver(r, c);
        if (numMoves >= 9) {
            announce("draw");
        }
    }
}

function announce(str) {
    document.getElementById("winner").innerHTML = str;
}

function validateMove(r, c) {
    var e = getElement(r, c);
    if (e.innerHTML || gameOver) {
        return false;
    }
    return true;
}

function generateBoardArray() {
    var e = document.getElementById("main"),
        elementArr = e.getElementsByClassName("col"),
        ret = [["", "", ""], ["", "", ""], ["", "", ""]];
    for (var i = 0; i < elementArr.length; i++) {
        var coords = elementArr[i].getAttribute("id").split(""),
            value = undefined;
        if (elementArr[i].innerHTML !== "") {
            value = (elementArr[i].innerHTML === "x") ? 1 : 0;
        }
        ret[coords[0]][coords[1]] = value;
    }
    return ret;
}

function isGameOver(r, c) {
    var board = generateBoardArray(),
        i,
        sumRow = 0,
        sumCol = 0,
        sumDiag1 = 0,
        sumDiag2 = 0;

        // console.log(board);

    // check rows and cols
    for (i = 0; i < 3; i++) {
        sumRow += board[r][i];
        sumCol += board[i][c];
        sumDiag1 += board[i][i];
    }

    sumDiag2 = board[0][2] + board[1][1] + board[2][0];

    function checkWin(i) {
        return sumRow === i || sumCol === i || sumDiag1 === i || sumDiag2 === i;
    }

    if (checkWin(3) || checkWin(0)) {
        announce(((nextPlayer === "x") ? "o" : "x") + " won!");
        document.getElementById("reset").style.display = "block";
        return true;
    }

    return false;
}

function drawBoard() {
    var row, col;

    var divMain = document.getElementById("main");
    divMain.innerHTML = "";

    for (row = 0; row < 3; row++) {
        var r = document.createElement("div");
        r.setAttribute("class", "row");

        for (col = 0; col < 3; col++) {
            var c = document.createElement("div");
            c.setAttribute("class", "col");
            c.setAttribute("id", row.toString() + col.toString());
            c.setAttribute("row", row);
            c.setAttribute("col", col);
            c.setAttribute("onclick", "action(" + row + "," + col + ")");
            r.appendChild(c);
        }

        divMain.appendChild(r);
    }
}

drawBoard();